import { mergeRouters, publicProcedure, router } from "./lib";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "./lib";
import { productsRouter } from "./products";

const greetingRouter = router({
  greeting: publicProcedure.query(() => "hello tRPC v10!"),
});

export const appRouter = mergeRouters(greetingRouter, productsRouter);

export type AppRouter = typeof appRouter;

export const trpcMiddleware = trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
});
