import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import LeaderboardRouter from "./routes/leaderboard";
import QuestionaireRouter from "./routes/questionaire";
import SubmissionRouter from "./routes/submission";
dotenv.config({ path: "../.env"});

// Database
const connectDB = require('./config/db');
connectDB();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/leaderboard", LeaderboardRouter);
app.use('/api/question', QuestionaireRouter);
app.use('/api/submission', SubmissionRouter);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}

export default app;