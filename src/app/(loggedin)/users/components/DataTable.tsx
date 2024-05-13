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
import { User } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { DataTable } from "@/components/DataTable";
import { FormDrawer } from "@/components/FormDrawer";
import { useState } from "react";
import { FormUsers } from "./Form";

import { useUsers } from "../hooks/useUsers";
import { deleteUser } from "@/lib/action";

type Props = {};

export const UsersDataTable = (props: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<User | null>();

  const { users, refreshUsers } = useUsers();

  const columns: ColumnDef<User>[] = [
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
      accessorKey: "idNum",
      header: "Identity",
    },
    {
      accessorKey: "school",
      header: "Schools",
    },
    {
      accessorKey: "courses",
      header: "Courses",
    },
    {
      accessorKey: "phone",
      header: "Phone Number",
    },

    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },

    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const user1 = row.original;
        // console.log(user1);

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
              <DropdownMenuItem onClick={() => onEditItem(user1)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onDeleteItem(user1)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const onEditItem = (item: User) => {
    setEditItem(item);
    setIsDrawerOpen(true);
  };

  const onDeleteItem = (item: User) => {
    if (window.confirm("Are you sure")) {
      deleteUser(item.id);

      () => refreshUsers;
    }
  };

  return (
    <div className="container mx-auto py-10 m-4 p-2  w-full">
      <FormDrawer
        isOpen={isDrawerOpen}
        onChange={setIsDrawerOpen}
        form={FormUsers}
        item={editItem}
        onClose={() => {
          setEditItem(undefined);
          setIsDrawerOpen(false);
          () => refreshUsers;
        }}
      />
      <Button
        variant="outline"
        onClick={() => {
          setEditItem(undefined);
          setIsDrawerOpen(true);
        }}
        className="m-1 p-4 inline-flex items-center justify-center whitespace-nowrap rounded-md  font-medium  "
      >
        Add User
      </Button>
      <DataTable columns={columns} data={users} />
    </div>
  );
};
