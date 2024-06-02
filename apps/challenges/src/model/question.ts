import mongoose, { Schema } from "mongoose";

export interface QuestionReq {
  question_no: string;
  question_title: string;
  question_desc: string;
  question_date: Date;
  season_id: string;
  expiry: Date;
  points: number;
  validation_function: string;
  generate_input_function: string;
}

export interface GetUserSpecificQuestionResp {
  id: string;
  question_no: string;
  question_title: string;
  question_desc: string;
  question_date: Date;
  seasonID: string;
  question_input: string[];
  expiry: Date;
  points: number;
}

export interface QuestionModel {
  _id: mongoose.Types.ObjectId;
  question_no: string;
  question_title: string;
  question_desc: string;
  question_date: Date;
  seasonID: mongoose.Types.ObjectId;
  expiry: Date;
  points: number;
  submissions: Array<mongoose.Types.ObjectId>;
  submissions_count: number;
  correct_submissions_count: number;
  active: boolean;
  validation_function: string;
  generate_input_function: string;
}

const questionSchema: Schema<QuestionModel> = new Schema(
  {
    question_no: {
      type: String,
      required: [true, "Please add a question number"],
    },
    question_title: {
      type: String,
      required: [true, "Please add a question title"],
    },
    question_desc: {
      type: String,
      required: [true, "Please add a question desc"],
    },
    question_date: {
      type: Date,
      required: [true, "Please add a question date"],
    },
    seasonID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Season",
      required: [true, "Please add a season ID"],
    },
    expiry: {
      type: Date,
      required: [true, "Please add an expiry date"],
    },
    points: {
      type: Number,
      required: [true, "Please add a points value"],
    },
    submissions: {
      type: [mongoose.Types.ObjectId],
      ref: "Submission",
    },
    submissions_count: {
      type: Number,
      default: 0,
    },
    correct_submissions_count: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    validation_function: {
      type: String,
      required: [true, "Please add a validation function"],
    },
    generate_input_function: {
      type: String,
      required: [true, "Please add a generate input function"],
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model<QuestionModel>("Question", questionSchema);

export { Question as default };
