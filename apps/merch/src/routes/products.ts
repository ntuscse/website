import { Router } from "express";
import { Product } from "types";

const router = Router();

const products: Product[] = [
  {
    id: "1",
    name: "Sweater",
  },
];

router.get("/products", (req, res) => {
  res.json({ products });
});

export default router;
