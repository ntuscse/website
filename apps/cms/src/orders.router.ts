import express from "express";
const orderRouter = express.Router();
import Order from "./orders.scheme";

// return all orders
orderRouter.get("/", async (request, response) => {
    const orders = await Order.find({})
    response.json(orders)

});

//get a specific order based on order_id
orderRouter.get("/:id", async (request, response) => {
    const id = request.params.id;
    const order = await Order.find({ order_id: id })
    if (!order) {
        response.status(404).send('No document found with that order_id');
    } else {
        response.status(200).json(order)
    }
})

// save the order to database and return the added order in json
orderRouter.post("/", async (request, response) => {
    const order = new Order(request.body);
    const requiredProps = ["color", "date", "image_url", "item", "order_id", "order_person", "qty", "size"];
    const missingRequiredProps = [];
    for (const prop of requiredProps) {
        if (!request.body.hasOwnProperty(prop)) {
            missingRequiredProps.push(prop);
        }
    }

    if (missingRequiredProps.length > 0) {
        return response.status(400).json({
            error: "Missing required properties: " + missingRequiredProps.join(", "),
        });
    }

    const savedOrder = await order.save();
    response.status(201).json(savedOrder);

});


// modify the order
orderRouter.put("/:id", async (request, response) => {
    const id = request.params.id;
    const updatedOrder = await Order.findOneAndUpdate({ order_id: id }, request.body, { new: true })
    response.status(200).json(updatedOrder);
})

// delete the order
orderRouter.delete("/:id", async (request, response) => {
    const id = request.params.id;
    await Order.deleteOne({ order_id: id })
    response.status(204).end();
})

export default orderRouter;
