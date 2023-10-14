import { mongoDB } from "@/lib/mongoDB";
import UserModel from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await mongoDB();
    const { userId,profileId } = await request.json();
    const updateUser = {
        $push: {
          following: profileId,
        },
      };
    const updates1 = await UserModel.updateOne({_id:userId},updateUser);
    const updateProfile = {
        $push:{
            followers: userId,
        },
    }
    const updates2 = await UserModel.updateOne({_id:profileId},updateProfile);
    return NextResponse.json({updates2},{status:200});
  } catch (e) {
    console.log(e);
  }
}
export async function PUT(request: Request) {
  try {
    await mongoDB();
    const { userId,profileId } = await request.json();
    const updateUser = {
        $pull: {
          following: profileId,
        },
      };
      const updates1 = await UserModel.updateOne({_id:userId},updateUser);
    const updateProfile = {
        $pull:{
            followers: userId,
        },
    }
    const updates2 = await UserModel.updateOne({_id:profileId},updateProfile);
    return NextResponse.json({},{status:200});
  } catch (e) {
    console.log(e);
  }
}
