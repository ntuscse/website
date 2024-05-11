import SeasonRepo from "../repo/seasonRepo"
import mongoose from 'mongoose';

const getSeasonsByDate = async(
    startDate: Date | null,
    endDate: Date | null
) => {
    const seasons = await SeasonRepo.getSeasonsByDate(startDate, endDate);
    return seasons;
}

const getActiveSeasons = async() => {
    const seasons = await SeasonRepo.getSeasonsByDate(new Date(), null);
    return seasons;
}

const getSeasonByID = async(id: string) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new Error('Invalid season ID');
    }
    const _id = new mongoose.Types.ObjectId(id);
    const season = await SeasonRepo.getSeasonByID(_id);
    return season;
}

const createSeason = async(
    title: string,
    startDate: Date,
    endDate: Date,
) => {
    const season = await SeasonRepo.createSeason(title, startDate, endDate);
    return season;
}

const getSeasonRankings = (
    seasonID: string,
) => {
    if (!mongoose.isValidObjectId(seasonID)) {
        throw new Error('Invalid season ID');
    }
    const _id = new mongoose.Types.ObjectId(seasonID);
    const rankings = SeasonRepo.getSeasonRankings(_id);
    return rankings;
}

const getSeasonRankingsByPagination = (
    seasonID: string,
    page: number,
    limit: number,
) => {
    if (!mongoose.isValidObjectId(seasonID)) {
        throw new Error('Invalid season ID');
    }
    const _id = new mongoose.Types.ObjectId(seasonID);
    return SeasonRepo.getSeasonRankingsByPagination(_id, page, limit);
}

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

const calculateSeasonRankings = async(
    seasonID: string
) => {
    if (!mongoose.isValidObjectId(seasonID)) {
        throw new Error('Invalid user ID');
    }
    const _seasonID = new mongoose.Types.ObjectId(seasonID);
    return await SeasonRepo.calculateSeasonRankings(_seasonID);
}

const getSeasonQuestions = async(
    seasonID: string
) => {
    if (!mongoose.isValidObjectId(seasonID)) {
        throw new Error('Invalid season ID');
    }
    const _seasonID = new mongoose.Types.ObjectId(seasonID);
    return await SeasonRepo.getSeasonQuestions(_seasonID);
}

const SeasonService = {
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
}

export { SeasonService as default }