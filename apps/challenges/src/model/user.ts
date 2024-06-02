import mongoose, { Schema } from "mongoose";

export interface UserModel {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema: Schema<UserModel> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserModel>("User", questionSchema);

export { User as default };
