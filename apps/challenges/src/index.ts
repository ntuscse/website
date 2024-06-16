import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cron from "node-cron";
import SeasonRouter from "./routes/seasons";
import QuestionaireRouter from "./routes/questionaire";
import SubmissionRouter from "./routes/submission";
import UserRouter from "./routes/user";
import AuthRouter from "./routes/auth";
import { connectDB } from "./config/db";

import { rankingCalculation } from "./tasks/rankingCalculation";
import { SupabaseService } from "./utils/supabase";
import { Logger, nodeloggerMiddleware } from "nodelogger";
import { ExpressErrorHandler } from "./middleware/errorHandler";
import { getCronjobConfig } from "./tasks/init";
dotenv.config({ path: "../.env" });

// Database
void connectDB();
SupabaseService.initClient();

const app: Express = express();
// eslint-disable-next-line turbo/no-undeclared-env-vars
const port = process.env.PORT || 3000;
// Middleware
app.use(nodeloggerMiddleware);
app.use(express.json());
app.use(function (req, res, next) {
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
app.use("/api/question", QuestionaireRouter);
app.use("/api/submission", SubmissionRouter);
app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);
app.use(ExpressErrorHandler);

// the check is needed for testing
// refer to https://stackoverflow.com/a/63299022
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    Logger.info(`[server]: Server is running at http://localhost:${port}`);
  });
}

// Run rankingCalculation cronjob
// this check is added to prevent cronjob from running when supertest is running
if (process.env.NODE_ENV !== "test") {
  const result = getCronjobConfig(
    process.env.RANKING_CALCULATON_INTERVAL_SECONDS,
    60
  );
  Logger.info(
    `[server]: Server setting ranking calculation interval to ${result.intervalInSeconds} second(s), cronScheduleString: ${result.cronString}`
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  cron.schedule(
    result.cronString,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async () => {
      Logger.info("Calculating rankings...");
      await rankingCalculation();
    }
  );
}

export default app;
