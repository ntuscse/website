import mongoose from 'mongoose';

export const questionFixture = (overrides = {}) => {
    const defaultValues = {
        question_no: Math.floor(Math.random() * 100).toString(),
        question_title: (Math.random() + 1).toString(36).substring(2),
        question_desc: (Math.random() + 1).toString(36).substring(2),
        question_date: new Date(),
        seasonID: new mongoose.Types.ObjectId(),
        expiry: new Date(),
        points: 10,
        answer: "hello",
        submissions: [],
        submissions_count: 0,
        correct_submissions_count: 0,
        active: true
    };

    return { ...defaultValues, ...overrides };
}