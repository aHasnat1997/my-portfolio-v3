import "@my-dev-portfolio/env/web";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  // Disabled due to incompatibility with esbuild minification in Cloudflare Workers
  // reactCompiler: true,
};

export default nextConfig;
