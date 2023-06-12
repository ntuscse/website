import { calculatePricing, PricingError } from "merch-helpers";
import { PricedCart, Product, QuotationRequest } from "types";
import { getProducts } from "../db";
import { Request, Response } from "../lib/types";

export const quotation = (req: Request, res: Response<PricedCart>) => {
  const body = QuotationRequest.safeParse(req.body);
  if (!body.success) {
    return res.status(400).json({
      error: "INVALID_TYPE",
      detail: body.error.format(),
    });
  }

  const cart = body.data;

  getProducts()
    .then((products: Product[]) => {
      // TODO: Fetch promotion.
      return calculatePricing(products, cart, undefined);
    })
    .then((cart: PricedCart) => res.json(cart))
    .catch((e) => {
      if (e instanceof PricingError) {
        return res.status(400).json({
          error: "INVALID_REQUEST",
          detail: e.message,
        });
      }
      console.warn(e);
      return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    });
};
