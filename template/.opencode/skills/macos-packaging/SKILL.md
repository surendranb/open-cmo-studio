---
name: macos-packaging
description: Packaging, distribution, and bundling guidelines for macOS applications using electron-builder, Bun, and native architectures (arm64, x64).
---

# macOS Packaging & Distribution Playbook

Guidelines for packaging standalone Electron apps for macOS (`.dmg`, `.zip`).

## 1. Electron-Builder Configuration
- Configure `electron-builder.config.ts`:
  - `mac.target`: `["dmg", "zip"]`
  - `mac.category`: `"public.app-category.productivity"`
  - `mac.hardenedRuntime`: `true`
  - `mac.gatekeeperAssess`: `false`

## 2. Resource & Agent Bundling
- Ensure runtime resources (e.g. bundled agents, skills, and configuration files) are copied into `Contents/Resources/`:
  ```ts
  extraResources: [
    {
      from: "resources/cmo",
      to: "cmo",
      filter: ["**/*"]
    }
  ]
  ```
- When accessing bundled resources in the Main process, check `app.isPackaged` to resolve between development directories and `process.resourcesPath`.

## 3. Native Architecture & Bun Tooling
- Target Apple Silicon (`arm64`) as primary architecture.
- For packaging on macOS without official Apple Developer ID signing certificates, electron-builder cleanly outputs unsigned DMGs for internal/developer distribution.
