import { UserRanking } from "../model/rankingScore";
import SeasonService from "../service/seasonService";

export const rankingsMap: { [id: string]: UserRanking[] } = {};

export const rankingCalculation = async () => {
    console.log("Calculating rankings...");
    const activeSeasons = await SeasonService.getActiveSeasons();

    if(!activeSeasons) return;

    var activeSeasonIDs = activeSeasons?.map((value) => {
        return value._id.toString();
    });

    if (!activeSeasonIDs) return;

    try{
        for (var seasonID of activeSeasonIDs) {
            const rankings = await SeasonService.calculateSeasonRankings(seasonID);
            if(rankings){
                rankingsMap[seasonID] = rankings;
            }
        }
    }catch(err){
        console.log(err);
    }
}

