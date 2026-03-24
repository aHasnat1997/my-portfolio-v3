import { createContext } from "@my-dev-portfolio/api/context";
import { contract } from "@my-dev-portfolio/api/index";
import { createRouter } from "@my-dev-portfolio/api/routers";
import { createNextHandler } from "@ts-rest/serverless/next";

const handler = createNextHandler(
  contract,
  async (args, { request }) => {
    const ctx = createContext(request);
    const router = createRouter(ctx);

    // Handle routes
    const path = args.appRoute.path;
    if (path === "/health") {
      return router.healthCheck();
    }

    return { status: 404 as const, body: { message: "Not found" } };
  },
  {
    basePath: "/api/rest",
    jsonQuery: true,
  },
);

export { handler as GET, handler as POST, handler as PATCH, handler as DELETE };
