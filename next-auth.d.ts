import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user:{
      id:string;
      email:string;
    }
  }
  interface User {
    _id: string;
  }
}