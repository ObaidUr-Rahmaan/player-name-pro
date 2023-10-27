import { openAIRouter } from "~/server/api/routers/openai";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  openai: openAIRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
