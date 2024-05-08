"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Session, User } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/firebase";

type AuthContextType = {
  isAdmin: boolean;
  currentUser: User | null;
  // logout
  // login
};
export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!auth) return;

    return auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setCurrentUser(null);
      } else {
        setCurrentUser(user as unknown as User);
        const tokenValues = await user.getIdTokenResult();
        setIsAdmin(tokenValues.claims.role === "admin");
        console.log("tokenValues.claims", tokenValues.claims);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
      }}
    >
      <SessionProvider session={session}>{children}</SessionProvider>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
