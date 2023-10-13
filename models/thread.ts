import mongoose, { Schema } from "mongoose";

export interface Thread {
  author: any;
  threadText: string;
  like: string[];
}

const ThreadSchema = new Schema<Thread>(
  {
    author: { type: Schema.Types.ObjectId, required: true, ref:"User" },
    threadText: { type: String, required: true },
    like: [String],
  },
  { timestamps: true }
);

const ThreadModel =
  mongoose.models?.Thread || mongoose.model<Thread>("Thread", ThreadSchema);

export default ThreadModel;
