$ErrorActionPreference = 'Stop'

$RuntimeRoot = Join-Path $env:LOCALAPPDATA 'ProceduralFilmRuntimeTunnel'
$ConfigRoot = Join-Path $RuntimeRoot 'config'
$TunnelIdPath = Join-Path $ConfigRoot 'tunnel-id.txt'
$PidPath = Join-Path $RuntimeRoot 'tunnel-client.pid'
$McpServerUrl = 'http://127.0.0.1:8975/mcp'

if (-not (Test-Path -LiteralPath $PidPath)) {
  Write-Host '[INFO] No Procedural Film tunnel PID file.'
  exit 0
}

$pidText = (Get-Content -LiteralPath $PidPath -Raw).Trim()
if ($pidText -notmatch '^\d+$') { throw 'Invalid tunnel PID file.' }
$processId = [int]$pidText

$p = Get-CimInstance Win32_Process -Filter "ProcessId=$processId" -ErrorAction SilentlyContinue
if (-not $p) {
  Remove-Item -LiteralPath $PidPath -Force -ErrorAction SilentlyContinue
  Write-Host '[INFO] Tunnel process already absent.'
  exit 0
}

if (-not (Test-Path -LiteralPath $TunnelIdPath)) {
  throw 'Tunnel ID missing; refusing to stop an unverified process.'
}

$tunnelId = (Get-Content -LiteralPath $TunnelIdPath -Raw).Trim()
$cmd = [string]$p.CommandLine
$owned = $p.Name -ieq 'tunnel-client.exe' -and $cmd -match [regex]::Escape($tunnelId) -and $cmd -match [regex]::Escape($McpServerUrl)

if (-not $owned) {
  throw "PID $processId is not the exact Procedural Film tunnel process. Refusing to stop it."
}

Stop-Process -Id $processId -Force -ErrorAction Stop
Remove-Item -LiteralPath $PidPath -Force -ErrorAction SilentlyContinue
Write-Host "[PASS] Stopped Procedural Film tunnel PID $processId"
