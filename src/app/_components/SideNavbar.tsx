"use client";
import React, { useCallback, useState } from "react";
import {
  Archive,
  Book,
  ChevronRight,
  LayoutDashboard,
  School,
  Users2,
} from "lucide-react";

import { Nav } from "./ui/nav";
import { Button } from "@/components/ui/button";
type Props = {};

export default function Sidenavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }
  return (
    <div className="relative min-w-[80] border-r px-3 pb-10 pt-24">
      <div className="absolute right-[-20px] top-7">
        <Button
          onClick={toggleSidebar}
          variant="secondary"
          className="rounded-full p-2"
        >
          <ChevronRight />
        </Button>
      </div>
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "School",
            href: "/school",

            icon: School,
            variant: "ghost",
          },
          {
            title: "Student",
            href: "/student",
            icon: Book,
            variant: "ghost",
          },
          {
            title: "User",
            href: "/user",

            icon: Users2,
            variant: "ghost",
          },
          {
            title: "Courses",
            href: "/courses",
            icon: Archive,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
