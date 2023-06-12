import { calculatePricing, describeCart, PricingError } from "merch-helpers";
import { Stripe } from "stripe";
import {
    CheckoutRequest,
    CheckoutResponse,
    Order,
    OrderHold,
    OrderItem,
    OrderStatus,
    PricedCart,
    Product,
    ReservedProduct
} from "types";
import { v4 as uuidv4 } from "uuid";
import {
    createOrder,
    createOrderHoldEntry,
    getProducts,
    incrementStockCount
} from "../db";
import { JSONResponse, Request } from "../lib/types";

const ORDER_EXPIRY_TIME = parseInt(process.env.ORDER_EXPIRY_TIME ?? "24");

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || "";
const stripe = new Stripe(STRIPE_KEY, {
  apiVersion: "2022-11-15",
});

export const checkout = (req: Request, res: JSONResponse<CheckoutResponse>) => {
  const body = CheckoutRequest.safeParse(req.body);
  if (!body.success) {
    return res.status(400).json({
      error: "INVALID_TYPE",
      detail: body.error.format(),
    });
  }

  const cart = body.data;
  const { email, items } = body.data;
  if (!email) {
    return res.status(400).json({
      error: "BAD_REQUEST",
      detail: "Missing billing email",
    });
  }
  if (!items.length) {
    return res.status(400).json({
      error: "BAD_REQUEST",
      detail: "Empty cart",
    });
  }

  const orderID = uuidv4();
  const orderTime = new Date();
  const expiryTimeMillis = orderTime.getTime() + ORDER_EXPIRY_TIME;
  const expiryTime = new Date(expiryTimeMillis);

  getProducts()
    .then((products: Product[]): [Product[], PricedCart] => {
      // TODO: Fetch promotion.
      return [products, calculatePricing(products, cart, undefined)];
    })
    .then(([products, cart]) =>
      Promise.all([
        products,
        cart,
        stripe.paymentIntents.create({
          payment_method_types: ["paynow"],
          payment_method_data: { type: "paynow" },
          amount: cart.total,
          currency: "sgd",
          receipt_email: email,
          description: `SCSE Merch Purchase:\n${describeCart(
            products,
            cart,
            orderID
          )}`,
        }),
      ])
    )
    .then(([products, cart, stripeIntent]) => {
      const productMap: Record<string, Product> = {};
      for (const product of products) {
        productMap[product.id] = product;
      }

      const transactionID = stripeIntent.id;
      const orderItems = cart.items.map((item): OrderItem => {
        const product = productMap[item.id];
        return {
          id: item.id,
          name: product.name,
          category: product.category,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
          price: item.discountedPrice,
        };
      });
      const reserved = cart.items.map((item): ReservedProduct => ({
        id: item.id,
        quantity: item.quantity,
      }));
      const order: Order = {
        id: orderID,
        items: orderItems,
        transaction_id: transactionID,
        transaction_time: orderTime.toISOString(),
        payment_method: "stripe",
        customer_email: email,
        status: OrderStatus.PENDING_PAYMENT,
      };
      const orderHold: OrderHold = {
        transaction_id: transactionID,
        expiry: expiryTime.toISOString(),
        reserved_products: reserved,
      }

      const stockIncrements = cart.items.map((item) => incrementStockCount(
        item.id, -item.quantity, item.size, item.color,
      ))

      return Promise.all([createOrder(order), stripeIntent, createOrderHoldEntry(orderHold), ...stockIncrements])
    })
    .then(([order, stripeIntent]) => {
      res.json({
        ...order,
        expiry: expiryTime.toISOString(),
        payment: {
          method: "stripe",
          client_secret: stripeIntent.client_secret ?? "",
        },
      })
    })
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
