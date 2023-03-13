import { readItem } from "./dynamodb";
import { Order, OrderStatus } from "types";

const ORDER_TABLE_NAME = process.env.ORDER_TABLE_NAME;

interface DynamoOrder {
  orderID: string;
  paymentGateway: string;
  orderItems: {
    image: string;
    quantity: number;
    size: string;
    price: number;
    name: string;
    colorway: string;
    id: string;
    product_category: string;
  }[];
  status: OrderStatus;
  customerEmail: string;
  transactionID: string;
  orderDateTime: string;
}

export const getOrder = async (id: string) => {
  const dynamoOrder = await readItem<DynamoOrder>(
    ORDER_TABLE_NAME,
    id,
    "orderID"
  );
  return decodeOrder(dynamoOrder);
};

const decodeOrder = (order: DynamoOrder): Order => {
  let date: ?string;
  try {
    date = new Date(order.orderDateTime).toISOString();
  } catch (e) {
    date = null;
  }
  return {
    id: order.orderID || "",
    payment_method: order.paymentGateway || "",
    items: order.orderItems.map((item) => ({
      id: item.id || "",
      name: item.name || "",
      category: item.product_category || "",
      image: item.image || null,
      color: item.colorway || "",
      size: item.size || "",
      price: item.price || 0,
      quantity: item.quantity || 1,
    })),
    status: order.status || PENDING_PAYMENT,
    customer_email: order.customerEmail || "",
    transaction_id: order.transactionID || "",
    transaction_time: date,
  };
};
