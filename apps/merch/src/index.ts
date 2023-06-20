import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Response as ExResponse, Request as ExRequest } from "express";
import swaggerUi, { JsonObject } from "swagger-ui-express";
import { Logger, nodeloggerMiddleware } from "nodelogger";
import path from "path";
import { checkout } from "./routes/checkout";
import { index, notFound } from "./routes/index";
import { orderGet } from "./routes/orders";
import { productGet, productsAll } from "./routes/products";
import { RegisterRoutes } from "../dist/routes";
import { errorHandler } from "./lib/errorHandler";

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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML((await import("../dist/swagger.json")) as JsonObject)
  );
});

app.get("/", index);
app.get("/orders/:id", orderGet);
app.get("/products", productsAll);
app.get("/products/:id", productGet);
app.post("/checkout", checkout);

RegisterRoutes(app);

app.use(errorHandler);
app.use(notFound);

app.listen("3000", () => Logger.info("server started on port 3000"));

export default app;
