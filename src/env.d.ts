/// <reference types="astro/client" />

import type { PostHog } from "posthog-js"

declare global {
  interface Window {
    __posthog_initialized?: boolean
    posthog?: PostHog
  }
}

export {}
