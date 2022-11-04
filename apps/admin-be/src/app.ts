import express, { Request, Response } from "express";
import { AuthRouter } from "./routes/authRouter";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.sendStatus(201);
});
// Configure routes
app.use("/auth", AuthRouter);

export { app as default };
