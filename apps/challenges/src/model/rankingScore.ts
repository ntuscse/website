import mongoose, {Schema} from 'mongoose';

export interface UserRanking {
    user: {
        userID: string;
        name: string;
    }
    points: number;
}