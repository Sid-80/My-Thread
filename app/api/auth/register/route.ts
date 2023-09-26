import { mongoDB } from "@/lib/mongoDB";
import UserModel from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

type MyData = {
  username: string;
  email: string;
  password: string;
};

export async function POST(request: Request) {
  try {
    const { username, email, password }: MyData = await request.json();
    const hashedPass = await bcrypt.hash(password,10);
    await mongoDB();
    await UserModel.create({username,email,password:hashedPass});

    return NextResponse.json({ email }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ "message":"Error occured !!" }, { status: 500 });
  }
}
