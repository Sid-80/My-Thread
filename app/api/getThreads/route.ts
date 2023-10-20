import { mongoDB } from "@/lib/mongoDB";
import ThreadModel from "@/models/thread";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await mongoDB();
    const { _id } = await request.json();
    const posts = await ThreadModel.find({author: {$in : _id}}).populate("author").sort({createdAt:"desc"});
    return NextResponse.json({ posts }, { status: 200 });
  } catch (e) {
    console.log(e);
  }
}