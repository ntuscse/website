import { Router } from "express";
import { getProduct, getProducts } from "../db";
import { Product } from "types";

const router = Router();

router.get("/", (req, res) => {
  getProducts()
    .then((products: Product[]) => {
      res.json({ products });
    })
    .catch((e) => {
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
      console.warn(e);
      res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    });
});

export default router;
