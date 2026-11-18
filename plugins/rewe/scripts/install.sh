#!/usr/bin/env sh
# Installs or updates the prebuilt CLI from the Printing Press library release
# and checks its SHA-256 against the release's checksums.txt.
# Usage: install.sh [install-dir]   (default: $HOME/.local/bin)
set -eu

TOOL="rewe-pp-cli"
TAG="rewe-current"
BASE="https://github.com/mvanhorn/printing-press-library/releases/download/$TAG"
DEST="${1:-$HOME/.local/bin}"

case "$(uname -s)" in
  Darwin) os=darwin ;;
  Linux) os=linux ;;
  *) echo "Unsupported system $(uname -s); on Windows run install.ps1" >&2; exit 1 ;;
esac
case "$(uname -m)" in
  x86_64 | amd64) arch=amd64 ;;
  arm64 | aarch64) arch=arm64 ;;
  *) echo "Unsupported CPU $(uname -m)" >&2; exit 1 ;;
esac
asset="$TOOL-$os-$arch"

fetch() {
  if command -v curl >/dev/null 2>&1; then curl -fsSL "$1" -o "$2"
  elif command -v wget >/dev/null 2>&1; then wget -q "$1" -O "$2"
  else echo "Neither curl nor wget is installed" >&2; return 1
  fi
}
sha256() {
  if command -v sha256sum >/dev/null 2>&1; then sha256sum "$1" | cut -d' ' -f1
  else shasum -a 256 "$1" | cut -d' ' -f1
  fi
}

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
if ! fetch "$BASE/checksums.txt" "$tmp/checksums.txt"; then
  echo "No release found at $BASE (the CLI may not be published yet)" >&2
  exit 1
fi
want="$(awk -v f="$asset" '$2 == f || $2 == "*"f {print $1}' "$tmp/checksums.txt")"
if [ -z "$want" ]; then
  echo "The release has no build for $os/$arch ($asset)" >&2
  exit 1
fi
fetch "$BASE/$asset" "$tmp/$asset"
got="$(sha256 "$tmp/$asset")"
if [ "$got" != "$want" ]; then
  echo "Checksum mismatch for $asset: expected $want, got $got. Not installed." >&2
  exit 1
fi
mkdir -p "$DEST"
chmod +x "$tmp/$asset"
[ "$os" = darwin ] && xattr -d com.apple.quarantine "$tmp/$asset" 2>/dev/null || true
mv "$tmp/$asset" "$DEST/$TOOL"
echo "Installed $TOOL to $DEST/$TOOL (checksum verified)"
case ":$PATH:" in
  *":$DEST:"*) ;;
  *) echo "Note: $DEST is not on PATH; call $DEST/$TOOL or add it to PATH" ;;
esac
"$DEST/$TOOL" --version
