import { mongoDB } from "@/lib/mongoDB";
import UserModel from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
      await mongoDB();
      const users = await UserModel.find({});
      console.log(users)
      return NextResponse.json({ users }, { status: 200 });
    } catch (e) {
      return NextResponse.json({ "message":"Error occured !!" }, { status: 500 });
    }
  }