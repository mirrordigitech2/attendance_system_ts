"use client";

import { Course, School, Student, StudentForm } from "@/lib/types";
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
  const [refreshKey, setRefreshKey] = useState(0);

  const [value, loading, error] = useCollection(
    collection(getFirestore(app), "students"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      if (value) {
        try {
          const schoolsSnapshot = await getDocs(collection(db, "schools"));
          const schoolsMap: Record<string, School> = {};
          schoolsSnapshot.forEach((doc) => {
            schoolsMap[doc.id] = doc.data() as School;
          });
          const coursesSnapshot = await getDocs(collection(db, "courses"));
          const coursesMap: Record<string, Course> = {};
          coursesSnapshot.forEach((doc) => {
            coursesMap[doc.id] = doc.data() as Course;
          });

          const fetchedStudents: Student[] = value.docs.map((doc) => {
            const studentData = doc.data();
            return {
              id: doc.id,
              ...studentData,

              school: schoolsMap[studentData.school] || null,
              courses: coursesMap[studentData.courses] || null,
            } as Student;
          });

          setStudents(fetchedStudents);
        } catch (err) {
          console.error("Error fetching data: ", err);
        }
      }
    };
    fetchData();
  }, [value, refreshKey]);

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
