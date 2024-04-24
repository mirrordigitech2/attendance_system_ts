"use client";
import PageTitle from "@/components/PageTitle";
// import { useAuthContext } from "@/context/auth";
import { useAuthContext } from "../../../context/auth";
import React, { useEffect } from "react";

type Props = {};

export default function Dashboardpage({}: Props) {
  const { user } = useAuthContext();

  return (
    <div>
      <div className="flex flex-col gap-5 w-full">
        <PageTitle title="Dashboard Page" />
        {/* {user?.email} - {user?.role} */}
      </div>
    </div>
  );
}
