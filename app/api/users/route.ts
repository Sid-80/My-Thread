import { mongoDB } from "@/lib/mongoDB";
import UserModel from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
      await mongoDB();
      const users = await UserModel.find({});
      return NextResponse.json({ users }, { status: 200 });
    } catch (e) {
      return NextResponse.json({ "message":"Error occured !!" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
  try {
    await mongoDB();
    const {_id,bio,username} = await request.json();
    const updates = await UserModel.updateOne({_id},{bio,username});
    return NextResponse.json({"msg":"hii"},{status:200})
  } catch (e) {
    
  }
}