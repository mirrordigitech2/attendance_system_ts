import { db } from "@/lib/firebase";
import { School, SchoolForm } from "@/lib/types";
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

export const useSchools = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [refereshKey, setRefreshKey] = useState(0);

  const deleteSchool = async (school: School) => {
    await deleteDoc(doc(db, "schools", school.id));
  };

  useEffect(() => {
    const getSchools = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "schools"));
        const schools: School[] = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id);
          const schoolInfo: School = {
            id: doc.id,
            name: doc.data().name,
            location: doc.data().location,
            lecturer: doc.data().lecturer,
            manager: doc.data().manager,
            phone: doc.data().phone,
            totalStudent: doc.data().totalStudent,
          };
          schools.push(schoolInfo);
        });
        setSchools(schools);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };
    getSchools();

    const q = query(collection(db, "schools"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedSchools: School[] = [];
      querySnapshot.forEach((doc) => {
        const updatedSchoolInfo: School = {
          id: doc.id,
          name: doc.data().name,
          location: doc.data().location,
          lecturer: doc.data().lecturer,
          manager: doc.data().manager,
          phone: doc.data().phone,
          totalStudent: doc.data().totalStudent,
        };
        updatedSchools.push(updatedSchoolInfo);
      });
      setSchools(updatedSchools);
    });

    return () => unsubscribe();
  }, [refereshKey]);

  const refreshSchools = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  return { schools, refreshSchools, deleteSchool };
};
