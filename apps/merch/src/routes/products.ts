import { Router } from "express";
import { Product } from "types";
import { getProduct, getProducts, NotFoundError } from "../db";

const router = Router();

router.get("/", (req, res) => {
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
});

router.get("/:id", (req, res) => {
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
});

export default router;
