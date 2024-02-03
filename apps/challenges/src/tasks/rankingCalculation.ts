import { UserRanking } from "../model/rankingScore";
import SeasonService from "../service/seasonService";

export const rankingsMap: { [id: string]: UserRanking[] } = {};

export const clearRankingsMap = () => {
    for (var key in rankingsMap) {
        delete rankingsMap[key];
    }
}

export const rankingCalculation = async () => {
    console.log("Calculating rankings...");
    let activeSeasons;
    try{
        activeSeasons = await SeasonService.getActiveSeasons();
    }catch(err){
        console.log(err);
        return;
    }

    if (!activeSeasons) return;

    var activeSeasonIDs = activeSeasons?.map((value) => {
        return value._id.toString();
    });

    try{
        for (var seasonID of activeSeasonIDs) {
            const rankings = await SeasonService.calculateSeasonRankings(seasonID);
            if(rankings && rankings.length > 0){
                rankingsMap[seasonID] = rankings;
            }
        }
    }catch(err){
        console.log(err);
    }
}

