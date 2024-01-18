import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import LeaderboardRouter from "./routes/leaderboard";
import QuestionaireRouter from "./routes/questionaire";
dotenv.config({ path: "../.env"});

// Database
const connectDB = require('./config/db');
connectDB();


const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Express + TypeScript Server");
});

app.get("/ping", (req: Request, res: Response) => {
    res.status(200).send("pong");
});

app.use("/leaderboard", LeaderboardRouter);
app.use('/api/question', QuestionaireRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;