import NextAuth, { DefaultSession, DefaultUser, User } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    idNum: string;
    role: "admin" | "user";
  }
  interface Session {
    firebaseToken?: string;
    user: {
      id: string;
      idNum: string;
      role: "admin" | "user";
    } & DefaultSession["user"];
  }
}
