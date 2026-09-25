import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { McpServer, createMcpHandler } from "@modelcontextprotocol/server";
import { toNodeHandler } from "@modelcontextprotocol/node";
import { z } from "zod";

const PORT = Number(process.env.PORT || 8080);
const WORKER_URL = process.env.WORKER_URL || "http://worker:8788";
const ARTIFACT_ROOT = path.resolve(process.env.ARTIFACT_ROOT || "/artifacts");
const MAX_INLINE_ARTIFACT_BYTES = Number(process.env.MAX_INLINE_ARTIFACT_BYTES || 33554432);
const ALLOWED_ORIGINS = new Set(
  String(process.env.ALLOWED_ORIGINS || "https://chatgpt.com,https://chat.openai.com")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean),
);

const SHA_RE = /^[0-9a-f]{40}$/;
const JOB_RE = /^[0-9a-f-]{36}$/i;
const PROJECT_RE = /^(examples|experiments|films)\/[A-Za-z0-9._/-]+$/;

function jsonResult(value) {
  return {
    content: [{ type: "text", text: JSON.stringify(value, null, 2) }],
    structuredContent: value,
  };
}

function assertCommit(commit) {
  if (!SHA_RE.test(commit)) throw new Error("commit must be a lowercase 40-character Git SHA");
}

function assertProjectPath(projectPath) {
  if (!PROJECT_RE.test(projectPath) || projectPath.includes("..")) {
    throw new Error("project_path must stay under examples/, experiments/, or films/");
  }
}

function assertJobId(jobId) {
  if (!JOB_RE.test(jobId)) throw new Error("invalid job_id");
}

async function workerJson(route, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), Number(options.timeoutMs || 15000));
  try {
    const response = await fetch(WORKER_URL + route, {
      ...options,
      headers: { "content-type": "application/json", ...(options.headers || {}) },
      signal: controller.signal,
    });
    const text = await response.text();
    let body;
    try {
      body = text ? JSON.parse(text) : {};
    } catch {
      body = { raw: text };
    }
    if (!response.ok) {
      throw new Error(`worker HTTP ${response.status}: ${body?.error || text || response.statusText}`);
    }
    return body;
  } finally {
    clearTimeout(timer);
  }
}

async function submitJob(operation, input) {
  assertCommit(input.commit);
  assertProjectPath(input.project_path);
  return workerJson("/jobs", {
    method: "POST",
    body: JSON.stringify({
      operation,
      commit: input.commit,
      projectPath: input.project_path,
      options: input.options || {},
    }),
  });
}

function safeArtifactPath(jobId, relativePath) {
  assertJobId(jobId);
  if (!relativePath || relativePath.includes("\0")) throw new Error("relative_path is required");
  const base = path.resolve(ARTIFACT_ROOT, jobId);
  const target = path.resolve(base, relativePath);
  if (!(target === base || target.startsWith(base + path.sep))) {
    throw new Error("artifact path escapes job directory");
  }
  return target;
}

function mimeFor(name) {
  const ext = path.extname(name).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".json") return "application/json";
  if (ext === ".md") return "text/markdown";
  if (ext === ".log" || ext === ".txt") return "text/plain";
  if (ext === ".mp4") return "video/mp4";
  if (ext === ".html") return "text/html";
  return "application/octet-stream";
}

function createServer() {
  const server = new McpServer(
    { name: "procedural-film-runtime", version: "0.1.0" },
    { capabilities: { tools: {} } },
  );

  server.registerTool(
    "runtime_info",
    {
      description: "Return the pinned Procedural Film worker runtime identity and capabilities.",
      inputSchema: z.object({}),
    },
    async () => jsonResult(await workerJson("/runtime-info")),
  );

  const baseInput = z.object({
    commit: z.string().regex(SHA_RE).describe("Exact commit SHA from MylloVinyllo/procedural-film."),
    project_path: z.string().describe("Path under examples/, experiments/, or films/."),
  });

  server.registerTool(
    "check",
    {
      description: "Run the procedural-film six-check gate for one exact project commit.",
      inputSchema: baseInput,
    },
    async (input) => jsonResult(await submitJob("check", input)),
  );

  server.registerTool(
    "snap",
    {
      description: "Render a contact sheet or shot samples for visual QA.",
      inputSchema: baseInput.extend({
        shot: z.string().min(1).max(120).optional(),
        samples: z.number().int().min(1).max(24).default(6),
        scale: z.number().min(0.1).max(1).default(0.25),
      }),
    },
    async (input) =>
      jsonResult(
        await submitJob("snap", {
          ...input,
          options: { shot: input.shot, samples: input.samples, scale: input.scale },
        }),
      ),
  );

  server.registerTool(
    "render_preview",
    {
      description: "Queue a half-scale H.264/AAC preview render and return a job id.",
      inputSchema: baseInput,
    },
    async (input) => jsonResult(await submitJob("render_preview", input)),
  );

  server.registerTool(
    "render_master",
    {
      description: "Queue the full 1080x1920 H.264/AAC master render and return a job id.",
      inputSchema: baseInput,
    },
    async (input) => jsonResult(await submitJob("render_master", input)),
  );

  server.registerTool(
    "job_status",
    {
      description: "Read current state, logs tail, provenance, and artifact summary for a render job.",
      inputSchema: z.object({ job_id: z.string() }),
    },
    async ({ job_id }) => {
      assertJobId(job_id);
      return jsonResult(await workerJson(`/jobs/${encodeURIComponent(job_id)}`));
    },
  );

  server.registerTool(
    "list_artifacts",
    {
      description: "List artifact names, sizes, MIME types, and SHA-256 values for a completed job.",
      inputSchema: z.object({ job_id: z.string() }),
    },
    async ({ job_id }) => {
      assertJobId(job_id);
      return jsonResult(await workerJson(`/jobs/${encodeURIComponent(job_id)}/artifacts`));
    },
  );

  server.registerTool(
    "get_artifact",
    {
      description: "Return a small/medium artifact inline. Images are returned as image content; MP4 and other binaries as embedded resources.",
      inputSchema: z.object({
        job_id: z.string(),
        relative_path: z.string().min(1),
      }),
    },
    async ({ job_id, relative_path }) => {
      const target = safeArtifactPath(job_id, relative_path);
      const stat = await fs.stat(target);
      if (!stat.isFile()) throw new Error("artifact is not a file");
      if (stat.size > MAX_INLINE_ARTIFACT_BYTES) {
        return jsonResult({
          ok: false,
          reason: "artifact_too_large_for_inline_probe",
          sizeBytes: stat.size,
          maxInlineBytes: MAX_INLINE_ARTIFACT_BYTES,
          jobId: job_id,
          relativePath: relative_path,
        });
      }
      const data = await fs.readFile(target);
      const mimeType = mimeFor(relative_path);
      const sha256 = crypto.createHash("sha256").update(data).digest("hex");
      const meta = { jobId: job_id, relativePath: relative_path, sizeBytes: data.length, sha256, mimeType };

      if (mimeType.startsWith("image/")) {
        return {
          content: [
            { type: "image", data: data.toString("base64"), mimeType },
            { type: "text", text: JSON.stringify(meta, null, 2) },
          ],
          structuredContent: meta,
        };
      }

      if (mimeType.startsWith("text/") || mimeType === "application/json") {
        return {
          content: [
            { type: "text", text: data.toString("utf8") },
            { type: "text", text: JSON.stringify(meta, null, 2) },
          ],
          structuredContent: meta,
        };
      }

      return {
        content: [
          {
            type: "resource",
            resource: {
              uri: `artifact://${job_id}/${encodeURIComponent(relative_path)}`,
              mimeType,
              blob: data.toString("base64"),
            },
          },
          { type: "text", text: JSON.stringify(meta, null, 2) },
        ],
        structuredContent: meta,
      };
    },
  );

  return server;
}

const mcpNodeHandler = toNodeHandler(createMcpHandler(createServer, { responseMode: "json" }));

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/healthz") {
      const worker = await workerJson("/healthz", { timeoutMs: 3000 });
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ ok: true, worker }));
      return;
    }

    if (req.url?.startsWith("/mcp")) {
      const origin = req.headers.origin;
      if (origin && !ALLOWED_ORIGINS.has(origin)) {
        res.writeHead(403, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "origin_not_allowed" }));
        return;
      }
      await mcpNodeHandler(req, res);
      return;
    }

    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "not_found" }));
  } catch (error) {
    if (!res.headersSent) {
      res.writeHead(500, { "content-type": "application/json" });
    }
    res.end(JSON.stringify({ error: error?.message || String(error) }));
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(JSON.stringify({ event: "listening", port: PORT, workerUrl: WORKER_URL }));
});
