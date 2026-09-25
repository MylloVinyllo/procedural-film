param(
  [Parameter(Mandatory = $true)]
  [ValidatePattern('^tunnel_[A-Za-z0-9]+$')]
  [string]$TunnelId
)

$ErrorActionPreference = 'Stop'

$RuntimeRoot = Join-Path $env:LOCALAPPDATA 'ProceduralFilmRuntimeTunnel'
$ConfigRoot = Join-Path $RuntimeRoot 'config'
$LogsRoot = Join-Path $RuntimeRoot 'logs'
$TunnelIdPath = Join-Path $ConfigRoot 'tunnel-id.txt'
$EncryptedKeyPath = Join-Path $ConfigRoot 'runtime-key.dpapi.txt'
$ProvisioningPath = Join-Path $ConfigRoot 'provisioning.json'

$ExistingTunnelRoot = Join-Path $env:LOCALAPPDATA 'PlaywrightMultiLaneM9SecureTunnelR1'
$TunnelExe = Join-Path $ExistingTunnelRoot 'tools\tunnel-client-v0.0.14-windows-amd64\tunnel-client.exe'
$ExpectedTunnelExeSha256 = 'fcc85a69ec0ad82518e4f8964f60c45e31787957782a0fc9c1b0c44e82d61b9b'

Write-Host '=== Provision Procedural Film Runtime Tunnel ==='

if (-not (Test-Path -LiteralPath $TunnelExe)) {
  throw "Pinned tunnel-client.exe not found at $TunnelExe"
}

$actualSha = (Get-FileHash -Algorithm SHA256 -LiteralPath $TunnelExe).Hash.ToLowerInvariant()
if ($actualSha -ne $ExpectedTunnelExeSha256) {
  throw "Unexpected tunnel-client.exe SHA-256: $actualSha"
}

New-Item -ItemType Directory -Force -Path $RuntimeRoot,$ConfigRoot,$LogsRoot | Out-Null

if (Test-Path -LiteralPath $TunnelIdPath) {
  $existing = (Get-Content -LiteralPath $TunnelIdPath -Raw).Trim()
  if ($existing -ne $TunnelId) {
    throw "A different tunnel is already provisioned here: $existing. Refusing silent replacement."
  }
}

$runtimeKey = Read-Host 'Paste the NEW Procedural Film Secure Tunnel runtime key' -AsSecureString
if (-not $runtimeKey) {
  throw 'Runtime key was not supplied.'
}

$encrypted = $runtimeKey | ConvertFrom-SecureString
if ([string]::IsNullOrWhiteSpace($encrypted)) {
  throw 'DPAPI encryption produced an empty value.'
}

Set-Content -LiteralPath $TunnelIdPath -Value $TunnelId -Encoding ascii
Set-Content -LiteralPath $EncryptedKeyPath -Value $encrypted -Encoding ascii

$meta = [ordered]@{
  schemaVersion = 1
  tunnelId = $TunnelId
  mcpServerUrl = 'http://127.0.0.1:8975/mcp'
  tunnelClientPath = $TunnelExe
  tunnelClientSha256 = $actualSha
  runtimeKeyStorage = 'WINDOWS_DPAPI_CURRENT_USER'
  plaintextPersisted = $false
  provisionedAtUtc = [DateTime]::UtcNow.ToString('o')
}

$meta | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $ProvisioningPath -Encoding utf8

Write-Host "[PASS] Provisioned tunnel $TunnelId"
Write-Host '[PASS] Runtime key stored with Windows DPAPI for the current user'
Write-Host "[INFO] Config root: $ConfigRoot"
Write-Host '[INFO] Plaintext runtime key was not persisted'
