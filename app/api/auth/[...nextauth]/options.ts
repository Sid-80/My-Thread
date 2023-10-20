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
          const user = await UserModel.findOne({ email });
          if (!user) {
            throw new Error("Not Registered!");
          }
          const passCheck = await bcrypt.compare(password, user.password);
          console.log(passCheck)
          if (!passCheck) throw new Error("Incorrect Password!");
          return user;
        } catch (e) {
          console.log(e)
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks:{
    async session({ session, user, token }) {
      return {
        ...session,
        user:{
          ...session.user,
          id:token.id
        }
      }
    },
    async jwt({ token, user, session }) {
      if(user){
        return {
          ...token,
          id:user._id,
        } 
      }
      return token;
    }
  },
  session:{
    strategy:"jwt",
  },
};
