import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { adminAuth, adminDb } from "./firebase_admin";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user, account, profile }) => {
      // console.log("user", user);
      // console.log("token", token);
      if (user) {
        return {
          ...token,
          sub: user.idNum,
          role: user.role,
        };
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      if (session.user) {
        // console.log("session.user", session.user);
        // console.log("token", token);
        if (token.sub) {
          // console.log("token.sub", token.sub);
          session.user.idNum = String(token.sub);
          session.user.role = token.role as "admin" | "user";

          const firebaseToken = await adminAuth.createCustomToken(
            String(token.sub),
            { role: token.role }
          );
          session.firebaseToken = firebaseToken;
          await adminAuth.setCustomUserClaims(String(token.sub), {
            role: token.role,
          });
        }
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials): Promise</* User | null */ any> {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password) {
          throw new Error("Please enter an email and password");
        }
        try {
          // query the firestore users collection for the user comparing the email and idNum
          //console.log("USER EMAIL: ", email);
          const pass = Number(password);
          const user = await adminDb

            .collection("users")
            .where("email", "==", email)
            .where("idNum", "==", pass)
            .get();

          // console.log("user authorize", !user.empty);

          if (!user.empty) {
            // console.log("user.docs[0].data()", user.docs[0].data());
            return user.docs[0].data();
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET!,

  adapter: FirestoreAdapter(adminDb) as Adapter,
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthOptions;
