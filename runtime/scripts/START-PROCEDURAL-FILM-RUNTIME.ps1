$ErrorActionPreference = 'Stop'

$ScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$RuntimeRoot = Split-Path -Parent $ScriptRoot

Write-Host '=== Procedural Film Runtime ==='
Write-Host "[INFO] Runtime root: $RuntimeRoot"

docker version | Out-Null
docker compose version | Out-Null

Push-Location $RuntimeRoot
try {
  docker compose up -d --build

  $health = 'http://127.0.0.1:8975/healthz'
  $ready = $false
  for ($i = 0; $i -lt 60; $i++) {
    Start-Sleep -Seconds 2
    try {
      $r = Invoke-RestMethod -Uri $health -Method Get -TimeoutSec 3
      if ($r.ok -eq $true) {
        $ready = $true
        break
      }
    } catch {}
  }

  if (-not $ready) {
    docker compose ps
    docker compose logs --tail 100
    throw "Runtime did not become ready at $health"
  }

  Write-Host '[PASS] Docker runtime READY'
  Write-Host '[INFO] Local MCP endpoint: http://127.0.0.1:8975/mcp'
  Write-Host '[INFO] Local health endpoint: http://127.0.0.1:8975/healthz'
  Write-Host '[INFO] Artifacts: runtime\.runtime-artifacts'
  docker compose ps
}
finally {
  Pop-Location
}
