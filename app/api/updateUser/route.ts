import { mongoDB } from "@/lib/mongoDB";
import UserModel from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    await mongoDB();
    const { id,avatar } = await request.json();
    const updates = await UserModel.updateOne({_id:id},{avatar});
    return NextResponse.json({updates},{status:200});
  } catch (e) {
    console.log(e);
  }
}
