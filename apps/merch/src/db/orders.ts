import { readItem, readTable, writeItem } from "./mongodb";
import { Order, OrderItem, OrderStatus } from "types";
import { OrderDocument, OrderModel } from "../models/Order";

export interface MongoOrder {
  _id: string;
  items: MongoOrderItem[];
  transactionId: string;
  transactionTime: string | null;
  paymentMethod: string;
  customerEmail: string;
  status: OrderStatus;
}

export interface MongoOrderItem {
  id: string;
  name: string;
  image?: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
}

export const getOrders = async (): Promise<OrderDocument[]> => {
  const orders = await readTable(OrderModel);
  // TODO: decode orders
  return orders;
}

export const getOrder = async (id: string): Promise<Order> => {
  const order = await readItem<OrderDocument>(OrderModel, id, "_id");
  return decodeOrder(order);
};

export const createOrder = async (order: Order): Promise<Order | null> => {
  const mongoOrder = encodeOrder(order);
  const newItem = await writeItem<OrderDocument>(OrderModel, mongoOrder as OrderDocument);
  if (!newItem) {
    return null;
  }
  return decodeOrder(newItem);
};

const decodeOrder = (order: MongoOrder): Order => {
  const date = order.transactionTime
    ? new Date(order.transactionTime).toISOString()
    : new Date().toISOString();
  return {
    id: order._id || "",
    paymentMethod: order.paymentMethod || "",
    items: order.items.map((item: MongoOrderItem) => ({
      id: item.id || "",
      name: item.name || "",
      image: item.image || undefined,
      color: item.color || "",
      size: item.size || "",
      price: item.price || 0,
      quantity: item.quantity || 1,
    })),
    status: order.status || OrderStatus.PENDING_PAYMENT,
    customerEmail: order.customerEmail || "",
    transactionId: order.transactionId || "",
    transactionTime: date || null,
  };
};

const encodeOrderItem = (item: OrderItem): OrderItem => ({
  id: item.id,
  image: item.image ? item.image : "",
  quantity: item.quantity,
  size: item.size,
  price: item.price,
  name: item.name,
  color: item.color,
});

const encodeOrder = (order: Order): MongoOrder => ({
  transactionId: order.transactionId || "",
  _id: order.id,
  paymentMethod: order.paymentMethod || "",
  items: order.items.map(encodeOrderItem),
  status: order.status || OrderStatus.PENDING_PAYMENT,
  customerEmail: order.customerEmail || "",
  transactionTime: order.transactionTime 
    ? new Date(order.transactionTime).toISOString()
    : new Date().toISOString(),
});


/*
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
*/