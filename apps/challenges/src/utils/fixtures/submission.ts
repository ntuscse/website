import mongoose from "mongoose";

export const submissionFixture = (overrides = {}) => {
  const defaultValues = {
    user: new mongoose.Types.ObjectId(),
    seasonID: new mongoose.Types.ObjectId(),
    answer: (Math.random() + 1).toString(36).substring(2),
    question: new mongoose.Types.ObjectId(),
    correct: true,
    points_awarded: 10,
    attempt: 1,
  };

  return { ...defaultValues, ...overrides };
};
