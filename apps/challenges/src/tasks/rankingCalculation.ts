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
    Logger.error(
      `rankingCalculation cronjob: calculateSeasonRankings then UpsertRankingsBySeasonID error:`,
      err,
      err instanceof Error ? (err).stack : undefined
    );
    return;
  }

  try {
    await SubmissionService.SetSubmissionsToCalculated(submissionModels);
  } catch (err) {
    Logger.error(
      `rankingCalculation cronjob: SetSubmissionsToCalculated error:`,
      err,
      err instanceof Error ? err.stack : undefined
    );
    return;
  }

  Logger.info(
    `rankingCalculation cronjob: finish cronjob, exiting gracefully!`
  );
};
