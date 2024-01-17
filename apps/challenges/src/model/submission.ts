import mongoose, { Schema, Document, model } from 'mongoose';

interface SubmissionModel extends Document {
    user: mongoose.Types.ObjectId;
    name: string;
    response: string;
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
    response: {
        type: String,
        required: [true, 'Please add a response'],
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

const Submission = model<SubmissionModel>('Submission', submissionSchema);

export default Submission;
