$ErrorActionPreference = 'Stop'

$RuntimeRoot = Join-Path $env:LOCALAPPDATA 'ProceduralFilmRuntimeTunnel'
$ConfigRoot = Join-Path $RuntimeRoot 'config'
$LogsRoot = Join-Path $RuntimeRoot 'logs'
$TunnelIdPath = Join-Path $ConfigRoot 'tunnel-id.txt'
$EncryptedKeyPath = Join-Path $ConfigRoot 'runtime-key.dpapi.txt'
$PidPath = Join-Path $RuntimeRoot 'tunnel-client.pid'
$HealthUrlPath = Join-Path $RuntimeRoot 'health-url.txt'
$StdoutPath = Join-Path $LogsRoot 'tunnel-client.stdout.log'
$StderrPath = Join-Path $LogsRoot 'tunnel-client.stderr.log'

$ExistingTunnelRoot = Join-Path $env:LOCALAPPDATA 'PlaywrightMultiLaneM9SecureTunnelR1'
$TunnelExe = Join-Path $ExistingTunnelRoot 'tools\tunnel-client-v0.0.14-windows-amd64\tunnel-client.exe'
$ExpectedTunnelExeSha256 = 'fcc85a69ec0ad82518e4f8964f60c45e31787957782a0fc9c1b0c44e82d61b9b'
$McpServerUrl = 'http://127.0.0.1:8975/mcp'

Write-Host '=== Start Procedural Film Runtime Tunnel ==='

if (-not (Test-Path -LiteralPath $TunnelIdPath)) { throw 'Tunnel is not provisioned: tunnel-id.txt missing.' }
if (-not (Test-Path -LiteralPath $EncryptedKeyPath)) { throw 'Tunnel is not provisioned: runtime-key.dpapi.txt missing.' }
if (-not (Test-Path -LiteralPath $TunnelExe)) { throw 'Pinned tunnel-client.exe missing.' }

$actualSha = (Get-FileHash -Algorithm SHA256 -LiteralPath $TunnelExe).Hash.ToLowerInvariant()
if ($actualSha -ne $ExpectedTunnelExeSha256) {
  throw "Unexpected tunnel-client.exe SHA-256: $actualSha"
}

try {
  $runtimeHealth = Invoke-RestMethod -Uri 'http://127.0.0.1:8975/healthz' -Method Get -TimeoutSec 3
  if ($runtimeHealth.ok -ne $true) { throw 'Runtime health payload did not report ok=true.' }
} catch {
  throw 'Procedural Film Docker runtime is not READY at http://127.0.0.1:8975/healthz. Start it first.'
}

$TunnelId = (Get-Content -LiteralPath $TunnelIdPath -Raw).Trim()

if (Test-Path -LiteralPath $PidPath) {
  $oldPidText = (Get-Content -LiteralPath $PidPath -Raw -ErrorAction SilentlyContinue).Trim()
  if ($oldPidText -match '^\d+$') {
    $oldPid = [int]$oldPidText
    $p = Get-CimInstance Win32_Process -Filter "ProcessId=$oldPid" -ErrorAction SilentlyContinue
    if ($p) {
      $cmd = [string]$p.CommandLine
      $owned = $p.Name -ieq 'tunnel-client.exe' -and $cmd -match [regex]::Escape($TunnelId) -and $cmd -match [regex]::Escape($McpServerUrl)
      if (-not $owned) {
        throw "PID file points to a process that is not the exact Procedural Film tunnel. Refusing to touch PID $oldPid."
      }

      if (Test-Path -LiteralPath $HealthUrlPath) {
        $healthBase = (Get-Content -LiteralPath $HealthUrlPath -Raw -ErrorAction SilentlyContinue).Trim()
        if ($healthBase -match '^http://127\.0\.0\.1:\d+$') {
          try {
            $hz = Invoke-WebRequest -Uri "$healthBase/healthz" -TimeoutSec 3 -SkipHttpErrorCheck
            $rz = Invoke-WebRequest -Uri "$healthBase/readyz" -TimeoutSec 3 -SkipHttpErrorCheck
            if ([int]$hz.StatusCode -eq 200 -and [int]$rz.StatusCode -eq 200) {
              Write-Host "[PASS] Exact tunnel already READY. PID=$oldPid"
              Write-Host "[INFO] Health: $healthBase"
              exit 0
            }
          } catch {}
        }
      }

      throw "Exact Procedural Film tunnel process PID $oldPid exists but is not healthy. Stop it explicitly before restart."
    }
  }
}

New-Item -ItemType Directory -Force -Path $RuntimeRoot,$LogsRoot | Out-Null
Remove-Item -LiteralPath $HealthUrlPath,$StdoutPath,$StderrPath -Force -ErrorAction SilentlyContinue

$encrypted = (Get-Content -LiteralPath $EncryptedKeyPath -Raw).Trim()
$secure = $encrypted | ConvertTo-SecureString
$bstr = [IntPtr]::Zero
$plain = $null

try {
  $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  $plain = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
  if ([string]::IsNullOrWhiteSpace($plain)) { throw 'DPAPI runtime-key decrypt returned empty value.' }

  $env:CONTROL_PLANE_API_KEY = $plain
  $args = @('run',"--control-plane.tunnel-id=$TunnelId","--mcp.server-url=$McpServerUrl",'--health.listen-addr=127.0.0.1:0',"--health.url-file=$HealthUrlPath",'--log.level=info','--log.format=json')
  $proc = Start-Process -FilePath $TunnelExe -ArgumentList $args -RedirectStandardOutput $StdoutPath -RedirectStandardError $StderrPath -WindowStyle Hidden -PassThru
  Set-Content -LiteralPath $PidPath -Value ([string]$proc.Id) -Encoding ascii
}
finally {
  Remove-Item Env:CONTROL_PLANE_API_KEY -ErrorAction SilentlyContinue
  if ($bstr -ne [IntPtr]::Zero) { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) }
  $plain = $null
  $secure = $null
}

$deadline = [DateTime]::UtcNow.AddSeconds(45)
do {
  if ($proc.HasExited) {
    $err = (Get-Content -LiteralPath $StderrPath -Raw -ErrorAction SilentlyContinue)
    throw "tunnel-client exited early. $err"
  }

  if (Test-Path -LiteralPath $HealthUrlPath) {
    $healthBase = (Get-Content -LiteralPath $HealthUrlPath -Raw -ErrorAction SilentlyContinue).Trim()
    if ($healthBase -match '^http://127\.0\.0\.1:\d+$') {
      try {
        $hz = Invoke-WebRequest -Uri "$healthBase/healthz" -TimeoutSec 3 -SkipHttpErrorCheck
        $rz = Invoke-WebRequest -Uri "$healthBase/readyz" -TimeoutSec 3 -SkipHttpErrorCheck
        if ([int]$hz.StatusCode -eq 200 -and [int]$rz.StatusCode -eq 200) {
          Write-Host '[PASS] Secure Tunnel READY'
          Write-Host "[INFO] Tunnel ID: $TunnelId"
          Write-Host "[INFO] MCP target: $McpServerUrl"
          Write-Host "[INFO] Tunnel health: $healthBase"
          Write-Host "[INFO] PID: $($proc.Id)"
          exit 0
        }
      } catch {}
    }
  }

  Start-Sleep -Milliseconds 500
} while ([DateTime]::UtcNow -lt $deadline)

throw 'Secure Tunnel did not reach healthz/readyz 200 within 45 seconds.'
