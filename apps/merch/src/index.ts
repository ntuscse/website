import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { nodeloggerMiddleware, Logger } from "nodelogger";

// import routers
import indexRouter from "./routes/index";
import productsRouter from "./routes/products";
// import usersRouter from './routes/users'

const app = express();

// middleware
app.use(nodeloggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/products", productsRouter);
// app.use('/users', usersRouter);

app.listen("3000", () => Logger.info("server started on port 3000"));

export default app;
