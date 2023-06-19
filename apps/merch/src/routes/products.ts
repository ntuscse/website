import { Router } from "express";
import { products } from "../data/products";

const router = Router();

router.get("/", (req, res) => {
  res.json({ products });
});

// get 1 product
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }
  res.json({ product });
});

export default router;
