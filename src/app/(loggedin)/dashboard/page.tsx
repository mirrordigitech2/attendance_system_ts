import Avatar1 from "@/components/Avatar1";
import PageTitle from "@/components/PageTitle";
// import { useAuthContext } from "@/context/auth";
// import { useAuthContext } from "../../context/auth";
import React, { useEffect } from "react";
import { useSchools } from "../schools/hooks/useSchools";
import { useStudents } from "../students/hooks/useStudents";

type Props = {};

export default function Dashboardpage({}: Props) {
  // const {
  //   schools,

  // } = useSchools();
  // const {
  //   students,
  //   loading: studentsLoading,
  //   error: studentsError,
  // } = useStudents();

  // if (schoolsLoading || studentsLoading) return <p>Loading...</p>;
  // if (schoolsError || studentsError)
  //   // return <p>Error: {schoolsError || studentsError}</p>;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className=" shadow-md rounded-md p-4">
          <h2 className="text-xl font-semibold mb-2">Schools</h2>
          {/* <p className="text-4xl text-gray-800">{schools.length}</p> */}
        </div>

        <div className=" shadow-md rounded-md p-4">
          <h2 className="text-xl font-semibold mb-4"> Students</h2>
          {/* <p className="text-4xl text-gray-800">{students.length}</p> */}
        </div>
      </div>
    </div>
  );
}
