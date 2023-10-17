import { NextResponse } from "next/server";
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    const _id = params.id;
    return NextResponse.json({_id},{status:200});
  }