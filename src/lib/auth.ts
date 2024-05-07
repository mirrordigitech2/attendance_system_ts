import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { adminAuth, adminDb } from "./firebase_admin";
import {
  signInWithEmailAndPassword,
  signInWithCredential,
  signInWithCustomToken,
} from "firebase/auth";
import type { DefaultSession } from "next-auth";
import { auth, db } from "./firebase";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user, account, profile }) => {
      console.log("user", user);
      console.log("token", token);
      if (user) {
        token.sub = user.idNum;
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      if (session.user) {
        console.log("session.user", session.user);
        console.log("token", token);
        if (token.sub) {
          console.log("token.sub", token.sub);
          session.user.idNum = token.sub;

          const firebaseToken = await adminAuth.createCustomToken(
            String(token.sub) /* , { role: "admin" } */
          );
          console.log("firebaseToken", firebaseToken);
          session.firebaseToken = firebaseToken;
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

        try {
          // query the firestore users collection for the user comparing the email and idNum
          //console.log("USER EMAIL: ", email);
          const pass = Number(password);
          const user = await adminDb

            .collection("users")
            .where("email", "==", email)
            .where("idNum", "==", pass)
            .get();
          console.log("user authorize", !user.empty);
          if (!user.empty) {
            console.log("user.docs[0].data()", user.docs[0].data());
            return user.docs[0].data();
          }

          // const userRef = collection(db, "users");
          // const pass = Number(password);
          // const q = query(
          //   userRef,
          //   where("email", "==", email),
          //   where("idNum", "==", pass)
          // );
          // const querySnapshot = await getDocs(q);
          //console.log(querySnapshot);
          //console.log(querySnapshot.docs[0]);

          // let user: DocumentData | null = null;
          // if (querySnapshot.empty) {
          //   user = null;
          // } else {
          //   const userDoc = querySnapshot.docs[0];
          //   user = userDoc.data();
          //   //return true;
          //   //console.log("USERDOC: ", userDoc);
          // }

          // console.log("USERNEW:", user);

          // if the user exists, return the user
          /*
          if (!user.empty) {
            console.log("user.docs[0].data()", user.docs[0].data());
            return user.docs[0].data();
          }
          */

          // if the user does not exist, return null
          //   if (user) {
          //     return user;
          //   } else {
          //     return null;
          //   }
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

  adapter: FirestoreAdapter(adminDb) as Adapter,
} satisfies NextAuthOptions;
