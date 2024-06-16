import { Logger } from "nodelogger";
import SeasonService from "../service/seasonService";
import SubmissionService from "../service/submissionService";
import RankingService from "../service/rankingService";

export const rankingCalculation = async () => {
  const submissionModels =
    await SubmissionService.GetToBeCalculatedSubmissions();
  const activeSeasonIDs: string[] = [];
  for (const submission of submissionModels) {
    activeSeasonIDs.push(submission.seasonID.toString());
  }
  Logger.info(
    `rankingCalculation cronjob: calculate these season rankings: ${JSON.stringify(
      activeSeasonIDs
    )}`
  );

  try {
    for (const seasonID of activeSeasonIDs) {
      const ranking = await SeasonService.calculateSeasonRankings(seasonID);
      await RankingService.UpsertRankingsBySeasonID(ranking);
    }
  } catch (err) {
    let errorReason = "unknown error";
    if (err instanceof Error) {
      errorReason = err.message;
    }
    Logger.error(
      `rankingCalculation cronjob: calculateSeasonRankings then UpsertRankingsBySeasonID error: ${errorReason}`
    );
  }

  try {
      await SubmissionService.SetSubmissionsToCalculated(submissionModels);
  } catch (err) {
    let errorReason = "unknown error";
    if (err instanceof Error) {
      errorReason = err.message;
    }
    Logger.error(
      `rankingCalculation cronjob: SetSubmissionsToCalculated error: ${errorReason}`
    );
  }

  Logger.info(
    `rankingCalculation cronjob: finish cronjob, exiting gracefully!`
  );
};
