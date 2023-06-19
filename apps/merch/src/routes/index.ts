import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ content: "NTU SCSE Merch" });
});

export default router;
