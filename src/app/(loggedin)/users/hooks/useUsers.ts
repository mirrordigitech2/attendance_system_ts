import { db } from "@/lib/firebase";
import { User, UserForm } from "@/lib/types";
import {
  addDoc,
  deleteDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  doc,
} from "firebase/firestore";

import { useEffect, useState } from "react";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [refereshKey, setRefreshKey] = useState(0);

  const deleteUser = async (user: User) => {
    await deleteDoc(doc(db, "users", user.id));
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const users: User[] = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id);
          const userInfo: User = {
            id: doc.id,
            name: doc.data().name,
            email: doc.data().email,
            school: doc.data().school,
            courses: doc.data().courses,
            phone: doc.data().phone,
            idNum: doc.data().idNum,
            role: doc.data().role,
          };
          users.push(userInfo);
        });
        setUsers(users);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };
    getUsers();

    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedUsers: User[] = [];
      querySnapshot.forEach((doc) => {
        const updatedUserInfo: User = {
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          school: doc.data().school,
          courses: doc.data().courses,
          phone: doc.data().phone,
          idNum: doc.data().idNum,
          role: doc.data().role,
        };
        updatedUsers.push(updatedUserInfo);
      });
      setUsers(updatedUsers);
    });

    return () => unsubscribe();
  }, [refereshKey]);

  const refreshUsers = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  return { users, refreshUsers, deleteUser };
};
