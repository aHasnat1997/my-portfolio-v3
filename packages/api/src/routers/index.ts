import type { Context } from "../context";

// import { contract } from "../index";

export function createRouter(ctx: Context) {
  console.log("🚀 ~ index.ts:7 ~ createRouter ~ ctx:", ctx);

  return {
    healthCheck: async () => {
      return {
        status: 200 as const,
        body: "OK" as const,
      };
    },
  };
}

export type AppRouter = ReturnType<typeof createRouter>;
