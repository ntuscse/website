import Season, { SeasonModel } from "../model/season";
import mongoose, { Collection } from 'mongoose';
import Ranking, { RankingModel } from "../model/seasonRanking";


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

const getSeasonRankings = async (
    seasonID: mongoose.Types.ObjectId,
): Promise<RankingModel[] | null> => {
    const rankings = await Ranking.find({
        seasonID: seasonID
    });
    return rankings;
}

const getSeasonRankingsByPagination = async (
    seasonID: mongoose.Types.ObjectId,
    page: number,
    limit: number,
) => {
    const _rankings = await Ranking.find({
        seasonID: seasonID
    })
    const rankingsCount = _rankings.length;
    const rankings = await Ranking.find({
        seasonID: seasonID
    }).sort({ 
        points: -1,
        createdAt: 1
    })
        .skip(page * limit)
        .limit(limit);
    
    return {rankings, rankingsCount};
}

const getUserSeasonRanking = async (
    seasonID: mongoose.Types.ObjectId,
    userID: mongoose.Types.ObjectId
) => {
    var rankingDocument;
    var rank = 0;
    const myCursor = Collection.find({
        seasonID: seasonID,
        userID: userID
    }).stream().on('data', function (doc) {
        rank++;
        rankingDocument = doc;
    }).on('error', function (err) {
        console.log(err)
        }).on('close', function () {
            console.log('done')
            });
    return { rank, rankingDocument };
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
    updateSeasonRankings
}

export { SeasonRepo as default }