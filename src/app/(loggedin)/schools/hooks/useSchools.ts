"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthProvider";
import { app, db } from "@/lib/firebase";
import { School, User } from "@/lib/types";
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

  // Update the state when the value changes
  useEffect(() => {
    const fetchData = async () => {
      if (value) {
        try {
          const usersSnapshot = await getDocs(collection(db, "users"));
          const usersMap: Record<string, User> = {};
          usersSnapshot.forEach((doc) => {
            usersMap[doc.id] = doc.data() as User;
          });

          const fetchedSchools: School[] = value.docs.map((doc) => {
            const schoolData = doc.data();
            return {
              id: doc.id,
              ...schoolData,
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
