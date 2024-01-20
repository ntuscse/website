import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import SeasonRouter from "./routes/seasons";
import QuestionaireRouter from "./routes/questionaire";
import UserRouter from "./routes/user";
import connectDB from "./config/db";
dotenv.config({ path: "../.env"});

// Database
connectDB();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/ping", (req: Request, res: Response) => {
    res.status(200).json({ message: "pong" });
});
app.use("/api/seasons", SeasonRouter);
app.use('/api/question', QuestionaireRouter);
app.use('/api/user', UserRouter);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}

export default app;