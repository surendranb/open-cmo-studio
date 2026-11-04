---
name: mcp-server-dev
description: Parent skill and orchestrator for Anthropic's official mcp-server-dev plugin. Coordinates building MCP servers (remote HTTP, stdio, MCPB) and MCP UI apps.
version: 0.1.0
---

# MCP Server Development (mcp-server-dev)

This skill provides comprehensive guidance for building, packaging, and deploying Model Context Protocol (MCP) servers and interactive MCP apps.

It coordinates three specialized sub-skills:
- `build-mcp-server`: Entry point for architecture, discovery, interrogation, and deployment model recommendation (Remote HTTP vs Local stdio vs MCPB).
- `build-mcp-app`: Interactive UI widgets (apps SDK, forms, pickers, dashboards) rendered inline in chat.
- `build-mcpb`: Portable single-file bundled local MCP server packaging.
