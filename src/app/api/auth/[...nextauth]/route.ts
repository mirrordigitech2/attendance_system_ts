import NextAuth, { NextAuthOptions } from "next-auth";
// import createFirestoreAdapter from '@/lib/firestoreAdapter'; // Path to your custom adapter
// import { db } from '@/lib/firebase'; // Assuming `db` is your Firestore instance
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        // email: { label: "Email", type: "email", placeholder: "haha@gmail.com" },
        // password: { label: "Password", type: "password" },
      },
      authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        //db logic
        console.log("XXXXXCCC");
        
        if (email !== "ay@gmail.com" || password !== "1111") {
          throw new Error ("Invalid Credentials")
        }

        //if ok
        return { id: "1", name: "younis", email: "ay@gmail.com" };
      },
    }),
  ],
  // pages: {
  //   signIn: "/login",
  // //   // error: "/auth/error",
  // //   // signOut: "/auth/signout"
  // },
});


export {handler as GET, handler as POST}