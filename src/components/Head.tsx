"use client";
import { ThemeProvider } from "@/components/TheamProvider";
import { ModeToggle } from "./ui/toggle-mode";
import { ThemeToggle } from "./ThemeToggle";

export default function Head() {
  return (
    <div className="flex  gap-4  p-0 border-b">
      <ThemeToggle className="ml-4" />
    </div>
  );
}
