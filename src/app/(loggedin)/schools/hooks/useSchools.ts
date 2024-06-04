"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthProvider";
import { app, db } from "@/lib/firebase";
import { School } from "@/lib/types";
import {
  collection,
  deleteDoc,
  doc,
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

  // // Define a Firestore collection reference
  // const schoolsCollectionRef = collection(db, "schools");

  // // Apply a query if the user is not an admin, to filter users by email

  // const usersQuery = isAdmin
  //   ? usersCollectionRef
  //   : query(usersCollectionRef, where("email", "==", currentUser?.isAdmin));

  //Use useCollection to fetch the data
  // const [value, loading, error] = useCollection(usersQuery, {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // });
  const [value, loading, error] = useCollection(
    collection(getFirestore(app), "schools"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  // Update the state when the value changes
  useEffect(() => {
    if (value) {
      const fetchedSchools: School[] = value.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as School[];
      setSchools(fetchedSchools);
    }
  }, [value]);

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
