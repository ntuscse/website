import mongoose, { Schema } from 'mongoose';
export interface QuestionInputModel {
    userID: mongoose.Types.ObjectId;
    seasonID: mongoose.Types.ObjectId;
    questionID: mongoose.Types.ObjectId;
    input: string[];
}

const questionInputSchema: Schema<QuestionInputModel> = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    seasonID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Season',
    },
    questionID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Question',
    },
    input: {
        type: [String],
    }
}, {
    timestamps: true,
});

const QuestionInput = mongoose.model<QuestionInputModel>('QuestionInput', questionInputSchema);

export { QuestionInput as default }