import mongoose, { Schema, Document } from 'mongoose';

export interface QuestionModel {
    question_no: string;
    question_title: string;
    question_desc: string;
    question_date: Date;
    expiry: Date;
    points: number;
    answer: string;
    submissions: Array<mongoose.Types.ObjectId>;
    submissions_count: number;
    correct_submissions_count: number;
    active: boolean;
}

const questionSchema: Schema<QuestionModel> = new Schema({
    question_no: {
        type: String,
        required: [true, 'Please add a question number']
    },
    question_title: {
        type: String,
        required: [true, 'Please add a question title']
    },
    question_desc: {
        type: String,
        required: [true, 'Please add a question desc']
    },
    question_date: {
        type: Date,
        required: [true, 'Please add a question date']
    },
    expiry: {
        type: Date,
        required: [true, 'Please add an expiry date']
    },
    points: {
        type: Number,
        required: [true, 'Please add a points value']
    },
    answer: {
        type: String,
        required: [true, 'Please add an answer']
    },
    submissions: {
        type: [mongoose.Types.ObjectId],
        ref: 'Submission'
    },
    submissions_count: {
        type: Number,
        default: 0
    },
    correct_submissions_count: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model<QuestionModel>('Question', questionSchema);