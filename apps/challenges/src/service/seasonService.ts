import SeasonRepo from "../repo/seasonRepo";
import mongoose from "mongoose";
import { StatusCodeError } from "../types/types";
import { zodGetValidObjectId } from "../utils/validator";

const GetSeasons = async (start: unknown, end: unknown) => {
  if (start != null && typeof start !== "string") {
    throw new StatusCodeError(400, "invalid start date");
  }
  if (end != null && typeof end !== "string") {
    throw new StatusCodeError(400, "invalid end date");
  }

  const _startDate = start != null ? new Date(parseInt(start)) : null;
  const _endDate = end != null ? new Date(parseInt(end)) : null;

  return await GetSeasonsByDate(_startDate, _endDate);
};

const GetSeasonsByDate = async (
  startDate: Date | null,
  endDate: Date | null
) => {
  const seasons = await SeasonRepo.GetSeasonsByDate(startDate, endDate);
  return seasons;
};

const GetActiveSeasons = async () => {
  const seasons = await SeasonRepo.GetSeasonsByDate(new Date(), null);
  return seasons;
};

const GetSeasonByID = async (id: string) => {
  const _id = zodGetValidObjectId("Invalid season id").parse(id);
  const season = await SeasonRepo.GetSeasonByID(_id);
  return season;
};

const CreateSeason = async (title: string, startDate: Date, endDate: Date) => {
  const season = await SeasonRepo.CreateSeason(title, startDate, endDate);
  return season;
};

const CalculateSeasonRankings = async (seasonID: string) => {
  if (!mongoose.isValidObjectId(seasonID)) {
    throw new Error("Invalid user ID");
  }
  const _seasonID = new mongoose.Types.ObjectId(seasonID);
  return await SeasonRepo.CalculateSeasonRankings(_seasonID);
};

const GetSeasonQuestions = async (seasonID: string) => {
  if (!mongoose.isValidObjectId(seasonID)) {
    throw new Error("Invalid season ID");
  }
  const season = await SeasonService.GetSeasonByID(seasonID);
  if (!season) {
    throw new StatusCodeError(404, "Season not found");
  }

  const _seasonID = new mongoose.Types.ObjectId(seasonID);
  return await SeasonRepo.GetSeasonQuestions(_seasonID);
};

const SeasonService = {
  GetSeasons,
  GetSeasonsByDate,
  GetActiveSeasons,
  GetSeasonByID,
  CreateSeason,
  CalculateSeasonRankings,
  GetSeasonQuestions,
};

export { SeasonService as default };
