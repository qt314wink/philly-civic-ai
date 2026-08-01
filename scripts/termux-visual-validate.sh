#!/data/data/com.termux/files/usr/bin/bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

export AUDIT_OUTPUT="${AUDIT_OUTPUT:-$ROOT/visual-artifacts}"
export AUDIT_URL="${AUDIT_URL:-http://127.0.0.1:4173}"

for command in node npm curl; do
  command -v "$command" >/dev/null 2>&1 || {
    echo "Missing $command. Install Termux prerequisites with:"
    echo "  pkg update && pkg install nodejs-lts git curl x11-repo chromium"
    exit 1
  }
done

if ! command -v chromium-browser >/dev/null 2>&1 && ! command -v chromium >/dev/null 2>&1; then
  echo "Chromium not found. Run: pkg install x11-repo chromium"
  exit 1
fi

if [[ -f package-lock.json ]]; then
  npm ci --no-audit --no-fund
else
  echo "No package-lock.json yet; creating the canonical lockfile once. Commit it after this succeeds."
  npm install --no-audit --no-fund
fi

npm run validate
rm -rf "$AUDIT_OUTPUT"
mkdir -p "$AUDIT_OUTPUT"

npm run preview -- --host 127.0.0.1 --port 4173 >"$AUDIT_OUTPUT/preview.log" 2>&1 &
SERVER_PID=$!
cleanup() {
  kill "$SERVER_PID" >/dev/null 2>&1 || true
  wait "$SERVER_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

for _ in $(seq 1 60); do
  if curl -fsS "$AUDIT_URL" >/dev/null; then
    break
  fi
  sleep 1
done

curl -fsS "$AUDIT_URL" >/dev/null || {
  echo "Preview server did not become ready. See $AUDIT_OUTPUT/preview.log"
  exit 1
}

node scripts/visual-audit.mjs "$AUDIT_URL"
echo "Validation complete: $AUDIT_OUTPUT"
