import express, { Request, Response } from "express";
import { AuthRouter } from "./routes/authRouter";

const app = express();

app.use(express.json());

// Example path
app.get("/", (req: Request, res: Response) => {
  res.json("GET /");
});

// Configure routes
app.use("/auth", AuthRouter);

export { app as default };
