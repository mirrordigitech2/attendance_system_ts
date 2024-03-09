"use client";
import { Button } from "@/components/ui/button";
// import { TableDemo } from "./_components/table";
// import { CheckboxDemo } from "./_components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Abc from "../components/PageTitle";
import { useAuthContext } from "@/context/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import { useFormContext } from "react-hook-form";
export default function Home() {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user == null) {
      router.push("/login");
    }
  });
  return (
    <main className="p-">
      {/* <Abc title="Dashboard" /> */}
      {user && (
        <div className="mt-1 text-red-500 ">
          {user?.email} - {user?.role}
          <p>Attendance System</p>
        </div>
      )}
    </main>
  );
}
