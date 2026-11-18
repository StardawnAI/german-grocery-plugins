# Installs or updates the prebuilt CLI from the Printing Press library release
# and checks its SHA-256 against the release's checksums.txt.
# Usage: powershell -ExecutionPolicy Bypass -File install.ps1 [-Dest <dir>]
param([string]$Dest = (Join-Path $env:LOCALAPPDATA 'Programs\PrintingPress\bin'))
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

$Tool = 'edeka-pp-cli'
$Tag = 'edeka-current'
$Base = "https://github.com/mvanhorn/printing-press-library/releases/download/$Tag"

$arch = if ($env:PROCESSOR_ARCHITECTURE -eq 'ARM64') { 'arm64' } else { 'amd64' }
$asset = "$Tool-windows-$arch.exe"
$tmp = Join-Path ([IO.Path]::GetTempPath()) ([IO.Path]::GetRandomFileName())
New-Item -ItemType Directory -Path $tmp | Out-Null
try {
    try {
        Invoke-WebRequest -UseBasicParsing -Uri "$Base/checksums.txt" -OutFile (Join-Path $tmp 'checksums.txt')
    } catch {
        throw "No release found at $Base (the CLI may not be published yet)"
    }
    $line = Get-Content (Join-Path $tmp 'checksums.txt') | Where-Object { ($_ -split '\s+')[1] -in @($asset, "*$asset") } | Select-Object -First 1
    if (-not $line) { throw "The release has no build for windows/$arch ($asset)" }
    $want = ($line -split '\s+')[0].ToLower()
    $file = Join-Path $tmp $asset
    Invoke-WebRequest -UseBasicParsing -Uri "$Base/$asset" -OutFile $file
    $got = (Get-FileHash -Algorithm SHA256 $file).Hash.ToLower()
    if ($got -ne $want) { throw "Checksum mismatch for ${asset}: expected $want, got $got. Not installed." }
    New-Item -ItemType Directory -Force -Path $Dest | Out-Null
    $target = Join-Path $Dest "$Tool.exe"
    Move-Item -Force $file $target
    Write-Output "Installed $Tool to $target (checksum verified)"
    if (-not (($env:PATH -split ';') -contains $Dest)) {
        Write-Output "Note: $Dest is not on PATH; call `"$target`" or add it to PATH"
    }
    & $target --version
} finally {
    Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
}
