# Security notes

The pilot treats the render worker as a code-execution boundary because a film scene is JavaScript.

Controls:

1. The remote Git repository is fixed by environment and defaults to `MylloVinyllo/procedural-film`.
2. Tool callers cannot provide an arbitrary repository URL.
3. Only exact commit SHAs are accepted. Branch and tag names are rejected.
4. Project paths are restricted to `examples/`, `experiments/`, and `films/`.
5. The MCP server has no arbitrary shell tool.
6. The worker is not exposed to the Windows host or public network by a published port.
7. Neither service mounts `/var/run/docker.sock`.
8. The MCP container mounts artifacts read-only and runs with a read-only root filesystem.
9. Docker Compose enables `no-new-privileges`.
10. The public host binding is loopback-only: `127.0.0.1:8975`.
11. If an HTTP Origin header is supplied to the MCP endpoint, it must be on the configured allowlist.
12. The Secure Tunnel runtime key is intentionally outside this repository and should remain protected by the existing Windows DPAPI pattern.

Residual pilot risk:

- a commit in the allowed repository can contain arbitrary JavaScript and therefore is trusted code inside the worker container;
- the worker requires outbound access to GitHub/npm for exact-commit checkout and dependency installation;
- artifact payload limits through Secure Tunnel are not yet proven;
- resource, CPU, and disk quotas need production hardening after the pilot.
