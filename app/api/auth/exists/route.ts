import { mongoDB } from "@/lib/mongoDB";
import UserModel from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await mongoDB();
    const { email } = await request.json();
    const userId = await UserModel.findOne({email}).select("_id");
    console.log(userId)
    return NextResponse.json({ userId }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ "message":"Error occured !!" }, { status: 500 });
  }
}



