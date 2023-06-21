import { publicProcedure, router } from "../lib";
import { z } from "zod";
import { getProduct, getProducts } from "../../db";

export const productsRouter = router({
  getProducts: publicProcedure.query(async () => {
    // retrieve products from database
    const products = await getProducts();
    return { products };
  }),
  getProduct: publicProcedure
    .input(
      z.object({
        id: z.string().nonempty("id"),
      })
    )
    .query(({ input }) => {
      return getProduct(input.id);
    }),
});
