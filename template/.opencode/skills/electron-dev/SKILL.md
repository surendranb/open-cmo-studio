---
name: electron-dev
description: Architecture and development patterns for Electron desktop applications with Bun and TypeScript on macOS. Covers process boundaries, IPC messaging, window state management, and native integrations.
---

# Electron & Desktop Development Guidance

Architecture patterns for developing desktop applications like `studio-cmo-desktop`.

## 1. Process Separation & Security
- **Main Process**: Responsible for application lifecycle, system menus, window creation, native filesystem access, and background workers.
- **Preload Script**: Isolated context bridge (`contextBridge.exposeInMainWorld`). Expose only explicit, typed IPC functions; never pass raw Node primitives or remote modules to the renderer.
- **Renderer Process**: Pure web UI (SolidJS/React). Must run with `nodeIntegration: false` and `contextIsolation: true`.

---

## 2. Dynamic Path Resolution
- **Rule**: NEVER hardcode `/Users/<username>/` or machine-specific static paths.
- **Main Process**: Use `app.getPath("home")`, `app.getPath("userData")`, `app.getPath("documents")`.
- **Config & Shell**: Use `{env:HOME}` placeholders and dynamic path joining via `path.join()`.

---

## 3. Window State & Native UX
- Use `electron-window-state` to persist window coordinates and maximize states across reboots.
- On macOS, configure `titleBarStyle: 'hiddenInset'` for seamless traffic light button integration.
- Handle `app.on('activate')` to recreate windows when the dock icon is clicked.
