import { db } from "@/lib/firebase";
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
} from "firebase/firestore";

import { useEffect, useState } from "react";

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [refereshKey, setRefreshKey] = useState(0);

  const deleteStudent = async (student: Student) => {
    await deleteDoc(doc(db, "students", student.id));
  };

  useEffect(() => {
    const getStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        const students: Student[] = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id);
          const studentInfo: Student = {
            id: doc.id,
            name: doc.data().name,
            school: doc.data().school,
            age: doc.data().age,
            class1: doc.data().class1,
            phoneParent: doc.data().phoneParent,
            address: doc.data().address,
            courses: doc.data().courses,
          };
          students.push(studentInfo);
        });
        setStudents(students);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };
    getStudents();

    const q = query(collection(db, "students"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedStudents: Student[] = [];
      querySnapshot.forEach((doc) => {
        const updatedStudentInfo: Student = {
          id: doc.id,
          name: doc.data().name,
          school: doc.data().school,
          age: doc.data().age,
          class1: doc.data().class1,
          phoneParent: doc.data().phoneParent,
          address: doc.data().address,
          courses: doc.data().courses,
        };
        updatedStudents.push(updatedStudentInfo);
      });
      setStudents(updatedStudents);
    });

    return () => unsubscribe();
  }, [refereshKey]);

  const refreshStudents = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  return { students, refreshStudents, deleteStudent };
};
