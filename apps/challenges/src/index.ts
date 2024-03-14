import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import SeasonRouter from "./routes/seasons";
import QuestionaireRouter from "./routes/questionaire";
import SubmissionRouter from "./routes/submission";
import UserRouter from "./routes/user";
import AuthRouter from "./routes/auth";
import { connectDB } from "./config/db";
import { CronJob } from "cron";
import { rankingCalculation } from "./tasks/rankingCalculation";
import { SupabaseService } from "./utils/supabase";
import cookieParser from "cookie-parser";
dotenv.config({ path: "../.env"});

// Database
connectDB();
SupabaseService.initClient();

const app: Express = express();
const port = process.env.PORT || 3000;
const cookieSecret = process.env.COOKIE_SECRET || "";
// Middleware
app.use(express.json());
app.use(function(req, res, next) {
    // TODO: change when deploying to production
    res.header("Access-Control-Allow-Origin", "*"); // TODO: configure properly before deployment
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });
app.use(cookieParser(cookieSecret));

// Routes
app.get("/ping", (req: Request, res: Response) => {
    res.status(200).json({ message: "pong" });
});
app.use("/api/seasons", SeasonRouter);
app.use('/api/question', QuestionaireRouter);
app.use('/api/submission', SubmissionRouter);
app.use('/api/user', UserRouter);
app.use('/api/auth', AuthRouter);

// the check is needed for testing
// refer to https://stackoverflow.com/a/63299022
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