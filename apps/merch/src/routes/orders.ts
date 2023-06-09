import { Router } from "express";
import { Order } from "types";
import { getOrder, NotFoundError } from "../db";

const router = Router();

router.get("/:id", (req, res) => {
  getOrder(req.params.id)
    .then((order: Order) => {
      res.json(censorDetails(order));
    })
    .catch((e) => {
      if (e instanceof NotFoundError) {
        return res.status(404).json({ error: "NOT_FOUND" });
      }
      console.warn(e);
      res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    });
});

const censorDetails = (order: Order): Order => {
  const censored = { ...order };
  const customerEmail = order.customer_email.split("@");
  censored.customer_email =
    starCensor(customerEmail[0]) + "@" + customerEmail.slice(1).join("@");
  if (censored.transaction_id.length > 3) {
    censored.transaction_id = starCensor(censored.transaction_id);
  }
  return censored;
};

const starCensor = (text: string, lettersToKeep = 3): string => {
  if (text.length < lettersToKeep) {
    return text;
  }
  return text.substring(0, lettersToKeep) + "*".repeat(text.length - 3);
};

export default router;
