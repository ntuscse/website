import express from "express";
const orderRouter = express.Router();
import Order from "./orders.scheme";

// return all orders
orderRouter.get("/", (request, response) => {
    Order.find({}).then((orders) => {
        response.json(orders);
    });
});

// save the order to database and return the added order in json
orderRouter.post("/", (request, response) => {
    const order = new Order(request.body);

    order.save().then((result) => {
        response.status(201).json(result);
    });
});

// modify the order

// delete the order

export default orderRouter;
