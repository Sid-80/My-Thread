import ThreadModel from "@/models/thread";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    const _id = params.id;
    const update = await ThreadModel.deleteOne({_id});
    return NextResponse.json({update},{status:200});
  }