import { Router } from "express";
import { Cart, Order, OrderItem, OrderStatus, PriceModel, ReservedProduct } from "types";
import { createOrder, createOrderHoldEntry, getProduct, incrementStockCount } from "../db";
import { v4 as uuidv4 } from 'uuid';
import { Stripe } from 'stripe';

const router = Router();

const DEFAULT_ORDER_EXPIRY_TIME = "24";
const frontendUrl: string = process.env.FRONTEND_STAGING_DOMAIN || "";

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || "";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const stripe = new Stripe(STRIPE_KEY, {
  apiVersion: '2022-11-15',
});

type CheckoutBody = Cart & {
  email: string;
}

router.post("/", (req, res) => {
  const body = req.body as CheckoutBody;
  const { email, items } = body;
  if (!email) {
    throw new Error("Billing email must be provided when checking out");
  }
  if (!items.length) {
    throw new Error("Cart must not be empty when checking out");
  }

  const itemsProductsPromise = generateOrderItemsFromCart(body);
  const orderID = uuidv4();
  const pricePromise = itemsProductsPromise.then(itemsProducts => {
    const price = calcCartValue(itemsProducts);
    return { itemsProducts, price };
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const paymentIntentPromise = pricePromise.then(({ itemsProducts, price }) => stripe.paymentIntents.create({
    payment_method_types: ['paynow'],
    payment_method_data: { type: 'paynow' },
    amount: Math.floor(price.grandTotal * 100), // stripe payment amounts are in cents
    currency: 'sgd',
    receipt_email: body.email,
    description: `SCSE Merch Purchase:\n${describeCart(itemsProducts, orderID)}`,
  }));
  const expiryPromise = Promise.resolve(process.env.ORDER_EXPIRY_TIME ?? DEFAULT_ORDER_EXPIRY_TIME)
    .then(expiryTime => new Date(new Date().getTime() + (parseInt(expiryTime) * 60 * 60 * 1000)).toISOString());

  Promise.all([itemsProductsPromise, pricePromise, paymentIntentPromise, expiryPromise])
    .then(([itemsProducts, price, paymentIntent, expiry]) => {
      const orderID = uuidv4();
      const orderDateTime = new Date().toISOString();
      const customerEmail = body.email;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const transactionID = paymentIntent.id;
      const paymentPlatform = 'stripe';
      const status = OrderStatus.PENDING_PAYMENT;

      const order: Order = {
        id: orderID,
        items: itemsProducts,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        transaction_id: transactionID,
        transaction_time: orderDateTime,
        payment_method: paymentPlatform,
        customer_email: customerEmail,
        status: status,
      };

      for (const orderItem of itemsProducts) {
        void incrementStockCount(orderItem.id, -orderItem.quantity, orderItem.size, orderItem.color);
      }

      const reservedProducts: ReservedProduct[] = body.items.map(item => {
        return {
          productID: item.productId,
          qty: item.quantity
        };
      });
      const orderHoldEntry = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        transactionID,
        expiry: Math.floor(new Date(expiry).getTime() / 1000),
        reservedProducts,
      };

      createOrder(order)
        .then(() => createOrderHoldEntry(orderHoldEntry))
        .then(() => {
          res.json({
            orderId: orderID,
            items: itemsProducts,
            price: price,
            payment: {
              paymentGateway: 'stripe',
              clientSecret: paymentIntent.client_secret,
            },
            email: body.email,
            expiry: Math.floor(new Date(expiry).getTime() / 1000),
          });
        })
        .catch(err => {
          console.error('Error creating order hold entry:', err);
          res.status(500).json({ detail: 'Error unable to check out.' });
        });
    })
    .catch(e => {
      if (e.code === 'ConditionalCheckFailedException') {
        res.status(400).json({ detail: 'Current quantity cannot be less than 0 and must be available for sale' });
      }
    })
})


export function calcCartValue(cartOrderItems: OrderItem[]): PriceModel {
  let subtotal = 0;
  for (const i of cartOrderItems) {
    subtotal += i.price * i.quantity;
  }

  const grandTotal = subtotal;

  return {
    currency: 'sgd',
    subtotal,
    discount: 0, // todo
    grandTotal,
  };
}

function describeCart(cartOrderItems: OrderItem[], orderId: string): string {
  const entries = [
    `${frontendUrl}/order-summary/${orderId} | `
  ];

  for (const entry of cartOrderItems) {
    const price = entry.price * entry.quantity;
    let name = entry.name;
    if (entry.size) {
      name = `${entry.name} (Size: ${entry.size.toUpperCase()})`;
    }
    entries.push(`${name} x${entry.quantity} - S$${(price / 100).toFixed(2)}`);
  }

  return entries.join('\n');
}

export async function generateOrderItemsFromCart(cart: Cart): Promise<OrderItem[]> {
  const cartOrderItems: OrderItem[] = [];
  for (const item of cart.items) {
    const product = await getProduct(item.productId);
    if (!product) {
      throw new Error(`productId ${item.productId} could not be found`);
    }
    cartOrderItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
      quantity: item.quantity,
      size: item.size,
      color: item.colorway
    });
  }
  return cartOrderItems;
}
