import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { nodeloggerMiddleware, Logger } from "nodelogger";

// import routers
import indexRouter from "./routes/index";
import ordersRouter from "./routes/orders";
import productsRouter from "./routes/products";

const app = express();

// middleware
app.use(nodeloggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", indexRouter);
app.use("/orders", ordersRouter);
app.use("/products", productsRouter);

app.listen("3000", () => Logger.info("server started on port 3000"));

export default app;
