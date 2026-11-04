#!/usr/bin/env bash
# ==============================================================================
# Open CMO Studio — Interactive Company Onboarding Script
# Parameterizes workspace identity, products, audience, and ontology.
# ==============================================================================
set -euo pipefail

BOLD='\033[1m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
NC='\033[0m'

WORKSPACE_DIR="${1:-.}"

if [ ! -d "${WORKSPACE_DIR}/memory/wiki" ]; then
  echo -e "${YELLOW}Warning: ${WORKSPACE_DIR}/memory/wiki not found. Running from repository root or workspace.${NC}"
  mkdir -p "${WORKSPACE_DIR}/memory/wiki" "${WORKSPACE_DIR}/memory/ontology"
fi

echo -e "${BOLD}${BLUE}=== Open CMO Studio — Company Onboarding ===${NC}"
echo -e "Configure your company truth so the autonomous CMO and crew work for you.\n"

# Prompt with defaults
read -r -p "Company Name [CloudPulse]: " COMPANY_NAME
COMPANY_NAME="${COMPANY_NAME:-CloudPulse}"

read -r -p "Website URL [https://cloudpulse.io]: " COMPANY_URL
COMPANY_URL="${COMPANY_URL:-https://cloudpulse.io}"

read -r -p "Tagline / Value Proposition [Real-Time Cloud Cost Intelligence]: " COMPANY_TAGLINE
COMPANY_TAGLINE="${COMPANY_TAGLINE:-Real-Time Cloud Cost Intelligence}"

read -r -p "Founder / Principal Title [Founder & CEO]: " FOUNDER_TITLE
FOUNDER_TITLE="${FOUNDER_TITLE:-Founder & CEO}"

read -r -p "Target Audience / ICP [Platform Engineers & SREs]: " TARGET_AUDIENCE
TARGET_AUDIENCE="${TARGET_AUDIENCE:-Platform Engineers & SREs}"

read -r -p "Core Subreddits / Channels [r/devops, r/kubernetes, r/aws]: " CHANNELS
CHANNELS="${CHANNELS:-r/devops, r/kubernetes, r/aws}"

echo -e "\nWriting configured company identity to memory..."

# 1. memory/wiki/identity.md
cat <<EOF > "${WORKSPACE_DIR}/memory/wiki/identity.md"
# Company Identity

## Company Overview
* **Company Name**: ${COMPANY_NAME}
* **Website**: ${COMPANY_URL}
* **Tagline**: ${COMPANY_TAGLINE}

## Founder / Executive Persona
* **Title**: ${FOUNDER_TITLE} (The Principal)
* **Operating Style**: Technical builder, data-backed decisions, shipping daily.
* **Decision Gate**: The Principal decides strategy, approves public posts, and gates releases.

## Voice & Values
* **Tone**: Technical, pragmatic, evidence-based, zero marketing fluff.
* **Working Law**: Never claim without verification. Concrete numbers and clickable source links over vague claims.
* **Palette**: Happy Hues #17 (Navy \`#001858\`, Cream \`#fef6e4\`, Pink \`#f582ae\`, Teal \`#8bd3dd\`).
EOF

# 2. memory/wiki/audience.md
cat <<EOF > "${WORKSPACE_DIR}/memory/wiki/audience.md"
# Target Audience & Channel Map

## Ideal Customer Profile (ICP)
* **Primary**: ${TARGET_AUDIENCE}
* **Organization**: Modern software development teams building on cloud infrastructure.

## Core Growth Channels
* **Developer Communities**: ${CHANNELS}
* **Search & Documentation**: Technical tutorials, architectural comparisons, open-source documentation.
* **Social Platforms**: Builder-in-public technical threads on X and LinkedIn.
EOF

echo -e "${GREEN}✓ Successfully updated:${NC}"
echo -e "  - ${WORKSPACE_DIR}/memory/wiki/identity.md"
echo -e "  - ${WORKSPACE_DIR}/memory/wiki/audience.md"
echo -e "\n${BOLD}${GREEN}Your Open CMO Studio workspace is personalized and ready.${NC}\n"
