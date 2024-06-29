import Season, { SeasonModel } from "../model/season";
import mongoose from "mongoose";

import Submission from "../model/submission";
import Question, { QuestionModel } from "../model/question";
import { RankingModel } from "../model/ranking";

const GetSeasonsByDate = async (
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

const GetSeasonByID = async (
  id: mongoose.Types.ObjectId
): Promise<SeasonModel | null> => {
  const season = await Season.findOne({
    _id: id,
  });
  return season;
};

const CreateSeason = async (
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

const CalculateSeasonRankings = async (
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

const GetSeasonQuestions = async (
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
  GetSeasonsByDate,
  GetSeasonByID,
  CreateSeason,
  CalculateSeasonRankings,
  GetSeasonQuestions,
};

export { SeasonRepo as default };
