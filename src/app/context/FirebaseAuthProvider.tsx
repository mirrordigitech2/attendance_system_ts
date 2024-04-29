"use client";

import { useEffect, ReactNode } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/lib/firebase";

async function syncFirebaseAuth(session: Session) {
  if (session && session.firebaseToken) {
    try {
      await signInWithCustomToken(auth, session.firebaseToken);
    } catch (error) {
      console.error("Error syncing Firebase Auth:", error);
    }
  } else {
    auth.signOut();
  }
}

export default function FirebaseAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    syncFirebaseAuth(session);
  }, [session]);

  return <>{children}</>;
}
