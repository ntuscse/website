import mongoose, { Schema } from "mongoose";

export interface CreateSubmissionReq {
  user: mongoose.Types.ObjectId;
  question: mongoose.Types.ObjectId;
  answer: string;
}

export interface SubmissionModel {
  user: mongoose.Types.ObjectId;
  seasonID: mongoose.Types.ObjectId;
  question: mongoose.Types.ObjectId;
  answer: string;
  correct?: boolean;
  points_awarded?: number;
}

const submissionSchema: Schema<SubmissionModel> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    seasonID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Season",
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
    answer: {
      type: String,
      required: [true, "Please add an answer"],
    },
    correct: {
      type: Boolean,
    },
    points_awarded: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Submission = mongoose.model<SubmissionModel>(
  "Submission",
  submissionSchema
);

export { Submission as default };
