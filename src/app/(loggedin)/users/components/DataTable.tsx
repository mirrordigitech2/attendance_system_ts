"use client";

import { useAuth } from "@/app/context/AuthProvider";
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
import Export from "@/components/(Export Data)/Export";

interface UsersDataTableProps {}

export const UsersDataTable: React.FC<UsersDataTableProps> = () => {
  const authContext = useAuth();
  console.log(authContext?.currentUser);
  console.log("isAdmin", authContext?.isAdmin);
  if (!authContext?.currentUser) {
    return null;
  }
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<User | null>(null);
  const { users, refreshUsers, deleteUser, loading, error } = useUsers();

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
      cell: ({ row }) => row.original.school?.name || "No school",
    },
    {
      accessorKey: "courses",
      header: "Courses",
      cell: ({ row }) => row.original.courses?.name || "No courses",
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
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEditItem(user)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onDeleteItem(user)}>
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

  const onDeleteItem = async (item: User) => {
    if (window.confirm("Are you sure?")) {
      await deleteUser(item);
      refreshUsers();
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto py-10 m-4 p-2 w-full">
      <FormDrawer
        isOpen={isDrawerOpen}
        onChange={setIsDrawerOpen}
        form={FormUsers}
        item={editItem}
        onClose={() => {
          setEditItem(null);
          setIsDrawerOpen(false);
          refreshUsers();
        }}
      />
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            setEditItem(null);
            setIsDrawerOpen(true);
          }}
          className="m-1 p-4 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium"
        >
          Add User
        </Button>
        <Export items={users} />
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  );
};
