# Procedural Film Runtime MCP pilot

This folder is an isolated execution layer for the existing `procedural-film` skill. It does not replace the skill, storyboard pipeline, or renderer code.

## Stage 1 objective

Prove this vertical slice on Docker Desktop:

```text
ChatGPT MCP tool
  -> Secure Tunnel
  -> localhost:8975/mcp
  -> MCP gateway container
  -> private worker container
  -> exact Git commit
  -> examples/butterfly-life
  -> check / snap / preview / master
  -> persisted job artifacts
```

GitHub remains source control. Docker Desktop is the execution environment.

## Security boundary

The MCP surface intentionally does **not** expose an arbitrary shell.

The worker:

- executes only `https://github.com/MylloVinyllo/procedural-film.git`;
- accepts only exact lowercase 40-character commit SHAs;
- accepts projects only below `examples/`, `experiments/`, or `films/`;
- exposes no host port;
- receives no Docker socket;
- runs only four operations: `check`, `snap`, `render_preview`, `render_master`.

The MCP gateway is published only on host loopback at `127.0.0.1:8975`.

## Containers

### mcp

Small MCP 2026 server using:

- `@modelcontextprotocol/server@2.0.0`
- `@modelcontextprotocol/node@2.0.0`
- stateless JSON responses
- `/mcp` endpoint
- `/healthz`

Tools:

- `runtime_info`
- `check`
- `snap`
- `render_preview`
- `render_master`
- `job_status`
- `list_artifacts`
- `get_artifact`

### worker

Pinned on the Playwright 1.63.0 Ubuntu image and adds:

- Git
- ffmpeg
- Node/npm already present in the Playwright image
- Chromium browser bundle from the image

Each job clones the exact requested commit into an isolated temporary directory, runs `npm ci` in the film's `tools/` directory, executes the requested operation, hashes artifacts, then removes the checkout.

One concurrent job is allowed in the pilot.

## Start on Windows

From a local checkout of this branch:

```powershell
.\runtime\scripts\START-PROCEDURAL-FILM-RUNTIME.ps1
```

Expected local endpoints:

- MCP: `http://127.0.0.1:8975/mcp`
- health: `http://127.0.0.1:8975/healthz`

Artifacts are written under:

```text
runtime/.runtime-artifacts/<job-id>/
```

Stop:

```powershell
.\runtime\scripts\STOP-PROCEDURAL-FILM-RUNTIME.ps1
```

## First acceptance sequence

Use the repository commit that contains the butterfly example and project path `examples/butterfly-life`.

1. `runtime_info`
2. `check`
3. poll `job_status` until `succeeded`
4. `snap`
5. fetch the generated contact sheet using `list_artifacts` + `get_artifact`
6. `render_preview`
7. test MP4 transfer through `get_artifact`
8. only after the preview path is proven, run `render_master`

## Tunnel

The Docker stack deliberately does not own OpenAI tunnel credentials.

The existing proven pattern is a host-side `tunnel-client` pointing to:

```text
http://127.0.0.1:8975/mcp
```

with its control-plane runtime key kept in Windows DPAPI storage. The next step after local Docker smoke is to provision a **separate** Procedural Film Runtime app/tunnel rather than reusing or disturbing the accepted Playwright MultiLane tunnel.

## Pilot limitations

- No queue beyond one active job.
- No cancellation yet.
- No cleanup/retention policy yet.
- npm dependencies are installed per job, with a persistent npm download cache.
- Inline artifact transfer is capped at 32 MiB until the real Secure Tunnel payload behavior is measured.
- The pilot does not change canonical SMM renderer authority or close O-009.
