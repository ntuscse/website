import mongoose, { ClientSession } from "mongoose";
import Ranking, { RankingModel } from "../model/ranking";
import { GetRankingFilter } from "../types/types";

const GetRankingBySeasonID = async (
  seasonID: mongoose.Types.ObjectId,
  filter?: GetRankingFilter
): Promise<RankingModel[]> => {
  let query = Ranking.find({ seasonID: seasonID });
  if (filter?.order) {
    query = query.sort({ points: filter.order });
  }
  if (filter?.limit) {
    query = query.limit(filter.limit);
  }
  if (filter?.offset) {
    query = query.skip(filter.offset);
  }
  if (filter?.transaction) {
    query = query.session(filter?.transaction);
  }

  return await query.exec();
};

const GetTotalCountOfRanking = async (
  seasonID: mongoose.Types.ObjectId,
  session?: ClientSession
): Promise<number> => {
  let query = Ranking.countDocuments();
  if (session) {
    query = query.session(session);
  }
  return await query.exec();
};

const UpsertRankingsBySeasonID = async (
  ranking: Omit<RankingModel, "_id">[]
): Promise<void> => {
  if (ranking.length == 0) {
    return;
  }
  const result = await Ranking.bulkWrite(
    ranking.map((r) => {
      return {
        updateOne: {
          filter: { seasonID: r.seasonID, userID: r.userID },
          update: r,
          upsert: true,
        },
      };
    })
  );
  const errors = result.getWriteErrors();
  if (errors.length != 0) {
    throw new Error(JSON.stringify(errors));
  }
};

const RankingRepo = {
  GetRankingBySeasonID,
  UpsertRankingsBySeasonID,
  GetTotalCountOfRanking,
};

export default RankingRepo;
