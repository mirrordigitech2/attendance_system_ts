"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthProvider";
import { app, db } from "@/lib/firebase";
import { School, User, Student } from "@/lib/types";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useSession } from "next-auth/react";

interface UseSchoolsResult {
  schools: School[];
  refreshSchools: () => void;
  deleteSchool: (school: School) => Promise<void>;
  loading: boolean;
  error: Error | undefined;
}

export const useSchools = (): UseSchoolsResult => {
  const { data: session } = useSession();

  const currentUser = useAuth();

  const isAdmin = useAuth();
  const [schools, setSchools] = useState<School[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const [value, loading, error] = useCollection(
    collection(getFirestore(app), "schools"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      if (value) {
        try {
          const usersSnapshot = await getDocs(collection(db, "users"));
          const usersMap: Record<string, User> = {};
          usersSnapshot.forEach((doc) => {
            usersMap[doc.id] = doc.data() as User;
          });

          const schoolsSnapshot = await getDocs(collection(db, "schools"));
          const studentsSnapshot = await getDocs(collection(db, "students"));

          const studentCountMap: Record<string, number> = {};
          studentsSnapshot.forEach((doc) => {
            const studentData = doc.data() as Student;

            const schoolId =
              typeof studentData.school === "object"
                ? studentData.school.id
                : studentData.school;
            if (schoolId) {
              if (!studentCountMap[schoolId]) {
                studentCountMap[schoolId] = 0;
              }
              studentCountMap[schoolId]++;
            }
          });

          const fetchedSchools: School[] = schoolsSnapshot.docs.map((doc) => {
            const schoolData = doc.data();

            return {
              id: doc.id,
              ...schoolData,
              totalStudent: studentCountMap[doc.id] || 0,

              lecturer: usersMap[schoolData.lecturer] || null,
            } as School;
          });

          setSchools(fetchedSchools);
        } catch (err) {
          console.error("Error fetching data: ", err);
        }
      }
    };
    fetchData();
  }, [value, refreshKey]);

  // Function to delete a user and refresh the list
  const deleteSchool = async (school: School) => {
    await deleteDoc(doc(db, "schools", school.id));
    refreshSchools();
  };

  // Function to refresh the users
  const refreshSchools = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return { schools, refreshSchools, deleteSchool, loading, error };
};
