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
    <div className="min-h-screen w-full flex">
      {" "}
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SideNavbar />
        <div className=" grid p-8 w-full h-full ">
          <Head />

          {children}
        </div>{" "}
      </ThemeProvider>
    </div>
  );
}
