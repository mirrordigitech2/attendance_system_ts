// import { Adapter } from '@next-auth/firebase-adapter';
import type { Adapter, AdapterUser } from "next-auth/adapters";
import { db } from "./firebase"; // Assuming `db` is your Firestore instance
import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
// import bcrypt from "bcryptjs";

interface CustomAdapter extends Adapter {
  signIn: (credentials: {
    email: string;
    password: string;
  }) => Promise<AdapterUser | null>;
}

const createFirestoreAdapter = (db: Firestore): CustomAdapter => {
  return {
    async getUserByEmail(email: string) {
      if (this.getUserByEmail) {
        const userRef = collection(db, "users");
        const q = query(userRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          return { ...userDoc.data() } as AdapterUser;
        }
      }
      return null;
    },
    async signIn(credentials) {
      const { email, password } = credentials;
      const getUserByEmailFn = this.getUserByEmail;
      if (getUserByEmailFn) {
        const user: AdapterUser | null = await getUserByEmailFn(email);
        if (user) {
          // Assuming 'hashedPassword' is the field in your Firestore document containing the hashed password
          // const isPasswordCorrect = await bcrypt.compare(password, user.password);
          if (user) {
            console.log("XXX");
            
            console.log(user);
            console.log(password);
            return user;
          }
        }
      }
      return null;
    },
    // Other adapter methods
  };
};

export default createFirestoreAdapter;




