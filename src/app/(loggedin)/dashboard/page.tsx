"use client";

import PageTitle from "@/components/PageTitle";

import React, { useEffect, useState } from "react";
import { useSchools } from "../schools/hooks/useSchools";
import { useStudents } from "../students/hooks/useStudents";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { DashboardCard } from "./DashboardCard";

const DashboardPage: React.FC = () => {
  const [coursesCount, setCoursesCount] = useState<number>(0);
  const [schoolsCount, setSchoolsCount] = useState<number>(0);
  const [studentsCount, setStudentsCount] = useState<number>(0);
  const [usersCount, setUsersCount] = useState<number>(0);

  useEffect(() => {
    // Function to fetch data from Firestore
    const fetchData = async () => {
      try {
        // Fetch courses count
        const coursesSnapshot = await getDocs(collection(db, "courses"));
        setCoursesCount(coursesSnapshot.size);

        // Fetch schools count
        const schoolsSnapshot = await getDocs(collection(db, "schools"));
        setSchoolsCount(schoolsSnapshot.size);

        // Fetch students count (assuming 'students' collection)
        const studentsSnapshot = await getDocs(collection(db, "students"));
        setStudentsCount(studentsSnapshot.size);

        // Fetch users count (assuming 'users' collection)
        const usersSnapshot = await getDocs(collection(db, "users"));
        setUsersCount(usersSnapshot.size);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Display counts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Courses</h2>
          <p className="text-gray-600">{coursesCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Schools</h2>
          <p className="text-gray-600">{schoolsCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Students</h2>
          <p className="text-gray-600">{studentsCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <p className="text-gray-600">{usersCount}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
