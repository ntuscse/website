import mongoose, { Schema, model } from 'mongoose';

export interface SubmissionModel {
    user: mongoose.Types.ObjectId;
    name: string;
    answer: string;
    correct?: boolean;
    question?: mongoose.Types.ObjectId;
}

const submissionSchema: Schema<SubmissionModel> = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    answer: {
        type: String,
        required: [true, 'Please add an answer'],
    },
    correct: {
        type: Boolean,
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model<SubmissionModel>('Submission', submissionSchema);
