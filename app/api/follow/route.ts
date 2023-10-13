import { mongoDB } from "@/lib/mongoDB";
import UserModel from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await mongoDB();
    const { userEmail,profileEmail } = await request.json();
    const updateUser = {
        $push: {
          following: profileEmail,
        },
      };
    const updates1 = await UserModel.updateOne({email:userEmail},updateUser);
    const updateProfile = {
        $push:{
            followers: userEmail,
        },
    }
    const updates2 = await UserModel.updateOne({email:profileEmail},updateProfile);
    return NextResponse.json({updates2},{status:200});
  } catch (e) {
    console.log(e);
  }
}
export async function PUT(request: Request) {
  try {
    await mongoDB();
    const { userEmail,profileEmail } = await request.json();
    const updateUser = {
        $pull: {
          following: profileEmail,
        },
      };
    const updates1 = await UserModel.updateOne({email:userEmail},updateUser);
    const updateProfile = {
        $pull:{
            followers: userEmail,
        },
    }
    const updates2 = await UserModel.updateOne({email:profileEmail},updateProfile);
    return NextResponse.json({updates2},{status:200});
  } catch (e) {
    console.log(e);
  }
}
