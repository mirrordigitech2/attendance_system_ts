import { useAuthContext } from "@/context/auth";
import React, { useEffect } from "react";

type Props = {};

export default function Dashboardpage({}: Props) {
  const { user } = useAuthContext();

  return (
    <div>
      <div>Dashboard page</div>
    </div>
  );
}
