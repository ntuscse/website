import Season, { SeasonModel } from "../model/season";
import mongoose from 'mongoose';
import Ranking, { RankingModel, UserRanking } from "../model/rankingScore";
import Submission from "../model/submission";
import { rankingsMap } from "../tasks/rankingCalculation";
import { array } from "zod";

const getSeasonsByDate = async(
    startDate: Date | null,
    endDate: Date | null,
): Promise<SeasonModel[] | null> => {
    console.log(startDate, endDate)
    const seasons = await Season.find({
        $and: [
            startDate != null ? { endDate: { $gte: startDate } } : {},
            endDate != null ? { startDate: { $lte: endDate } } : {}
        ]
    });
    return seasons;
}

const getSeasonByID = async (id: mongoose.Types.ObjectId): Promise<SeasonModel | null> => {
    const season = await Season.findOne({
        _id: id
    });
    return season;
}

const createSeason = async (
    title: string,
    startDate: Date,
    endDate: Date,
): Promise<SeasonModel | null> => {
    const season = await Season.create({
        title,
        startDate: startDate,
        endDate: endDate
    });
    await season.save();
    return season;
}

const calculateSeasonRankings = async(
    seasonID: mongoose.Types.ObjectId,
) => {
    const rankings = await Submission.aggregate([
        {
            $match: {
                seasonID: seasonID
            }
        },
        {
            $group: {
                _id: "$user",
                points: { $sum: "$points_awarded" }
            }
        },
        {
            $sort: {
                points: -1
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: "$user"
        },
        {
            $project: {
                _id: 0,
                userID: "$user._id",
                name: "$user.name",
                points: 1
            }
        }
    ]);
    return rankings;
}

const getSeasonRankings = async (
    seasonID: mongoose.Types.ObjectId,
): Promise<UserRanking[] | null> => {
    return rankingsMap[seasonID.toString()];
}


const getSeasonRankingsByPagination = async (
    seasonID: mongoose.Types.ObjectId,
    page: number,
    limit: number,
): Promise<{ rankings: UserRanking[], rankingsCount: number}> => {
    const rankings = rankingsMap[seasonID.toString()];
    if(!rankings){
        return { rankings: [] , rankingsCount: 0 };
    }
    return { rankings: paginate(rankings, limit, page), rankingsCount: rankings.length };
}

const paginate = (array: any[], page_size: number, page_number: number) => {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

const getUserSeasonRanking = async (
    seasonID: mongoose.Types.ObjectId,
    userID: mongoose.Types.ObjectId
): Promise<RankingModel | null> => {
    const ranking = await Ranking.findOne({
        seasonID: seasonID,
        userID: userID
    });
    return ranking;
}

const getUserAllSeasonRankings = async (
    userID: mongoose.Types.ObjectId
): Promise<RankingModel[] | null> => {
    const rankings = await Ranking.find({
        userID: userID
    });
    return rankings;
}

const updateSeasonRankings = async (
    seasonID: mongoose.Types.ObjectId,
    userID: mongoose.Types.ObjectId,
    points: number
): Promise<RankingModel | null> => {
    const ranking = await Ranking.findOneAndUpdate({
        seasonID: seasonID,
        userID: userID
    }, {
        points: points
    }, {
        new: true,
        upsert: true
    });
    return ranking;
}


const SeasonRepo = {
    getSeasonsByDate,
    getSeasonByID,
    createSeason,
    getSeasonRankings,
    getSeasonRankingsByPagination,
    getUserSeasonRanking,
    getUserAllSeasonRankings,
    updateSeasonRankings,
    calculateSeasonRankings
}

export { SeasonRepo as default }