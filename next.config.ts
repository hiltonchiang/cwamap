import type { NextConfig } from "next"

const output = process.env.EXPORT ? 'export' : undefined
const basePath = process.env.BASE_PATH || undefined
const nextConfig: NextConfig = {
  output,
  basePath
}

export default nextConfig;
