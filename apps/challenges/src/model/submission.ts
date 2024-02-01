import mongoose, { Schema, model } from 'mongoose';

export interface SubmissionModel {
    user: mongoose.Types.ObjectId;
    seasonID: mongoose.Types.ObjectId;
    answer: string;
    correct?: boolean;
    points_awarded?: number;
    question?: mongoose.Types.ObjectId;
    attempt?: number;
}

const submissionSchema: Schema<SubmissionModel> = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    seasonID: {
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
    attempt: {
        type: Number,
        default: 1,
    },
}, {
    timestamps: true,
});

const Submission = mongoose.model<SubmissionModel>('Submission', submissionSchema);

export { Submission as default }
