"use client";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
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
import { db } from "../lib/firebase";

interface ContextProps {
  user: DocumentData | null;
  setUser: Dispatch<SetStateAction<DocumentData | null>>;
  validateUser: (email: string, password: string) => any;
}

const AuthContext = createContext<ContextProps>({
  user: null,
  setUser: (): DocumentData | null => null,
  validateUser: () => null,
});

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<DocumentData | null>(null);

  const validateUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    console.log("PASS: ", password);
    const pass = Number(password);

    const userRef = collection(db, "users");
    const q = query(
      userRef,
      where("email", "==", email),
      where("idNum", "==", pass)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return false;
    } else {
      const userDoc = querySnapshot.docs[0];
      setUser(userDoc.data());
      return true;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, validateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
