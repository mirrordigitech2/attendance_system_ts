"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthProvider";
import { app, db } from "@/lib/firebase";
import { Course, School, User } from "@/lib/types";
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

interface UseUsersResult {
  users: User[];
  refreshUsers: () => void;
  deleteUser: (user: User) => Promise<void>;
  loading: boolean;
  error: Error | undefined;
}

export const useUsers = (): UseUsersResult => {
  const { data: session } = useSession();

  const currentUser = useAuth();

  const isAdmin = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Define a Firestore collection reference
  const usersCollectionRef = collection(db, "users");

  // Apply a query if the user is not an admin, to filter users by email

  const usersQuery = isAdmin
    ? usersCollectionRef
    : query(usersCollectionRef, where("email", "==", currentUser?.isAdmin));

  // Use useCollection to fetch the data
  // const [value, loading, error] = useCollection(usersQuery, {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // });
  const [value, loading, error] = useCollection(
    collection(getFirestore(app), "users"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  // Update the state when the value changes
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

          const fetchedUsers: User[] = value.docs.map((doc) => {
            const userData = doc.data();
            return {
              id: doc.id,
              ...userData,

              school: schoolsMap[userData.school] || null,
              courses: coursesMap[userData.courses] || null,
            } as User;
          });

          setUsers(fetchedUsers);
        } catch (err) {
          console.error("Error fetching data: ", err);
        }
      }
    };
    fetchData();
  }, [value, refreshKey]);

  // Function to delete a user and refresh the list
  const deleteUser = async (user: User) => {
    await deleteDoc(doc(db, "users", user.id));
    refreshUsers();
  };

  // Function to refresh the users
  const refreshUsers = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return { users, refreshUsers, deleteUser, loading, error };
};
