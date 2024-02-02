import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import SeasonRouter from "./routes/seasons";
import QuestionaireRouter from "./routes/questionaire";
import SubmissionRouter from "./routes/submission";
import UserRouter from "./routes/user";
import connectDB from "./config/db";
import { CronJob } from "cron";
import { rankingCalculation } from "./tasks/rankingCalculation";
dotenv.config({ path: "../.env"});

// Database
connectDB();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(function(req, res, next) {
    // TODO: change when deploying to production
    res.header("Access-Control-Allow-Origin", "*"); // TODO: configure properly before deployment
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });
// Routes
app.get("/ping", (req: Request, res: Response) => {
    res.status(200).json({ message: "pong" });
});
app.use("/api/seasons", SeasonRouter);
app.use('/api/question', QuestionaireRouter);
app.use('/api/submission', SubmissionRouter);
app.use('/api/user', UserRouter);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}

if (process.env.NODE_ENV !== 'test' && process.env.DO_RANKING_CALCULATION){
    const job = new CronJob(
        '*/15 * * * * *',
        (async () => await rankingCalculation()),
        null,
        true,
        null
    )
}

export default app;