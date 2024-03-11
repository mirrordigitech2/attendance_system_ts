"use client";
// import { useAuthContext } from "@/context/auth";
import { useAuthContext } from "../../../context/auth";
import React, { useEffect } from "react";

type Props = {};

export default function Dashboardpage({}: Props) {
  const { user } = useAuthContext();

  return (
    <div>
      <div>
        Dashboard page {user?.email} - {user?.role}
      </div>
    </div>
  );
}
