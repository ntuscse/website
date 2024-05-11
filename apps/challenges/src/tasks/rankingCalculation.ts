import { UserRanking } from "../model/rankingScore";
import { SeasonModel } from "../model/season";
import SeasonService from "../service/seasonService";

export const rankingsMap: { [id: string]: UserRanking[] } = {};

export const clearRankingsMap = () => {
    for (const key in rankingsMap) {
        delete rankingsMap[key];
    }
}

export const rankingCalculation = async () => {
    console.log("Calculating rankings...");
    let activeSeasons: SeasonModel[] | null;
    try{
        activeSeasons = await SeasonService.getActiveSeasons();
    }catch(err){
        console.log(err);
        return;
    }

    if (!activeSeasons) {
        console.log("rankingCalculation: no season found")
        return;
    }

    const activeSeasonIDs: string[] = activeSeasons.map(a => a._id.toString());

    try{
        for (const seasonID of activeSeasonIDs) {
            const rankings = await SeasonService.calculateSeasonRankings(seasonID);
            if(rankings && rankings.length > 0){
                rankingsMap[seasonID] = rankings;
            }
        }
    }catch(err){
        console.log(err);
    }
}

