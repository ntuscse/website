import { RankingModel, UserRanking } from "../model/ranking";
import RankingRepo from "../repo/rankingRepo";
import { GetRankingFilter, StatusCodeError } from "../types/types";
import mongoose from "mongoose";
import SeasonService from "./seasonService";
import { PaginateData, generatePaginationMetaData } from "../utils/pagination";

const UpsertRankingsBySeasonID = async (
  ranking: Omit<RankingModel, "_id">[]
): Promise<void> => {
  await RankingRepo.UpsertRankingsBySeasonID(ranking);
};

const GetRankingBySeasonID = async (
  seasonID: string,
  page?: number,
  limit?: number,
  order?: "asc" | "desc"
): Promise<{
  seasonID: string;
  rankings: UserRanking[];
  _metaData?: PaginateData;
}> => {
  const season = await SeasonService.getSeasonByID(seasonID);
  if (!season) {
    throw new StatusCodeError(404, "Season not found");
  }

  let rankingModel: RankingModel[];
  let _metaData: PaginateData | undefined = undefined;

  if (page !== undefined && limit !== undefined) {
    if (!order) {
      order = "desc";
    }
    const result = await InternalGetRankingWithPagination(season._id, {
      limit: limit,
      offset: page * limit,
      order: order,
    });
    rankingModel = result.rankingModel;
    _metaData = generatePaginationMetaData(
      `/api/seasons/${seasonID}/rankings`,
      page,
      limit,
      result.totalCount
    );
  } else {
    rankingModel = await InternalGetRanking(season._id, {
      limit: limit,
      offset: page && limit ? page * limit : undefined,
      order: order,
    });
  }

  return {
    seasonID: seasonID,
    rankings: rankingModel.map((r) => {
      return {
        user: {
          userID: r.userID.toString(),
          name: r.name,
        },
        points: r.points,
      };
    }),
    _metaData: _metaData,
  };
};

const InternalGetRanking = async (
  seasonID: mongoose.Types.ObjectId,
  filter?: GetRankingFilter
) => {
  return await RankingRepo.GetRankingBySeasonID(seasonID, filter);
};

const InternalGetRankingWithPagination = async (
  seasonID: mongoose.Types.ObjectId,
  filter: GetRankingFilter & { limit: number; offset: number }
) => {
  const session = await mongoose.startSession();
  filter.transaction = session;

  try {
    session.startTransaction();
    const rankingModel = await RankingRepo.GetRankingBySeasonID(
      seasonID,
      filter
    );
    const totalCount = await RankingRepo.GetTotalCountOfRanking(
      seasonID,
      session
    );
    return {
      rankingModel: rankingModel,
      totalCount: totalCount,
    };
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    await session.endSession();
  }
};

const RankingService = {
  UpsertRankingsBySeasonID,
  GetRankingBySeasonID,
};

export default RankingService;
