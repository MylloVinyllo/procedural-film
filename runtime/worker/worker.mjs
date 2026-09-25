import http from "node:http";
import fs from "node:fs/promises";
import fssync from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawn, spawnSync } from "node:child_process";

const PORT = Number(process.env.PORT || 8788);
const REPO_URL = process.env.REPO_URL || "https://github.com/MylloVinyllo/procedural-film.git";
const ARTIFACT_ROOT = path.resolve(process.env.ARTIFACT_ROOT || "/artifacts");
const JOB_ROOT = path.resolve(process.env.JOB_ROOT || "/tmp/procedural-film-jobs");
const MAX_CONCURRENT = Math.max(1, Number(process.env.MAX_CONCURRENT || 1));
const SHA_RE = /^[0-9a-f]{40}$/;
const JOB_RE = /^[0-9a-f-]{36}$/i;
const PROJECT_RE = /^(examples|experiments|films)\/[A-Za-z0-9._/-]+$/;

const jobs = new Map();
let runningCount = 0;

await fs.mkdir(ARTIFACT_ROOT, { recursive: true });
await fs.mkdir(JOB_ROOT, { recursive: true });

function send(res, code, payload) {
  res.writeHead(code, { "content-type": "application/json" });
  res.end(JSON.stringify(payload));
}

async function readJson(req) {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 1024 * 1024) throw new Error("request too large");
  }
  return body ? JSON.parse(body) : {};
}

function versionLine(cmd, args = ["--version"]) {
  const r = spawnSync(cmd, args, { encoding: "utf8" });
  if (r.error) return null;
  return String(r.stdout || r.stderr || "").trim().split(/\r?\n/)[0] || null;
}

function validateCommit(commit) {
  if (!SHA_RE.test(commit)) throw new Error("commit must be a lowercase 40-character Git SHA");
}

function validateProjectPath(projectPath) {
  if (!PROJECT_RE.test(projectPath) || projectPath.includes("..")) {
    throw new Error("projectPath must stay under examples/, experiments/, or films/");
  }
}

function validateJobId(jobId) {
  if (!JOB_RE.test(jobId)) throw new Error("invalid job id");
}

function tailText(value, max = 12000) {
  if (!value) return "";
  return value.length <= max ? value : value.slice(-max);
}

async function runCommand(job, stage, cmd, args, options = {}) {
  job.stage = stage;
  job.updatedAt = new Date().toISOString();
  await persistJob(job);

  const stdoutPath = path.join(job.artifactDir, "stdout.log");
  const stderrPath = path.join(job.artifactDir, "stderr.log");
  const stdout = fssync.createWriteStream(stdoutPath, { flags: "a" });
  const stderr = fssync.createWriteStream(stderrPath, { flags: "a" });
  stdout.write(`\n\n### ${stage}\n$ ${cmd} ${args.join(" ")}\n`);
  stderr.write(`\n\n### ${stage}\n`);

  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd: options.cwd,
      env: { ...process.env, ...(options.env || {}) },
      stdio: ["ignore", "pipe", "pipe"],
    });

    let outTail = "";
    let errTail = "";
    const timeoutMs = options.timeoutMs || 10 * 60 * 1000;
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      errTail += `\nTIMEOUT after ${timeoutMs}ms`;
    }, timeoutMs);

    child.stdout.on("data", (buf) => {
      stdout.write(buf);
      outTail = tailText(outTail + buf.toString());
    });
    child.stderr.on("data", (buf) => {
      stderr.write(buf);
      errTail = tailText(errTail + buf.toString());
    });

    child.on("error", (error) => {
      clearTimeout(timer);
      stdout.end();
      stderr.end();
      reject(error);
    });

    child.on("close", (code, signal) => {
      clearTimeout(timer);
      stdout.end();
      stderr.end();
      job.lastStdout = outTail;
      job.lastStderr = errTail;
      job.lastExitCode = code;
      job.lastSignal = signal;
      if (code === 0) resolve({ code, signal });
      else reject(new Error(`${stage} failed with ${signal || code}: ${tailText(errTail || outTail, 4000)}`));
    });
  });
}

async function persistJob(job) {
  const serializable = { ...job };
  delete serializable.artifactDir;
  delete serializable.workspaceDir;
  await fs.mkdir(job.artifactDir, { recursive: true });
  await fs.writeFile(path.join(job.artifactDir, "job.json"), JSON.stringify(serializable, null, 2));
}

function safeProjectRoot(workspaceDir, projectPath) {
  validateProjectPath(projectPath);
  const root = path.resolve(workspaceDir, "repo");
  const project = path.resolve(root, projectPath);
  if (!project.startsWith(root + path.sep)) throw new Error("project path escaped checkout");
  return project;
}

async function cloneExactCommit(job) {
  const repoDir = path.join(job.workspaceDir, "repo");
  await fs.mkdir(repoDir, { recursive: true });
  await runCommand(job, "git-init", "git", ["init"], { cwd: repoDir, timeoutMs: 60_000 });
  await runCommand(job, "git-remote", "git", ["remote", "add", "origin", REPO_URL], { cwd: repoDir, timeoutMs: 60_000 });
  await runCommand(job, "git-fetch", "git", ["fetch", "--depth", "1", "origin", job.commit], { cwd: repoDir, timeoutMs: 5 * 60_000 });
  await runCommand(job, "git-checkout", "git", ["checkout", "--detach", "FETCH_HEAD"], { cwd: repoDir, timeoutMs: 60_000 });
  const actual = spawnSync("git", ["rev-parse", "HEAD"], { cwd: repoDir, encoding: "utf8" }).stdout.trim();
  if (actual !== job.commit) throw new Error(`checkout mismatch: expected ${job.commit}, got ${actual}`);
}

async function installTools(job, projectRoot) {
  const toolsDir = path.join(projectRoot, "tools");
  await fs.access(path.join(toolsDir, "package-lock.json"));
  await runCommand(
    job,
    "npm-ci",
    "npm",
    ["ci", "--no-audit", "--no-fund"],
    { cwd: toolsDir, timeoutMs: 10 * 60_000 },
  );
}

async function copyOutputs(projectRoot, artifactDir) {
  const source = path.join(projectRoot, ".mcp-output");
  try {
    await fs.access(source);
  } catch {
    return;
  }
  await fs.cp(source, path.join(artifactDir, "output"), { recursive: true });
}

async function sha256File(file) {
  const hash = crypto.createHash("sha256");
  await new Promise((resolve, reject) => {
    const stream = fssync.createReadStream(file);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", resolve);
    stream.on("error", reject);
  });
  return hash.digest("hex");
}

function mimeFor(name) {
  const ext = path.extname(name).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".mp4") return "video/mp4";
  if (ext === ".json") return "application/json";
  if (ext === ".log" || ext === ".txt") return "text/plain";
  if (ext === ".html") return "text/html";
  return "application/octet-stream";
}

async function walk(dir, base = dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(abs, base));
    else if (entry.isFile()) {
      const stat = await fs.stat(abs);
      out.push({
        relativePath: path.relative(base, abs).split(path.sep).join("/"),
        sizeBytes: stat.size,
        mimeType: mimeFor(abs),
        sha256: await sha256File(abs),
      });
    }
  }
  return out.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
}

async function finalizeArtifacts(job) {
  job.artifacts = await walk(job.artifactDir);
  await persistJob(job);
}

async function executeJob(job) {
  runningCount++;
  job.status = "running";
  job.startedAt = new Date().toISOString();
  await persistJob(job);

  try {
    await fs.rm(job.workspaceDir, { recursive: true, force: true });
    await fs.mkdir(job.workspaceDir, { recursive: true });
    await cloneExactCommit(job);
    const projectRoot = safeProjectRoot(job.workspaceDir, job.projectPath);
    await fs.access(path.join(projectRoot, "tools", "check.cjs"));
    await installTools(job, projectRoot);
    await fs.mkdir(path.join(projectRoot, ".mcp-output"), { recursive: true });

    if (job.operation === "check") {
      await runCommand(job, "check", "node", ["tools/check.cjs"], {
        cwd: projectRoot,
        timeoutMs: 15 * 60_000,
      });
    } else if (job.operation === "snap") {
      const args = ["tools/snap.cjs"];
      if (job.options?.shot) args.push("--shot", String(job.options.shot));
      if (job.options?.shot) args.push("--samples", String(job.options.samples || 6), "--sheet");
      args.push("--scale", String(job.options.scale || 0.25), "--out", ".mcp-output/snap");
      await runCommand(job, "snap", "node", args, {
        cwd: projectRoot,
        timeoutMs: 15 * 60_000,
      });
    } else if (job.operation === "render_preview") {
      await runCommand(
        job,
        "render-preview",
        "node",
        [
          "tools/render.cjs",
          "--scale", "0.5",
          "--workers", "2",
          "--crf", "23",
          "--preset", "veryfast",
          "--out", ".mcp-output/preview.mp4",
        ],
        { cwd: projectRoot, timeoutMs: 45 * 60_000 },
      );
    } else if (job.operation === "render_master") {
      await runCommand(
        job,
        "render-master",
        "node",
        [
          "tools/render.cjs",
          "--scale", "1",
          "--workers", "2",
          "--crf", "16",
          "--preset", "medium",
          "--out", ".mcp-output/master.mp4",
        ],
        { cwd: projectRoot, timeoutMs: 90 * 60_000 },
      );
    } else {
      throw new Error(`unsupported operation: ${job.operation}`);
    }

    await copyOutputs(projectRoot, job.artifactDir);
    job.status = "succeeded";
    job.finishedAt = new Date().toISOString();
  } catch (error) {
    job.status = "failed";
    job.error = error?.stack || error?.message || String(error);
    job.finishedAt = new Date().toISOString();
  } finally {
    try {
      await finalizeArtifacts(job);
    } catch (error) {
      job.artifactError = error?.message || String(error);
      await persistJob(job).catch(() => {});
    }
    await fs.rm(job.workspaceDir, { recursive: true, force: true }).catch(() => {});
    runningCount--;
  }
}

async function loadJob(jobId) {
  if (jobs.has(jobId)) return jobs.get(jobId);
  const file = path.join(ARTIFACT_ROOT, jobId, "job.json");
  try {
    const parsed = JSON.parse(await fs.readFile(file, "utf8"));
    parsed.artifactDir = path.join(ARTIFACT_ROOT, jobId);
    jobs.set(jobId, parsed);
    return parsed;
  } catch {
    return null;
  }
}

async function runtimeInfo() {
  let browsers = [];
  try {
    browsers = await fs.readdir("/ms-playwright");
  } catch {}
  return {
    ok: true,
    runtime: "procedural-film-worker",
    version: "0.1.0",
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    git: versionLine("git"),
    ffmpeg: versionLine("ffmpeg", ["-version"]),
    repoUrl: REPO_URL,
    playwrightBrowsersPath: process.env.PLAYWRIGHT_BROWSERS_PATH || null,
    browserBundles: browsers,
    maxConcurrent: MAX_CONCURRENT,
    runningCount,
    artifactRoot: ARTIFACT_ROOT,
  };
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET" && req.url === "/healthz") {
      send(res, 200, { ok: true, runningCount });
      return;
    }

    if (req.method === "GET" && req.url === "/runtime-info") {
      send(res, 200, await runtimeInfo());
      return;
    }

    if (req.method === "POST" && req.url === "/jobs") {
      if (runningCount >= MAX_CONCURRENT) {
        send(res, 409, { error: "worker_busy", runningCount, maxConcurrent: MAX_CONCURRENT });
        return;
      }
      const body = await readJson(req);
      validateCommit(body.commit);
      validateProjectPath(body.projectPath);
      if (!["check", "snap", "render_preview", "render_master"].includes(body.operation)) {
        throw new Error("unsupported operation");
      }

      const id = crypto.randomUUID();
      const job = {
        id,
        status: "queued",
        stage: "queued",
        operation: body.operation,
        commit: body.commit,
        projectPath: body.projectPath,
        options: body.options || {},
        repoUrl: REPO_URL,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        artifactDir: path.join(ARTIFACT_ROOT, id),
        workspaceDir: path.join(JOB_ROOT, id),
        artifacts: [],
      };
      jobs.set(id, job);
      await persistJob(job);
      setImmediate(() => executeJob(job));
      send(res, 202, { ok: true, jobId: id, status: "queued", operation: job.operation });
      return;
    }

    const statusMatch = req.method === "GET" && req.url?.match(/^\/jobs\/([0-9a-f-]{36})$/i);
    if (statusMatch) {
      validateJobId(statusMatch[1]);
      const job = await loadJob(statusMatch[1]);
      if (!job) return send(res, 404, { error: "job_not_found" });
      const payload = { ...job };
      delete payload.artifactDir;
      delete payload.workspaceDir;
      send(res, 200, payload);
      return;
    }

    const artifactsMatch = req.method === "GET" && req.url?.match(/^\/jobs\/([0-9a-f-]{36})\/artifacts$/i);
    if (artifactsMatch) {
      validateJobId(artifactsMatch[1]);
      const job = await loadJob(artifactsMatch[1]);
      if (!job) return send(res, 404, { error: "job_not_found" });
      const artifactDir = path.join(ARTIFACT_ROOT, job.id);
      send(res, 200, { ok: true, jobId: job.id, artifacts: await walk(artifactDir) });
      return;
    }

    send(res, 404, { error: "not_found" });
  } catch (error) {
    send(res, 400, { error: error?.message || String(error) });
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(JSON.stringify({ event: "listening", port: PORT, repoUrl: REPO_URL }));
});
