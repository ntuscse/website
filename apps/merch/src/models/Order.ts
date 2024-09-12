import mongoose, { Schema, Document } from "mongoose";
import { OrderStatus } from "types";
import { OrderItemSchema } from "./OrderItem";
import { MongoOrder } from "../db";

export type OrderDocument = MongoOrder & Document;

const OrderSchema: Schema = new Schema<OrderDocument>({
  _id: { type: String }, 
  items: [ OrderItemSchema ],
  transactionId: { type: String, default: "" },
  transactionTime: { type: String, default: null },
  paymentMethod: { type: String, default: "" },
  customerEmail: { type: String, default: "" },
  status: { 
    type: Number, 
    enum: Object.values(OrderStatus).filter(value => typeof value === 'number'),  // Only use numeric values
    default: OrderStatus.PENDING_PAYMENT 
  },
});

export const OrderModel = mongoose.model<OrderDocument>("Order", OrderSchema);
