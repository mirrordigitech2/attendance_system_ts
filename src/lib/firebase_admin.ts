import admin from "firebase-admin";
import { FirebaseApp } from "firebase/app";
import { initFirestore } from "@auth/firebase-adapter";

// Initialize Firebase
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// const firestore = getFirestore(app);
const credential = {
  projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
  privateKey: process.env.NEXT_FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.NEXT_FIREBASE_CLIENT_EMAIL,
};
const app = admin.initializeApp({
  credential: admin.credential.cert(credential),
});

// export { firestore };
