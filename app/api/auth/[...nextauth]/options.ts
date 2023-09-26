import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { mongoDB } from "@/lib/mongoDB";
import UserModel from "@/models/user";
import bcrypt from "bcryptjs";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-cool-email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials) {
        //retrieve user data
        const { email, password }: any = credentials;
        try {
          await mongoDB();
          const emailCheck = await UserModel.findOne({ email });
          if (!emailCheck) {
            return null;
          }
          const passCheck = await bcrypt.compare(password, emailCheck.password);
          console.log(passCheck)
          if (!passCheck) return null;
          return emailCheck;
        } catch (e) {}

        const user = { id: "18" };
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
