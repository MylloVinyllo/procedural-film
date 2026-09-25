$ErrorActionPreference = 'Stop'

$ScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$RuntimeRoot = Split-Path -Parent $ScriptRoot

Push-Location $RuntimeRoot
try {
  docker compose down
}
finally {
  Pop-Location
}
