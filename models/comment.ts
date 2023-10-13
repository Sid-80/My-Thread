import mongoose, { Schema } from "mongoose";

interface comments {
  author: any;
  text: string;
  threadId:any;
}

const CommentSchema = new Schema<comments>(
  {
    threadId : { type: Schema.Types.ObjectId, required: true, ref: "Thread" },
    author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    text: { type: String, required: true },
  },
  { timestamps: true }
);


const CommentModel =
  mongoose.models?.Comment || mongoose.model<comments>("Comment", CommentSchema);

export default CommentModel;
