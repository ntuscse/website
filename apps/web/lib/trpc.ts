import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "../../merch/src/trpc/router";

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_MERCH_API_ORIGIN)
    return process.env.NEXT_PUBLIC_MERCH_API_ORIGIN;

  // throw error if not set
  throw new Error("NEXT_PUBLIC_MERCH_API_ORIGIN is not set");
}

export const trpc = createTRPCNext<AppRouter>({
  config(_opts) {
    return {
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/trpc`,

          // You can pass any HTTP headers you wish here
          // eslint-disable-next-line @typescript-eslint/require-await
          async headers() {
            return {
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: false,
});
