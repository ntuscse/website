import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { nodeloggerMiddleware, Logger } from "nodelogger";

// import routers
import indexRouter from "./routes/index";
import ordersRouter from "./routes/orders";
import productsRouter from "./routes/products";

const app = express();
const CORS_ORIGIN = process.env.CORS_ORIGIN;
let corsMiddleware = cors();
if (CORS_ORIGIN) {
  corsMiddleware = cors({ origin: CORS_ORIGIN });
} else {
  Logger.warn("========================================");
  Logger.warn(" CORS_ORIGIN was not set for merch app. ");
  Logger.warn("Defaulting to allowing all CORS request!");
  Logger.warn("========================================");
}

// middleware
app.use(nodeloggerMiddleware);
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", indexRouter);
app.use("/orders", ordersRouter);
app.use("/products", productsRouter);

app.listen("3000", () => Logger.info("server started on port 3000"));

export default app;
