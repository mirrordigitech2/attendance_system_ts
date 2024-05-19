"use client";
import React, { useCallback, useState } from "react";
import {
  Archive,
  Book,
  ChevronRight,
  LayoutDashboard,
  LucideIcon,
  School,
  Users2,
} from "lucide-react";

import { Nav } from "./ui/nav";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/AuthProvider";
type Props = {};

interface Link {
  title: string;
  href: string;
  icon: LucideIcon;
  variant: "ghost" | "default"; // Ensure variant is "ghost" or "default"
}
export default function SideNavbar({}: Props) {
  // const auth = useAuth();
  // const { isAdmin } = auth;
  const authContext = useAuth();
  console.log(authContext?.currentUser);
  console.log("isAdmin", authContext?.isAdmin);
  const [isCollapsed, setIsCollapsed] = useState(false);
  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }
  const links: Link[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      variant: "default",
    },
    {
      title: "Schools",
      href: "/schools",

      icon: School,
      variant: "ghost",
    },
    {
      title: "Students",
      href: "/students",
      icon: Book,
      variant: "ghost",
    },

    {
      title: "Courses",
      href: "/courses",
      icon: Archive,
      variant: "ghost",
    },
    // {
    //   title: "Users",
    //   href: "/users",

    //   icon: Users2,
    //   variant: "ghost",
    // },
  ];
  const isAdmin = authContext?.isAdmin;
  if (authContext?.isAdmin) {
    links.push({
      title: "Users",
      href: "/users",

      icon: Users2,
      variant: "ghost",
    });
  }

  return (
    <div className=" fixed relative min-w-[80] border-r px-3 pb-10 pt-24">
      <div className="absolute right-[-20px] top-7">
        <Button
          onClick={toggleSidebar}
          variant="secondary"
          className="rounded-full p-2"
        >
          <ChevronRight />
        </Button>
      </div>
      <Nav isCollapsed={isCollapsed} links={links} isAdmin={true} />
    </div>
  );
}
