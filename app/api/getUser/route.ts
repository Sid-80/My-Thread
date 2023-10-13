import { mongoDB } from "@/lib/mongoDB";
import UserModel from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await mongoDB();
    const { _id,email } = await request.json();
    let user;
    
    if(_id){
      user = await UserModel.find({_id})
    }else{
      user = await UserModel.find({email})
    }
    return NextResponse.json({user},{status:200});
  } catch (e) {
    console.log(e);
  }
}