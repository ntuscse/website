import { z } from "zod";
import { dayInSeconds } from "../model/constants";
import { Logger } from "nodelogger";

// getCronjobConfig received env values and fallback seconds to calculate the cronjob seconds. 
// Both envValue and fallback seconds provided must be less than a day.
export const getCronjobConfig = (
  envValue: string | undefined,
  fallbackSeconds: number
): { intervalInSeconds: number; cronString: string } => {
  const parseResult = z.coerce
    .number()
    .int()
    .positive()
    .safe()
    .lte(dayInSeconds) // getCronjobConfig currently only support until a day
    .safeParse(envValue);
  try {
    if (parseResult.success) {
      const intervalInSeconds = parseResult.data;
      const cronString = secondsToCron(intervalInSeconds);
      return { intervalInSeconds, cronString };
    }
  } catch (err) {
    let errMsg = "unknown error";
    if (err instanceof Error) {
      errMsg = err.message;
    }
    Logger.error(
      `[server]: getCronjobConfig error due to ${errMsg}, attempt to defaulting to ${fallbackSeconds} seconds`
    );
  }

  try {
    const cronString = secondsToCron(fallbackSeconds);
    return { intervalInSeconds: fallbackSeconds, cronString };
  } catch (err) {
    let errMsg = "unknown error";
    if (err instanceof Error) {
      errMsg = err.message;
    }
    const toBeReturnedErrMsg = `[server]: getCronjobConfig defaulting to fallback seconds error due to ${errMsg}, throw error`;
    Logger.error(toBeReturnedErrMsg);
    throw new Error(toBeReturnedErrMsg);
  }
};

const secondsToCron = (seconds: number) => {
  if (seconds < 60) {
    return `*/${seconds} * * * * *`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${remainingSeconds} */${minutes} * * * *`;
  } else if (seconds <= 86400) {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const remainingSecs = remainingSeconds % 60;
    return `${remainingSecs} ${minutes} */${hours} * * *`;
  } else {
    // Handle intervals larger than a day (not standard in most cron implementations)
    throw new Error(
      "Intervals larger than a day are not supported in standard cron expressions."
    );
  }
};
