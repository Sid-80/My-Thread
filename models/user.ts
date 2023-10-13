import mongoose, { Schema } from "mongoose";
import { Thread } from "./thread";

interface User {
  username?: string;
  email: string;
  avatar?: string;
  bio?: string;
  password: string;
  following?: string[];
  followers?: string[];
}

const UserSchema = new Schema<User>(
  {
    password: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String,
    username: String,
    bio: String,
    following: [String],
    followers: [String],
  },
  { timestamps: true }
);

const UserModel =
  mongoose.models?.User || mongoose.model<User>("User", UserSchema);

export default UserModel;
