import { mongoDB } from "@/lib/mongoDB";
import ThreadModel from "@/models/thread";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    await mongoDB();
    const { id,email } = await request.json();
    const update = {
        $pull: {
          like: email,
        },
      };
    const updates = await ThreadModel.updateOne({_id:id},update)
    return NextResponse.json({updates},{status:200});
  } catch (e) {
    console.log(e);
  }
}
