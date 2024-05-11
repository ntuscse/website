import mongoose from 'mongoose';

export const seasonFixtures = (overrides = {}) => {
    const defaultValues = {
        _id: new mongoose.Types.ObjectId(),
        title: (Math.random() + 1).toString(36).substring(2),
        startDate: "2023-05-01T00:00:00.000Z",
        endDate: "2040-06-01T00:00:00.000Z",
    };

    return { ...defaultValues, ...overrides };
}