import admin from "firebase-admin";
import { FirebaseApp } from "firebase/app";
import { initFirestore } from "@auth/firebase-adapter";

// Initialize Firebase
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// const firestore = getFirestore(app);
let app;

const credential = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};
if (!admin.apps.length) {
  app = admin.initializeApp({
    credential: admin.credential.cert(credential),
  });
}

const adminDb = initFirestore({
  credential: admin.credential.cert(credential),
});

const adminAuth = admin.auth(app);

export { adminDb, adminAuth };

