import mongoose, { Schema } from "mongoose";

interface User {
  username?: string;
  email: string;
  avatar?: string;
  bio?: string;
  password: string;
  following?: any[];
  followers?: any[];
}

const UserSchema = new Schema<User>(
  {
    password: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String,
    username: String,
    bio: String,
    following: [ { type: Schema.Types.ObjectId, required: true, ref:"User" }],
    followers: [ { type: Schema.Types.ObjectId, required: true, ref:"User" }],
  },
  { timestamps: true }
);

const UserModel =
  mongoose.models?.User || mongoose.model<User>("User", UserSchema);

export default UserModel;
