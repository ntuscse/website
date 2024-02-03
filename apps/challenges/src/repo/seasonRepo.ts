import Season, { SeasonModel } from "../model/season";
import mongoose from 'mongoose';

import { UserRanking } from "../model/rankingScore";
import Submission from "../model/submission";
import { rankingsMap } from "../tasks/rankingCalculation";
import { paginateArray } from "../utils/pagination";

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
                user: {
                    userID: "$user._id",
                    name: "$user.name",
                },
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
    return { rankings: paginateArray(rankings, limit, page), rankingsCount: rankings.length };
}

const SeasonRepo = {
    getSeasonsByDate,
    getSeasonByID,
    createSeason,
    getSeasonRankings,
    getSeasonRankingsByPagination,
    calculateSeasonRankings
}

export { SeasonRepo as default }