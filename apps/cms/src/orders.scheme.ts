import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    colour: String,
    date: Date,
    image_url: String,
    item: String,
    order_id: String,
    order_person: String,
    qty: Number,
    size: String,
});

export default mongoose.model("Order", orderSchema);
