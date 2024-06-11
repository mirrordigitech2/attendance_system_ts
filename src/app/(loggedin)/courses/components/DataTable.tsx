"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Course } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { DataTable } from "@/components/DataTable";
import { FormDrawer } from "@/components/FormDrawer";
import { useState } from "react";
import { FormCourses } from "./Form";

import { useCourses } from "../hooks/useCourses";
import ExportCourse from "@/components/(Export Data)/ExportCourse";

interface CoursesDataTableProps {}

export const CoursesDataTable: React.FC<CoursesDataTableProps> = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<Course | null>();

  const { courses, refreshCourses, deleteCourse, loading, error } =
    useCourses();

  const columns: ColumnDef<Course>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },

    {
      accessorKey: "lecturer",
      header: "lecturers",
      cell: ({ row }) => row.original.lecturer?.name || "No Lecturer",
    },

    {
      accessorKey: "school",
      header: "Schools",
      cell: ({ row }) => row.original.school?.name || "No school",
    },

    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "totalStudent",
      header: "Total Student",
    },

    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const course1 = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>.
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEditItem(course1)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onDeleteItem(course1)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const onEditItem = (item: Course) => {
    setEditItem(item);
    setIsDrawerOpen(true);
  };

  const onDeleteItem = async (item: Course) => {
    if (window.confirm("Are you sure")) {
      await deleteCourse(item);
      () => refreshCourses;
    }
  };

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error:{error.message}</p>;
  return (
    <div className=" container mx-auto py-10 m-4 p-2  w-full">
      <FormDrawer
        isOpen={isDrawerOpen}
        onChange={setIsDrawerOpen}
        form={FormCourses}
        item={editItem}
        onClose={() => {
          setEditItem(undefined);
          setIsDrawerOpen(false);
          () => refreshCourses;
        }}
      />
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            setEditItem(null);
            setIsDrawerOpen(true);
          }}
          className="m-1 p-4 flex items-center justify-center whitespace-nowrap rounded-md  font-medium  "
        >
          Add Course
        </Button>
        <ExportCourse items={courses} />
      </div>
      <DataTable columns={columns} data={courses} />
    </div>
  );
};
