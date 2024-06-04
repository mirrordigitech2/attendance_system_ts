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
import { Student } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { DataTable } from "@/components/DataTable";
import { FormDrawer } from "@/components/FormDrawer";
import { useState } from "react";
import { FormStudents } from "./Form";

import { useStudents } from "../hooks/useStudents";
import Export from "@/components/(Export Data)/Export";
import ExportStudent from "@/components/(Export Data)/ExportStudent";

interface SchoolsDataTableProps {}

export const StudentsDataTable: React.FC<SchoolsDataTableProps> = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<Student | null>();

  const { students, refreshStudents, deleteStudent, loading, error } =
    useStudents();

  const columns: ColumnDef<Student>[] = [
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
      accessorKey: "school",
      header: "Schools",
    },
    {
      accessorKey: "age",
      header: "Age",
    },
    {
      accessorKey: "class1",
      header: "Class",
    },

    {
      accessorKey: "phoneParent",
      header: "phone Parents",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "courses",
      header: "Courses",
    },

    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const student1 = row.original;

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
              <DropdownMenuItem onClick={() => onEditItem(student1)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onDeleteItem(student1)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const onEditItem = (item: Student) => {
    setEditItem(item);
    setIsDrawerOpen(true);
  };

  const onDeleteItem = async (item: Student) => {
    if (window.confirm("Are you sure")) {
      await deleteStudent(item);
      () => refreshStudents;
    }
  };

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error:{error.message}</p>;
  return (
    <div className=" container mx-auto py-10 m-4 p-2  w-full">
      <FormDrawer
        isOpen={isDrawerOpen}
        onChange={setIsDrawerOpen}
        form={FormStudents}
        item={editItem}
        onClose={() => {
          setEditItem(undefined);
          setIsDrawerOpen(false);
          () => refreshStudents;
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
          Add Student
        </Button>
        <ExportStudent items={students} />
      </div>
      <DataTable columns={columns} data={students} />
    </div>
  );
};
