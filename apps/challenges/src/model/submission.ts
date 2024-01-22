import mongoose, { Schema, model } from 'mongoose';

export interface SubmissionModel {
    user: mongoose.Types.ObjectId;
    leaderboard: mongoose.Types.ObjectId;
    answer: string;
    correct?: boolean;
    points_awarded?: number;
    question?: mongoose.Types.ObjectId;
}

const submissionSchema: Schema<SubmissionModel> = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    leaderboard: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Leaderboard',
    },
    answer: {
        type: String,
        required: [true, 'Please add an answer'],
    },
    correct: {
        type: Boolean,
    },
    points_awarded: {
        type: Number,
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Question',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model<SubmissionModel>('Submission', submissionSchema);
