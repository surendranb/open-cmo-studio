import fs from "fs"
import path from "path"

export interface ProductVersion {
  product: string
  engine: string
  channel: string
}

export function loadProductVersion(rootDir: string): ProductVersion {
  const versionFile = path.join(rootDir, "version.json")
  try {
    if (fs.existsSync(versionFile)) {
      return JSON.parse(fs.readFileSync(versionFile, "utf-8"))
    }
  } catch (err) {
    console.warn("Could not read version.json, falling back to default.", err)
  }
  return {
    product: "0.3.0",
    engine: "2.2.0",
    channel: "stable"
  }
}

export function getUserAgent(version: ProductVersion): string {
  return `opencmo/${version.product} (opencode/${version.engine}; ${process.platform} ${process.arch})`
}
