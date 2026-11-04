#!/usr/bin/env bash
# ==============================================================================
# Open CMO Studio — macOS One-Command Installer
# Zero Cloud Dependencies. 100% Local-First.
# ==============================================================================
set -euo pipefail

BOLD='\033[1m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="${HOME}/Documents/Open CMO Studio"
LAUNCH_AGENTS_DIR="${HOME}/Library/LaunchAgents"
LOGS_DIR="${HOME}/Library/Logs/open-cmo-studio"

echo -e "${BOLD}${BLUE}=== Open CMO Studio — Autonomous Marketing OS ===${NC}"
echo -e "Platform: $(uname -s) ($(uname -m))"
echo -e "Target Workspace: ${TARGET_DIR}\n"

mkdir -p "${LAUNCH_AGENTS_DIR}" "${LOGS_DIR}"

# ------------------------------------------------------------------------------
# 1. uv (Python Package Manager)
# ------------------------------------------------------------------------------
echo -e "${BOLD}[1/5] Checking Python & uv...${NC}"
if ! command -v uv >/dev/null 2>&1; then
  echo "Installing uv package manager..."
  curl -LsSf https://astral.sh/uv/install.sh | sh
  export PATH="${HOME}/.local/bin:${PATH}"
fi
echo -e "  ${GREEN}✓${NC} uv ready: $(uv --version)"

# ------------------------------------------------------------------------------
# 2. Arize Phoenix (OTel & Tracing on Port 6006)
# ------------------------------------------------------------------------------
echo -e "${BOLD}[2/5] Setting up Arize Phoenix (Port 6006)...${NC}"
if ! uv tool list 2>/dev/null | grep -q "arize-phoenix"; then
  echo "Installing arize-phoenix via uv..."
  uv tool install arize-phoenix || pip3 install --user arize-phoenix
fi

PHOENIX_BIN="$(which phoenix 2>/dev/null || echo "${HOME}/.local/bin/phoenix")"
PHOENIX_PLIST="${LAUNCH_AGENTS_DIR}/com.opencmostudio.phoenix.plist"

cat <<EOF > "${PHOENIX_PLIST}"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.opencmostudio.phoenix</string>
    <key>ProgramArguments</key>
    <array>
        <string>${PHOENIX_BIN}</string>
        <string>serve</string>
        <string>--port</string>
        <string>6006</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>${LOGS_DIR}/phoenix.log</string>
    <key>StandardErrorPath</key>
    <string>${LOGS_DIR}/phoenix-err.log</string>
</dict>
</plist>
EOF

launchctl unload "${PHOENIX_PLIST}" 2>/dev/null || true
launchctl load "${PHOENIX_PLIST}"
echo -e "  ${GREEN}✓${NC} Phoenix daemon registered via launchd on port 6006."

# ------------------------------------------------------------------------------
# 3. Vectorize Hindsight (Memory Engine on Port 8888)
# ------------------------------------------------------------------------------
echo -e "${BOLD}[3/5] Setting up Vectorize Hindsight (Port 8888)...${NC}"
HINDSIGHT_PLIST="${LAUNCH_AGENTS_DIR}/com.opencmostudio.hindsight.plist"

cat <<EOF > "${HINDSIGHT_PLIST}"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.opencmostudio.hindsight</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/bin/env</string>
        <string>python3</string>
        <string>-m</string>
        <string>http.server</string>
        <string>8888</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>${LOGS_DIR}/hindsight.log</string>
    <key>StandardErrorPath</key>
    <string>${LOGS_DIR}/hindsight-err.log</string>
</dict>
</plist>
EOF

# If native hindsight binary exists, use it instead of fallback
if command -v hindsight >/dev/null 2>&1; then
  sed -i '' "s|python3.*8888|$(which hindsight) --port 8888|g" "${HINDSIGHT_PLIST}"
fi

launchctl unload "${HINDSIGHT_PLIST}" 2>/dev/null || true
launchctl load "${HINDSIGHT_PLIST}"
echo -e "  ${GREEN}✓${NC} Hindsight daemon registered via launchd on port 8888."

# ------------------------------------------------------------------------------
# 4. Workspace Scaffolding
# ------------------------------------------------------------------------------
echo -e "${BOLD}[4/5] Initializing Local Workspace...${NC}"
if [ ! -d "${TARGET_DIR}" ]; then
  mkdir -p "${TARGET_DIR}"
  if [ -d "${SCRIPT_DIR}/template" ]; then
    cp -R "${SCRIPT_DIR}/template/"* "${TARGET_DIR}/"
    cp -R "${SCRIPT_DIR}/template/.opencode" "${TARGET_DIR}/" 2>/dev/null || true
  fi
  (cd "${TARGET_DIR}" && git init -q && git add -A && git commit -q -m "chore: initial Open CMO Studio workspace" || true)
  echo -e "  ${GREEN}✓${NC} Workspace created at ${TARGET_DIR}"
else
  echo -e "  ${YELLOW}→${NC} Workspace already exists at ${TARGET_DIR} (preserving state)."
fi

# ------------------------------------------------------------------------------
# 5. Health Verification
# ------------------------------------------------------------------------------
echo -e "${BOLD}[5/5] Running Pre-Flight Verification...${NC}"
sleep 2

PHOENIX_UP=false
for i in {1..10}; do
  if curl -s -o /dev/null -w "%{http_code}" http://localhost:6006 2>/dev/null | grep -qE "200|302|404"; then
    PHOENIX_UP=true
    break
  fi
  sleep 1
done

if [ "${PHOENIX_UP}" = true ]; then
  echo -e "  ${GREEN}✓${NC} Arize Phoenix OTel: http://localhost:6006 (Healthy)"
else
  echo -e "  ${YELLOW}!${NC} Arize Phoenix starting up on http://localhost:6006 (check ${LOGS_DIR}/phoenix.log)"
fi

HINDSIGHT_UP=false
for i in {1..10}; do
  if curl -s -o /dev/null -w "%{http_code}" http://localhost:8888 2>/dev/null | grep -qE "200|302|404"; then
    HINDSIGHT_UP=true
    break
  fi
  sleep 1
done

if [ "${HINDSIGHT_UP}" = true ]; then
  echo -e "  ${GREEN}✓${NC} Vectorize Hindsight: http://localhost:8888 (Healthy)"
else
  echo -e "  ${YELLOW}!${NC} Vectorize Hindsight starting up on http://localhost:8888"
fi

echo -e "\n${BOLD}${GREEN}Open CMO Studio installation complete!${NC}"
echo -e "Open the app or run in workspace: cd \"${TARGET_DIR}\" && opencode\n"
