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
import { School } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { DataTable } from "@/components/DataTable";
import { FormDrawer } from "@/components/FormDrawer";
import { useState } from "react";
import { FormSchools } from "./Form";

import { useSchools } from "../hooks/useSchools";

type Props = {};

export const SchoolsDataTable = (props: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<School | null>();

  const { schools, refreshSchools, deleteSchool } = useSchools();

  const columns: ColumnDef<School>[] = [
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
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: " lecturer",
      header: "Lecturer",
    },

    {
      accessorKey: "manager",
      header: " Manager",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "totalStudent",
      header: "Total Student",
    },

    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const school1 = row.original;

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
              <DropdownMenuItem onClick={() => onEditItem(school1)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onDeleteItem(school1)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const onEditItem = (item: School) => {
    setEditItem(item);
    setIsDrawerOpen(true);
  };

  const onDeleteItem = (item: School) => {
    if (window.confirm("Are you sure")) {
      deleteSchool(item);
      () => refreshSchools;
    }
  };

  return (
    <div className=" container mx-auto py-10 m-4 p-2  w-full">
      <FormDrawer
        isOpen={isDrawerOpen}
        onChange={setIsDrawerOpen}
        form={FormSchools}
        item={editItem}
        onClose={() => {
          setEditItem(undefined);
          setIsDrawerOpen(false);
          () => refreshSchools;
        }}
      />
      <Button
        variant="outline"
        onClick={() => {
          setEditItem(undefined);
          setIsDrawerOpen(true);
        }}
        className="m-1 p-4 flex items-center justify-center whitespace-nowrap rounded-md  font-medium  "
      >
        Add School
      </Button>

      <DataTable columns={columns} data={schools} />
    </div>
  );
};
