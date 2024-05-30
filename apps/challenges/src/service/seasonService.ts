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

  return await getSeasonsByDate(_startDate, _endDate);
};

const getSeasonsByDate = async (
  startDate: Date | null,
  endDate: Date | null
) => {
  const seasons = await SeasonRepo.getSeasonsByDate(startDate, endDate);
  return seasons;
};

const getActiveSeasons = async () => {
  const seasons = await SeasonRepo.getSeasonsByDate(new Date(), null);
  return seasons;
};

const getSeasonByID = async (id: string) => {
  const _id = zodGetValidObjectId.parse(id);
  const season = await SeasonRepo.getSeasonByID(_id);
  return season;
};

const createSeason = async (title: string, startDate: Date, endDate: Date) => {
  const season = await SeasonRepo.createSeason(title, startDate, endDate);
  return season;
};

const getSeasonRankings = (seasonID: string) => {
  if (!mongoose.isValidObjectId(seasonID)) {
    throw new Error("Invalid season ID");
  }
  const _id = new mongoose.Types.ObjectId(seasonID);
  const rankings = SeasonRepo.getSeasonRankings(_id);
  return rankings;
};

const getSeasonRankingsByPagination = (
  seasonID: string,
  page: number,
  limit: number
) => {
  if (!mongoose.isValidObjectId(seasonID)) {
    throw new Error("Invalid season ID");
  }
  const _id = new mongoose.Types.ObjectId(seasonID);
  return SeasonRepo.getSeasonRankingsByPagination(_id, page, limit);
};

/*
const getUserSeasonRanking = async(
    seasonID: string,
    userID: string
) => {
    if (!mongoose.isValidObjectId(seasonID) || !mongoose.isValidObjectId(userID)) {
        throw new Error('Invalid season ID');
    }
    const _seasonID = new mongoose.Types.ObjectId(seasonID);
    const _userID = new mongoose.Types.ObjectId(userID);
    const ranking = await SeasonRepo.getUserSeasonRanking(_seasonID, _userID);
    return ranking;
}

const getUserAllSeasonRankings = async(
    userID: string
) => {
    if (!mongoose.isValidObjectId(userID)) {
        throw new Error('Invalid user ID');
    }
    const _userID = new mongoose.Types.ObjectId(userID);
    const rankings = await SeasonRepo.getUserAllSeasonRankings(_userID);
    return rankings;
}
*/

const calculateSeasonRankings = async (seasonID: string) => {
  if (!mongoose.isValidObjectId(seasonID)) {
    throw new Error("Invalid user ID");
  }
  const _seasonID = new mongoose.Types.ObjectId(seasonID);
  return await SeasonRepo.calculateSeasonRankings(_seasonID);
};

const getSeasonQuestions = async (seasonID: string) => {
  if (!mongoose.isValidObjectId(seasonID)) {
    throw new Error("Invalid season ID");
  }
  const _seasonID = new mongoose.Types.ObjectId(seasonID);
  return await SeasonRepo.getSeasonQuestions(_seasonID);
};

const SeasonService = {
  GetSeasons,
  getSeasonsByDate,
  getActiveSeasons,
  getSeasonByID,
  createSeason,
  getSeasonRankings,
  getSeasonRankingsByPagination,
  // getUserSeasonRanking,
  // getUserAllSeasonRankings,
  calculateSeasonRankings,
  getSeasonQuestions,
};

export { SeasonService as default };
