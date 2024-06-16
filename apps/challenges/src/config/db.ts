import moongose from "mongoose";
import * as dotenv from "dotenv";
import { ConnectionOptions } from "tls";
import { Logger } from "nodelogger";
dotenv.config();

export const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URI || "mongodb://localhost:27017";
    await moongose.connect(mongoURL, {
      useNewUrlParser: true,
      dbName: process.env.CHALLENGES_MONGO_DATABSE_NAME || "challenges",
    } as ConnectionOptions);

    Logger.info(`[server]: MongoDB Connected: ${mongoURL}`);
  } catch (error) {
    let errorReason = "unknown error";
    if (error instanceof Error) {
      errorReason = error.message;
    }
    Logger.error(`[server]: MongoDB connected failed due to ${errorReason}`);
    process.exit(1);
  }
};

export const connectTestDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URI || "mongodb://localhost:27017";
    await moongose.connect(mongoURL, {
      useNewUrlParser: true,
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      dbName: process.env.MONGO_TEST_DATABSE_NAME || "test",
    } as ConnectionOptions);
    Logger.info(`MongoDB Connected: ${mongoURL}`);
  } catch (error) {
    Logger.error(error);
    process.exit(1);
  }
};
