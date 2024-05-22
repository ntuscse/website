import { SeasonModel } from "../model/season";
import mongoose from "mongoose";
import SeasonService from "../service/seasonService";
import {
  clearRankingsMap,
  rankingCalculation,
  rankingsMap,
} from "../tasks/rankingCalculation";

describe("rankingCalculation", () => {
  const mockGetActiveSeasons = jest.spyOn(SeasonService, "getActiveSeasons");
  const mockCalculateSeasonRankings = jest.spyOn(
    SeasonService,
    "calculateSeasonRankings"
  );

  beforeEach(() => {
    jest.resetAllMocks();
    clearRankingsMap();
  });

  it("should return if getActiveSeasons throw error", async () => {
    mockGetActiveSeasons.mockRejectedValue(new Error("Error"));
    await rankingCalculation();
    expect(mockCalculateSeasonRankings).not.toHaveBeenCalled();
    expect(rankingsMap).toEqual({});
  });

  it("should return if calculateSeasonRankings throw error", async () => {
    const seasonID = new mongoose.Types.ObjectId();
    mockGetActiveSeasons.mockResolvedValue([
      {
        _id: seasonID,
        title: "Season 1",
      } as SeasonModel,
    ]);
    mockCalculateSeasonRankings.mockRejectedValue(new Error("Error"));
    await rankingCalculation();
    expect(mockCalculateSeasonRankings).toHaveBeenCalled();
    expect(rankingsMap).toEqual({});
    expect(rankingsMap[seasonID.toString()]).toBeUndefined();
  });

  it("should return if activeSeasons is empty", async () => {
    mockGetActiveSeasons.mockResolvedValue([]);
    await rankingCalculation();
    expect(mockCalculateSeasonRankings).not.toHaveBeenCalled();
  });

  it("should return if activeSeasons is null", async () => {
    mockGetActiveSeasons.mockResolvedValue(null);
    await rankingCalculation();
    expect(mockCalculateSeasonRankings).not.toHaveBeenCalled();
  });

  it("should return if rankings is null", async () => {
    const seasonID = new mongoose.Types.ObjectId();
    mockGetActiveSeasons.mockResolvedValue([
      {
        _id: seasonID,
        title: "Season 1",
      } as SeasonModel,
    ]);
    mockCalculateSeasonRankings.mockResolvedValue([]);
    await rankingCalculation();
    expect(mockCalculateSeasonRankings).toHaveBeenCalled();
    expect(rankingsMap).toEqual({});
    expect(rankingsMap[seasonID.toString()]).toBeUndefined();
  });

  it("should return if rankings is not null", async () => {
    const seasonID = new mongoose.Types.ObjectId();
    const userID = new mongoose.Types.ObjectId().toString();
    mockGetActiveSeasons.mockResolvedValue([
      {
        _id: seasonID,
        title: "Season 1",
      } as SeasonModel,
    ]);
    mockCalculateSeasonRankings.mockResolvedValue([
      {
        points: 10,
        user: {
          userID: userID,
          name: "Hello",
        },
      },
    ]);
    await rankingCalculation();
    expect(mockCalculateSeasonRankings).toHaveBeenCalled();
    expect(rankingsMap[seasonID.toString()]).toEqual([
      {
        points: 10,
        user: {
          userID: userID,
          name: "Hello",
        },
      },
    ]);
  });

  it("should return if rankings is not null and there is multiple users", async () => {
    const seasonID = new mongoose.Types.ObjectId();
    const userID = new mongoose.Types.ObjectId().toString();
    const userID2 = new mongoose.Types.ObjectId().toString();
    mockGetActiveSeasons.mockResolvedValue([
      {
        _id: seasonID,
        title: "Season 1",
      } as SeasonModel,
    ]);
    mockCalculateSeasonRankings.mockResolvedValue([
      {
        points: 10,
        user: {
          userID: userID,
          name: "Hello",
        },
      },
      {
        points: 20,
        user: {
          userID: userID2,
          name: "Hello2",
        },
      },
    ]);
    await rankingCalculation();
    expect(mockCalculateSeasonRankings).toHaveBeenCalled();
    expect(rankingsMap[seasonID.toString()]).toEqual([
      {
        points: 10,
        user: {
          userID: userID,
          name: "Hello",
        },
      },
      {
        points: 20,
        user: {
          userID: userID2,
          name: "Hello2",
        },
      },
    ]);
  });

  it("should return if rankings is not null and there is multiple seasons", async () => {
    const seasonID = new mongoose.Types.ObjectId();
    const seasonID2 = new mongoose.Types.ObjectId();
    const userID = new mongoose.Types.ObjectId().toString();
    const userID2 = new mongoose.Types.ObjectId().toString();
    mockGetActiveSeasons.mockResolvedValue([
      {
        _id: seasonID,
        title: "Season 1",
      } as SeasonModel,
      {
        _id: seasonID2,
        title: "Season 2",
      } as SeasonModel,
    ]);
    mockCalculateSeasonRankings.mockResolvedValue([
      {
        points: 10,
        user: {
          userID: userID,
          name: "Hello",
        },
      },
      {
        points: 20,
        user: {
          userID: userID2,
          name: "Hello2",
        },
      },
    ]);
    await rankingCalculation();
    expect(mockCalculateSeasonRankings).toHaveBeenCalledTimes(2);
    expect(rankingsMap[seasonID.toString()]).toEqual([
      {
        points: 10,
        user: {
          userID: userID,
          name: "Hello",
        },
      },
      {
        points: 20,
        user: {
          userID: userID2,
          name: "Hello2",
        },
      },
    ]);
    expect(rankingsMap[seasonID2.toString()]).toEqual([
      {
        points: 10,
        user: {
          userID: userID,
          name: "Hello",
        },
      },
      {
        points: 20,
        user: {
          userID: userID2,
          name: "Hello2",
        },
      },
    ]);
  });
});
