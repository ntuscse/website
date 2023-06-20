import { router, publicProcedure } from "../lib";
import { z } from "zod";
export const paymentRouter = router({
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation((opts) => {
      const { input } = opts;

      return {
        creation: "success",
      };

      // [...]
    }),
});
