import { Router } from "express";
import { Cart } from "types";
import { calcCartValue, generateOrderItemsFromCart } from "./checkout";

const router = Router();

type QuotationBody = Cart

router.post("/", (req, res) => {
    const body = req.body as QuotationBody;
    const itemsProductsPromise = generateOrderItemsFromCart(body);
    itemsProductsPromise.then(itemsProducts => {
        const price = calcCartValue(itemsProducts);
        res.json({
            items: itemsProducts,
            price: price,
        })
    })
    .catch(err => {
        console.error('Error creating quotation:', err);
        res.status(500).json({ detail: 'Error unable to check out.' });
    });
})

