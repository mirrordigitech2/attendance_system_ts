"use client";
import Head from "@/components/Head";
import SideNavbar from "../../components/SideNavbar";
import { ThemeProvider } from "@/components/TheamProvider";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-white text-black flex">
      {" "}
      <SideNavbar />
      <div className=" grid p-8 w-full h-full ">
        <Head />

        {children}
      </div>
    </div>
  );
}
