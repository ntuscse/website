import { publicProcedure, router } from "./lib";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "./lib";
import { paymentRouter } from "./payment";

const appRouter = router({
  greeting: publicProcedure.query(() => "hello tRPC v10!"),
  payment: paymentRouter,
});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;

export const trpcMiddleware = trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
});
