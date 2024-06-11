"use client";

import { Course, CourseForm, School, Student, User } from "@/lib/types";
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

interface UseCoursesResult {
  courses: Course[];
  refreshCourses: () => void;
  deleteCourse: (course: Course) => Promise<void>;
  loading: boolean;
  error: Error | undefined;
}

export const useCourses = (): UseCoursesResult => {
  const { data: session } = useSession();

  const currentUser = useAuth();

  const isAdmin = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const [value, loading, error] = useCollection(
    collection(getFirestore(app), "courses"),
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
          const schoolsSnapshot = await getDocs(collection(db, "schools"));
          const schoolsMap: Record<string, School> = {};
          schoolsSnapshot.forEach((doc) => {
            schoolsMap[doc.id] = doc.data() as School;
          });
          // const studentsSnapshot = await getDocs(collection(db, "students"));
          // const studentCountMap: Record<string, number> = {};
          // studentsSnapshot.forEach((doc) => {
          //   const student = doc.data() as Student;
          //   if (student.school) {
          //     if (!studentCountMap[student.school]) {
          //       studentCountMap[student.school] = 0;
          //     }
          //     studentCountMap[student.school]++;
          //   }
          // });

          const fetchedCourses: Course[] = value.docs.map((doc) => {
            const courseData = doc.data();
            return {
              id: doc.id,
              ...courseData,
              lecturer: usersMap[courseData.lecturer] || null,
              school: schoolsMap[courseData.school] || null,
            } as Course;
          });

          setCourses(fetchedCourses);
        } catch (err) {
          console.error("Error fetching data: ", err);
        }
      }
    };
    fetchData();
  }, [value, refreshKey]);

  // Function to delete a user and refresh the list
  const deleteCourse = async (course: Course) => {
    await deleteDoc(doc(db, "courses", course.id));
    refreshCourses();
  };

  // Function to refresh the users
  const refreshCourses = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return { courses, refreshCourses, deleteCourse, loading, error };
};
