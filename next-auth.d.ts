import NextAuth, { DefaultSession, DefaultUser, User } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    idNum: string;
  }
  interface Session {
    firebaseToken?: string;
    user: {
      id: string;
      idNum: string;
    } & DefaultSession["user"];
  }
}
