import { Order } from "types";
import { getOrder, NotFoundError } from "../db";
import { Request, Response } from "../lib/types";

export const orderGet = (req: Request<"id">, res: Response<Order>) => {
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
};

const censorDetails = (order: Order): Order => {
  const customerEmail = order.customerEmail.split("@");
  return {
    ...order,
    customerEmail: starCensor(customerEmail[0]) + "@" + customerEmail.slice(1).join("@"),
    transactionId: starCensor(order.transactionId),
  };
};

const starCensor = (text: string, lettersToKeep = 3): string => {
  if (text.length < lettersToKeep) {
    return text;
  }
  return text.substring(0, lettersToKeep) + "*".repeat(text.length - 3);
};
