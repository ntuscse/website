import mongoose, { Schema, Document } from 'mongoose';
import Submission from './submission';

export interface QuestionModel {
    _id: string;
    question_no: string;
    question_title: string;
    question_desc: string;
    question_date: string;
    expiry: string;
    points: number;
    answer: string;
    submissions: any[]; // Adjust the type based on your 'Submission' model
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
        type: String,
        required: [true, 'Please add a question date']
    },
    expiry: {
        type: String,
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
    submissions: Array<typeof Submission>,
    active: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

const Question = mongoose.model<QuestionModel>('Question', questionSchema);

export default Question;