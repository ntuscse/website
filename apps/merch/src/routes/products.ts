import { Product, ProductsResponse } from "types";
import { getProduct, getProducts, NotFoundError } from "../db";
import { Request, Response } from "../lib/types";

export const productsAll = (req: Request, res: Response<ProductsResponse>) => {
  getProducts()
    .then((products: Product[]) => {
      res.json({ products });
    })
    .catch((e) => {
      if (e instanceof NotFoundError) {
        return res.status(404).json({ error: "NOT_FOUND" });
      }
      console.warn(e);
      res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    });
};

export const productGet = (req: Request<"id">, res: Response<Product>) => {
  getProduct(req.params.id)
    .then((product: Product) => {
      res.json(product);
    })
    .catch((e) => {
      if (e instanceof NotFoundError) {
        return res.status(404).json({ error: "NOT_FOUND" });
      }
      console.warn(e);
      res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    });
};
