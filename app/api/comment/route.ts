import { mongoDB } from "@/lib/mongoDB";
import CommentModel from "@/models/comment";
import ThreadModel from "@/models/thread";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    await mongoDB();
    const { threadId, authorId,commentText } = await request.json();
    const c = await CommentModel.create({author:authorId,threadId,text:commentText})

    return NextResponse.json( { status: 200 });
  } catch (e) {
    console.log(e);
  }
}
export async function POST(request: Request) {
  try {
    await mongoDB();
    const { threadId } = await request.json();
    const c = await CommentModel.find({threadId}).populate('author');

    return NextResponse.json( {c}, { status: 200 });
  } catch (e) {
    console.log(e);
  }
}