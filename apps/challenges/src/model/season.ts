import mongoose, { Schema } from 'mongoose';
import { QuestionModel } from './question';

export interface GetSeasonResp {
    id: mongoose.Types.ObjectId;
    title: string;
    startDate: Date;
    endDate: Date;
    questions: QuestionModel[];
}

// TODO: season should store simple question model for faster retrieval
export interface SeasonModel {
    _id: mongoose.Types.ObjectId;
    title: string;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

const seasonSchema: Schema<SeasonModel> = new Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    startDate: {
        type: Date,
        required: [true, 'Please add a start date']
    },
    endDate: {
        type: Date,
        required: [true, 'Please add an end date']
    }
}, {
    timestamps: true
});


const Season = mongoose.model<SeasonModel>('Season', seasonSchema);

export { Season as default }
