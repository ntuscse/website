import mongoose, { Schema, Document } from "mongoose";
import { MongoOrderItem } from "../db";

export type OrderItemDocument = MongoOrderItem & Document;

export const OrderItemSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: false },
  color: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const OrderItemModel = mongoose.model<OrderItemDocument>("OrderItem", OrderItemSchema);