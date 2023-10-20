import { mongoDB } from "@/lib/mongoDB";
import UserModel from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(reqest:Request,{ params }: { params: { id: string } }){
    await mongoDB();
    const {id} = params;
    const User:any[] = await UserModel.find({_id:id}).populate('following')
  return NextResponse.json(User[0].following,{status:200})
}