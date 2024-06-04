"use client";

import { Student, StudentForm } from "@/lib/types";
import {
  addDoc,
  deleteDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  doc,
  getFirestore,
} from "firebase/firestore";
import { useAuth } from "@/app/context/AuthProvider";
import { app, db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useSession } from "next-auth/react";

interface UseStudentsResult {
  students: Student[];
  refreshStudents: () => void;
  deleteStudent: (student: Student) => Promise<void>;
  loading: boolean;
  error: Error | undefined;
}

export const useStudents = (): UseStudentsResult => {
  const { data: session } = useSession();

  const currentUser = useAuth();

  const isAdmin = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [refereshKey, setRefreshKey] = useState(0);

  const [value, loading, error] = useCollection(
    collection(getFirestore(app), "students"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    if (value) {
      const fetchedStudents: Student[] = value.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Student[];
      setStudents(fetchedStudents);
    }
  }, [value]);

  // Function to delete a user and refresh the list
  const deleteStudent = async (student: Student) => {
    await deleteDoc(doc(db, "students", student.id));
    refreshStudents();
  };
  const refreshStudents = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  return { students, refreshStudents, deleteStudent, loading, error };
};
