import { mongoDB } from "@/lib/mongoDB";
import ThreadModel from "@/models/thread";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await mongoDB();
    const { author, threadText } = await request.json();
    const thread = await ThreadModel.create({
      author,
      threadText,
      like: [],
    });
    return NextResponse.json({ status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Error occured !!" }, { status: 500 });
  }
}
