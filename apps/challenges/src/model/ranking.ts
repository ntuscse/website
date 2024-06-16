import mongoose, { Schema } from "mongoose";

export interface UserRanking {
  user: {
    userID: string;
    name: string;
  };
  points: number;
}
export interface RankingModel {
  _id: mongoose.Types.ObjectId;
  userID: mongoose.Types.ObjectId;
  name: string;
  points: number;
  ranking: number;
  seasonID: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const rankingSchema: Schema<RankingModel> = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
    },
    points: {
      type: Number,
    },
    ranking: {
      type: Number,
    },
    seasonID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Season",
    },
  },
  {
    timestamps: true,
  }
);

const Ranking = mongoose.model<RankingModel>("Ranking", rankingSchema);
rankingSchema.index({ seasonID: 1, userID: 1 }, { unique: true });

export { Ranking as default };
