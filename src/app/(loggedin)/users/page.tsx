"use client";
import { ColumnDef } from "@tanstack/react-table";
import PageTitle from "@/components/PageTitle";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { User } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { FormDrawer } from "@/components/FormDrawer";
import { Form } from "./components/Form";
import { useUsers } from "./utils/db";

export default function UsersPage() {
  //state

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<User | null>();

  const onEditItem = (item: User) => {
    setEditItem(item);
    setIsDrawerOpen(true);
  };

  const onDeleteItem = (item: User) => {
    if (window.confirm("Are you sure")) {
      deleteUser(item);
      () => refreshUsers;
    }
  };

  const { users, refreshUsers, deleteUser } = useUsers();

  const columns: ColumnDef<User>[] = [
    // {
    //   accessorKey: "id",
    //   header: "ID",
    // },
    {
      accessorKey: "name",
      header: "Name",
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
        console.log(user1);

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

  return (
    <div>
      <PageTitle title="User Page" />
      <Button
        variant="default"
        onClick={() => {
          setEditItem(undefined);
          setIsDrawerOpen(true);
        }}
        className="m-3 p-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 border border-input bg-background"
      >
        Add User
      </Button>
      <FormDrawer
        isOpen={isDrawerOpen}
        onChange={setIsDrawerOpen}
        form={Form}
        item={editItem}
        onClose={() => {
          setEditItem(undefined);
          setIsDrawerOpen(false);
          () => refreshUsers;
        }}
      />

      <div className="container mx-auto py-10 m-3 w-full">
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  );
}
