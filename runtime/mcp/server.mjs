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
const ARTIFACT_CHUNK_BYTES = Number(process.env.ARTIFACT_CHUNK_BYTES || 196608);
const PLAYER_URI = "ui://procedural-film/artifact-player-v3.html";
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
    { capabilities: { tools: {}, resources: {} } },
  );


  const artifactPlayerHtml = [
    "<!doctype html>",
    "<html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>",
    "<style>",
    ":root{color-scheme:dark light}body{font-family:system-ui,sans-serif;margin:0;padding:12px;background:transparent}#card{display:grid;gap:10px}#stage{display:grid;place-items:center;min-height:180px;background:#111;border-radius:12px;overflow:hidden}video,img{max-width:100%;max-height:70vh;display:block}#bar{height:6px;background:#333;border-radius:999px;overflow:hidden}#fill{height:100%;width:0;background:#ddd;transition:width .15s linear}.row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}button,a.btn{font:inherit;padding:7px 10px;border-radius:8px;border:1px solid #666;background:#222;color:#fff;text-decoration:none;cursor:pointer}button:disabled{opacity:.5;cursor:default}small{opacity:.78;word-break:break-word}.ok{color:#7ee787}.bad{color:#ff7b72}",
    "</style></head><body><div id='card'><div id='stage'><div id='status'>Waiting for artifact…</div></div><div id='bar'><div id='fill'></div></div><div class='row'><button id='save' disabled>Save to ChatGPT</button><button id='download' disabled>Prepare download</button></div><small id='meta'></small><small id='diag'></small></div>",
    "<script>",
    "const pending=new Map();let nextId=1;let initialized=false;let currentKey='';let currentBlob=null;let currentFile=null;let currentUrl=null;let currentMeta=null;let transientFileId=null;let transientDownloadUrl=null;",
    "const stage=document.getElementById('stage'),statusEl=document.getElementById('status'),fill=document.getElementById('fill'),metaEl=document.getElementById('meta'),diagEl=document.getElementById('diag'),saveBtn=document.getElementById('save'),downloadBtn=document.getElementById('download');",
    "function notify(method,params){window.parent.postMessage({jsonrpc:'2.0',method,params},'*');}",
    "function request(method,params){const id=nextId++;window.parent.postMessage({jsonrpc:'2.0',id,method,params},'*');return new Promise((resolve,reject)=>pending.set(id,{resolve,reject}));}",
    "async function initializeBridge(){if(initialized)return;await request('ui/initialize',{appInfo:{name:'procedural-film-artifact-player',version:'0.3.0'},appCapabilities:{},protocolVersion:'2026-01-26'});initialized=true;notify('ui/notifications/initialized',{});}",
    "function decode64(s){const b=atob(s);const u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u;}",
    "function errText(e){return e&&e.message?e.message:String(e);}",
    "async function sha256Hex(blob){const ab=await blob.arrayBuffer();const digest=await crypto.subtle.digest('SHA-256',ab);return Array.from(new Uint8Array(digest)).map(b=>b.toString(16).padStart(2,'0')).join('');}",
    "async function ensureTransientUpload(){if(transientFileId)return transientFileId;if(!currentFile)throw new Error('No file assembled');if(!window.openai?.uploadFile)throw new Error('window.openai.uploadFile is unavailable');const u=await window.openai.uploadFile(currentFile);if(!u?.fileId)throw new Error('uploadFile returned no fileId');transientFileId=u.fileId;return transientFileId;}",
    "async function ensureDownloadUrl(){if(transientDownloadUrl)return transientDownloadUrl;const fileId=await ensureTransientUpload();if(!window.openai?.getFileDownloadUrl)throw new Error('window.openai.getFileDownloadUrl is unavailable');const d=await window.openai.getFileDownloadUrl({fileId});if(!d?.downloadUrl)throw new Error('getFileDownloadUrl returned no downloadUrl');transientDownloadUrl=d.downloadUrl;return transientDownloadUrl;}",
    "async function load(meta){if(!meta)return;await initializeBridge();const key=meta.jobId+'|'+meta.relativePath;if(key===currentKey)return;currentKey=key;currentMeta=meta;currentBlob=null;currentFile=null;transientFileId=null;transientDownloadUrl=null;saveBtn.disabled=true;downloadBtn.disabled=true;statusEl.textContent='Loading artifact…';diagEl.textContent='';fill.style.width='0%';metaEl.textContent=meta.fileName+' · '+(meta.sizeBytes/1048576).toFixed(2)+' MB';try{const parts=[];let offset=0;let total=0;while(offset<meta.sizeBytes){const r=await request('tools/call',{name:'get_artifact_chunk',arguments:{job_id:meta.jobId,relative_path:meta.relativePath,offset,length:meta.chunkBytes}});const sc=r&&r.structuredContent;if(!sc||!sc.chunkBase64)throw new Error('Chunk payload missing');const part=decode64(sc.chunkBase64);parts.push(part);total+=part.byteLength;offset=sc.nextOffset;fill.style.width=Math.min(100,(offset/meta.sizeBytes)*100).toFixed(1)+'%';}if(total!==meta.sizeBytes)throw new Error('Assembled size mismatch: '+total+' != '+meta.sizeBytes);currentBlob=new Blob(parts,{type:meta.mimeType});currentFile=new File([currentBlob],meta.fileName,{type:meta.mimeType});const gotHash=await sha256Hex(currentBlob);const hashOk=!meta.sha256||gotHash===meta.sha256;diagEl.innerHTML=(hashOk?'<span class=ok>SHA-256 OK</span>':'<span class=bad>SHA-256 MISMATCH</span>')+' · '+gotHash;if(!hashOk)throw new Error('Artifact SHA-256 mismatch');if(currentUrl)URL.revokeObjectURL(currentUrl);currentUrl=URL.createObjectURL(currentBlob);stage.innerHTML='';if(meta.mimeType==='video/mp4'){const v=document.createElement('video');v.controls=true;v.preload='metadata';v.playsInline=true;v.src=currentUrl;v.addEventListener('loadedmetadata',()=>{diagEl.innerHTML+=' · video metadata '+v.duration.toFixed(2)+'s';});v.addEventListener('error',()=>{const e=v.error;diagEl.innerHTML+='<br><span class=bad>video.error code '+(e?.code??'?')+': '+(e?.message||'unknown')+'</span>';});stage.appendChild(v);v.load();}else if(meta.mimeType.startsWith('image/')){const i=document.createElement('img');i.src=currentUrl;i.alt=meta.fileName;stage.appendChild(i);}else{const p=document.createElement('div');p.textContent='Artifact ready: '+meta.fileName;stage.appendChild(p);}statusEl.textContent='';saveBtn.disabled=false;downloadBtn.disabled=false;fill.style.width='100%';}catch(e){statusEl.textContent='Artifact load failed: '+errText(e);diagEl.innerHTML+='<br><span class=bad>'+errText(e)+'</span>';}}",
    "downloadBtn.onclick=async()=>{downloadBtn.disabled=true;downloadBtn.textContent='Preparing…';try{const href=await ensureDownloadUrl();const a=document.createElement('a');a.href=href;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Open download';a.className='btn';downloadBtn.replaceWith(a);diagEl.innerHTML+='<br><span class=ok>ChatGPT temporary download URL ready.</span>';}catch(e){downloadBtn.textContent='Download failed';downloadBtn.disabled=false;diagEl.innerHTML+='<br><span class=bad>Download: '+errText(e)+'</span>';}};",
    "saveBtn.onclick=async()=>{if(!currentFile)return;saveBtn.disabled=true;saveBtn.textContent='Saving…';try{if(!window.openai?.uploadFile)throw new Error('window.openai.uploadFile is unavailable');const u=await window.openai.uploadFile(currentFile,{library:true});if(!u?.fileId)throw new Error('library upload returned no fileId');saveBtn.textContent='Saved to ChatGPT';diagEl.innerHTML+='<br><span class=ok>Saved to ChatGPT library: '+u.fileId+'</span>';if(!transientFileId)transientFileId=u.fileId;}catch(e){diagEl.innerHTML+='<br><span class=bad>Library save: '+errText(e)+'</span>';try{const fileId=await ensureTransientUpload();saveBtn.textContent='Uploaded to ChatGPT';diagEl.innerHTML+='<br>Library unavailable, session file created: '+fileId;}catch(e2){saveBtn.textContent='Save failed';saveBtn.disabled=false;diagEl.innerHTML+='<br><span class=bad>Session upload: '+errText(e2)+'</span>';}}};",
    "window.addEventListener('message',(event)=>{if(event.source!==window.parent)return;const m=event.data;if(!m||m.jsonrpc!=='2.0')return;if(m.id!==undefined&&pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);return;}if(m.method==='ui/notifications/tool-result')load(m.params&&m.params.structuredContent);},{passive:true});",
    "initializeBridge().then(()=>{if(window.openai&&window.openai.toolOutput)load(window.openai.toolOutput);}).catch(e=>{statusEl.textContent='Bridge initialization failed: '+errText(e);});",
    "</script></body></html>"
  ].join("\n");

  server.registerResource("artifact-player", PLAYER_URI, {}, async () => ({
    contents: [
      {
        uri: PLAYER_URI,
        mimeType: "text/html;profile=mcp-app",
        text: artifactPlayerHtml,
        _meta: {
          ui: {
            prefersBorder: true,
            csp: {
              connectDomains: [],
              resourceDomains: [],
            },
          },
          "openai/widgetDescription": "Preview and save a rendered Procedural Film artifact.",
          "openai/widgetPrefersBorder": true,
          "openai/widgetCSP": {
            connect_domains: [],
            resource_domains: [],
          },
          "openai/ui": { availableDisplayModes: ["inline", "fullscreen"] },
        },
      },
    ],
  }));

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
    "get_artifact_chunk",
    {
      description: "App-only helper that returns one bounded base64 chunk of a persisted artifact.",
      inputSchema: z.object({
        job_id: z.string(),
        relative_path: z.string().min(1),
        offset: z.number().int().min(0),
        length: z.number().int().min(1).max(262144).default(ARTIFACT_CHUNK_BYTES),
      }),
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
      _meta: { ui: { visibility: ["app"] } },
    },
    async ({ job_id, relative_path, offset, length }) => {
      const target = safeArtifactPath(job_id, relative_path);
      const stat = await fs.stat(target);
      if (!stat.isFile()) throw new Error("artifact is not a file");
      if (offset > stat.size) throw new Error("offset exceeds artifact size");
      const bounded = Math.min(length, ARTIFACT_CHUNK_BYTES, stat.size - offset);
      const handle = await fs.open(target, "r");
      try {
        const buf = Buffer.alloc(Math.max(0, bounded));
        const read = bounded > 0 ? await handle.read(buf, 0, bounded, offset) : { bytesRead: 0 };
        const data = buf.subarray(0, read.bytesRead);
        const nextOffset = offset + data.length;
        return {
          structuredContent: {
            jobId: job_id,
            relativePath: relative_path,
            mimeType: mimeFor(relative_path),
            sizeBytes: stat.size,
            offset,
            nextOffset,
            done: nextOffset >= stat.size,
            chunkBase64: data.toString("base64"),
          },
          content: [{ type: "text", text: `Artifact chunk ${offset}..${nextOffset} of ${stat.size} bytes.` }],
        };
      } finally {
        await handle.close();
      }
    },
  );

  server.registerTool(
    "render_artifact_player",
    {
      description: "Render a ChatGPT artifact player for a completed video or image. Use after render/snap when the artifact is too large for inline transfer.",
      inputSchema: z.object({
        job_id: z.string(),
        relative_path: z.string().min(1),
      }),
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
      _meta: {
        ui: { resourceUri: PLAYER_URI },
        "openai/toolInvocation/invoking": "Opening artifact…",
        "openai/toolInvocation/invoked": "Artifact ready.",
      },
    },
    async ({ job_id, relative_path }) => {
      const target = safeArtifactPath(job_id, relative_path);
      const stat = await fs.stat(target);
      if (!stat.isFile()) throw new Error("artifact is not a file");
      const mimeType = mimeFor(relative_path);
      if (!(mimeType === "video/mp4" || mimeType.startsWith("image/"))) {
        throw new Error("artifact player supports video/mp4 and image artifacts");
      }
      const payload = {
        jobId: job_id,
        relativePath: relative_path,
        fileName: path.basename(relative_path),
        mimeType,
        sizeBytes: stat.size,
        sha256: await sha256File(target),
        chunkBytes: ARTIFACT_CHUNK_BYTES,
      };
      return {
        structuredContent: payload,
        content: [{ type: "text", text: `Artifact player ready for ${payload.fileName} (${payload.sizeBytes} bytes).` }],
      };
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
