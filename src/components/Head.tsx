"use client";
import { ThemeProvider } from "@/components/TheamProvider";
import { ModeToggle } from "./ui/toggle-mode";
import { ThemeToggle } from "./ThemeToggle";
import Avatar1 from "@/components/Avatar1";

export default function Head() {
  return (
    <div className="flex  gap-4  p-4 border-b  justify-normal">
      {/* <ThemeToggle
        className="ml-4 p-0.1 justify
      "
      /> */}
      <Avatar1 />
    </div>
  );
}
