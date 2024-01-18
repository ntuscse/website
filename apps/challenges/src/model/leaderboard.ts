import mongoose, {Schema} from 'mongoose';

export interface Leaderboard {
    title: string; 
    start_date: Date; // Or RFC3339 string? 2021-01-01T02:07:14Z
    end_date: Date; // Or RFC3339 string? 2021-01-02T02:07:14Z
    rankings: Array<{
        user: mongoose.Types.ObjectId;
        points: number;
    }>;
    active: boolean;
}

const leaderboardSchema: Schema<Leaderboard> = new Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    start_date: {
        type: Date,
        required: [true, 'Please add a start date']
    },
    end_date: {
        type: Date,
        required: [true, 'Please add an end date']
    },
    rankings: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            points: {
                type: Number,
                required: [true, 'Please add a points value'],
            },
        }
    
    ],
    active: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model<Leaderboard>('Leaderboard', leaderboardSchema);