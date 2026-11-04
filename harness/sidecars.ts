import { spawn, ChildProcess } from "child_process"
import path from "path"
import { app } from "electron"
import { homedir } from "os"
import fs from "fs"

interface SidecarProcess {
  name: string
  command: string
  args: string[]
  process?: ChildProcess
  port: number
}

export class SidecarSupervisor {
  private sidecars: SidecarProcess[] = []
  private isShuttingDown = false

  constructor() {
    const logsDir = path.join(homedir(), "Library", "Logs", "open-cmo-studio")
    fs.mkdirSync(logsDir, { recursive: true })

    this.sidecars = [
      {
        name: "arize-phoenix",
        command: "phoenix",
        args: ["serve", "--port", "6006"],
        port: 6006,
      },
      {
        name: "vectorize-hindsight",
        command: "hindsight",
        args: ["--port", "8888"],
        port: 8888,
      },
    ]

    app.on("before-quit", () => {
      this.isShuttingDown = true
      this.stopAll()
    })
  }

  public async startAll(): Promise<void> {
    for (const sidecar of this.sidecars) {
      await this.startSidecar(sidecar)
    }
  }

  private async startSidecar(sidecar: SidecarProcess): Promise<void> {
    // If port is already occupied (e.g. by launchd), adopt running service
    const isRunning = await this.isPortResponding(sidecar.port)
    if (isRunning) {
      console.log(`[Sidecar] ${sidecar.name} already healthy on port ${sidecar.port}.`)
      return
    }

    try {
      const child = spawn(sidecar.command, sidecar.args, {
        detached: false,
        stdio: "ignore",
      })

      sidecar.process = child

      child.on("exit", (code) => {
        if (!this.isShuttingDown) {
          console.warn(`[Sidecar] ${sidecar.name} exited with code ${code}. Restarting in 3s...`)
          setTimeout(() => this.startSidecar(sidecar), 3000)
        }
      })
    } catch (err) {
      console.warn(`[Sidecar] Could not spawn ${sidecar.name}:`, err)
    }
  }

  public stopAll(): void {
    for (const sidecar of this.sidecars) {
      if (sidecar.process && !sidecar.process.killed) {
        sidecar.process.kill("SIGTERM")
      }
    }
  }

  private isPortResponding(port: number): Promise<boolean> {
    return new Promise((resolve) => {
      import("http").then((http) => {
        const req = http.get(`http://127.0.0.1:${port}`, () => resolve(true))
        req.on("error", () => resolve(false))
        req.setTimeout(1000, () => {
          req.destroy()
          resolve(false)
        })
      })
    })
  }
}
