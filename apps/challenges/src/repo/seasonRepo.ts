import Season, { SeasonModel } from "../model/season";
import mongoose from "mongoose";

import Submission from "../model/submission";
import Question, { QuestionModel } from "../model/question";
import { RankingModel } from "../model/ranking";

const getSeasonsByDate = async (
  startDate: Date | null,
  endDate: Date | null
): Promise<SeasonModel[] | null> => {
  const seasons = await Season.find({
    $and: [
      startDate != null ? { endDate: { $gte: startDate } } : {},
      endDate != null ? { startDate: { $lte: endDate } } : {},
    ],
  });
  return seasons;
};

const getSeasonByID = async (
  id: mongoose.Types.ObjectId
): Promise<SeasonModel | null> => {
  const season = await Season.findOne({
    _id: id,
  });
  return season;
};

const createSeason = async (
  title: string,
  startDate: Date,
  endDate: Date
): Promise<SeasonModel | null> => {
  const season = await Season.create({
    title,
    startDate: startDate,
    endDate: endDate,
  });
  await season.save();
  return season;
};

/*
const chatgptCalculateSeasonRankings = async (
    seasonID: mongoose.Types.ObjectId,
) => {
    const submissions = await Submission.find({
        seasonID: seasonID
    });
    const rankings = submissions.reduce((acc, submission) => {
        const user = submission.user;
        if (!acc[user.toString()]) {
            acc[user.toString()] = {
                points: 0,
                user: user.toString()
            }
        }
        acc[user.toString()].points += submission.points_awarded;
        return acc;
    }, {} as { [key: string]: UserRanking });
    const rankingsArray = Object.values(rankings);
    rankingsArray.sort((a, b) => b.points - a.points);
    rankingsMap[seasonID.toString()] = rankingsArray;
    return rankingsArray;
}
*/

const calculateSeasonRankings = async (
  seasonID: mongoose.Types.ObjectId
): Promise<Omit<RankingModel, "_id">[]> => {
  const rankings: Omit<
    RankingModel,
    "_id" | "ranking" | "createdAt" | "updatedAt" | "seasonID"
  >[] = await Submission.aggregate([
    {
      $match: {
        seasonID: seasonID,
      },
    },
    {
      $group: {
        _id: {
          user: "$user",
          question: "$question",
        },
        points_awarded: { $max: "$points_awarded" },
      },
    },
    { $match: { points_awarded: { $exists: true, $ne: null } } },
    {
      $group: {
        _id: {
          user: "$_id.user",
        },
        points: { $sum: "$points_awarded" },
      },
    },
    {
      $sort: {
        points: -1,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id.user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        _id: 0,
        userID: "$user._id",
        name: "$user.name",
        points: 1,
      },
    },
  ]);
  let ranking = 0;
  const rankingDate = new Date();
  return rankings.map((r) => {
    ranking += 1;
    return {
      ...r,
      ranking: ranking,
      seasonID: seasonID,
      createdAt: rankingDate,
      updatedAt: rankingDate,
    };
  });
};

const getSeasonQuestions = async (
  seasonID: mongoose.Types.ObjectId
): Promise<QuestionModel[] | null> => {
  const questions = await Question.aggregate([
    {
      $match: {
        seasonID: seasonID,
      },
    },
  ]);
  return questions as QuestionModel[];
};

const SeasonRepo = {
  getSeasonsByDate,
  getSeasonByID,
  createSeason,
  calculateSeasonRankings,
  getSeasonQuestions,
};

export { SeasonRepo as default };
