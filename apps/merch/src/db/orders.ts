import { readItem, writeItem } from "./dynamodb";
import { v4 as uuidv4 } from "uuid";
import { Order, OrderItem, OrderStatus, OrderHoldEntry } from "types";

const ORDER_TABLE_NAME = process.env.ORDER_TABLE_NAME;
const ORDER_HOLD_TABLE_NAME = process.env.ORDER_HOLD_TABLE_NAME;

if (!ORDER_TABLE_NAME) {
  throw new Error("ORDER_TABLE_NAME is not defined");
}
if (!ORDER_HOLD_TABLE_NAME) {
  throw new Error("ORDER_HOLD_TABLE_NAME is not defined");
}

interface DynamoOrderItem {
  id: string;
  image: string;
  quantity: number;
  size: string;
  price: number;
  name: string;
  colorway: string;
  // product_category: string;
}

interface DynamoOrder {
  orderID: string;
  paymentGateway: string;
  orderItems: DynamoOrderItem[];
  status: OrderStatus;
  customerEmail: string;
  transactionID: string;
  orderDateTime: string;
}

interface DynamoOrderHoldEntry {
  // todo
}

export const getOrder = async (id: string) => {
  const dynamoOrder = await readItem<DynamoOrder>(
    ORDER_TABLE_NAME ?? "",
    id,
    "orderID"
  );
  return decodeOrder(dynamoOrder);
};

const decodeOrder = (order: DynamoOrder): Order => {
  let date: string | null;
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
      // category: item.product_category || "",
      image: item.image || undefined,
      color: item.colorway || "",
      size: item.size || "",
      price: item.price || 0,
      quantity: item.quantity || 1,
    })),
    status: order.status || OrderStatus.PENDING_PAYMENT,
    customer_email: order.customerEmail || "",
    transaction_id: order.transactionID || "",
    transaction_time: date || null,
  };
};

const encodeOrderItem = (item: OrderItem): DynamoOrderItem => ({
  id: item.id,
  image: item.image ? item.image : "",
  quantity: item.quantity,
  size: item.size,
  price: item.price,
  name: item.name,
  colorway: item.color,
  // product_category: item.category,
});

const encodeOrder = (order: Order): DynamoOrder => ({
  transactionID: order.transaction_id || "",
  orderID: order.id,
  paymentGateway: order.payment_method || "",
  orderItems: order.items.map(encodeOrderItem),
  status: order.status || OrderStatus.PENDING_PAYMENT,
  customerEmail: order.customer_email || "",
  orderDateTime: order.transaction_time
    ? new Date(order.transaction_time).toISOString()
    : new Date().toISOString(),
});

export const createOrder = async (order: Order): Promise<Order> => {
  const dynamoOrder = encodeOrder(order);
  dynamoOrder.orderID = uuidv4();
  await writeItem<DynamoOrder>(ORDER_TABLE_NAME, dynamoOrder);
  return decodeOrder(dynamoOrder);
};

const encodeOrderHoldEntry = (
  _orderHoldEntry: OrderHoldEntry
): DynamoOrderHoldEntry => {
  return {
    // todo
  };
};

export const createOrderHoldEntry = async (
  orderHoldEntry: OrderHoldEntry
): Promise<void> => {
  const dynamoOrderHoldEntry = encodeOrderHoldEntry(orderHoldEntry);
  await writeItem(ORDER_HOLD_TABLE_NAME, dynamoOrderHoldEntry);
};
