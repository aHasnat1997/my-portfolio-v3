// @ts-check
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import cloudflare from "@astrojs/cloudflare"

import vercel from "@astrojs/vercel";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
  adapter: vercel(),
})