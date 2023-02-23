import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
  res.json({ content: "Hello World" });
})

export default router
