import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create(); // todo: add context to initTRPC

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

export const mergeRouters = t.mergeRouters;
