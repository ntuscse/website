import mongoose, { Schema } from "mongoose";

export interface RankingModel {
  _id: mongoose.Types.ObjectId;
  userID: mongoose.Types.ObjectId;
  seasonID: mongoose.Types.ObjectId;
  username: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

const seasonSchema: Schema<RankingModel> = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    seasonID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Season",
    },
    points: {
      type: Number,
      required: [true, "Please add a points value"],
    },
  },
  {
    timestamps: true,
  }
);

const Ranking = mongoose.model<RankingModel>("Ranking", seasonSchema);

export { Ranking as default };
