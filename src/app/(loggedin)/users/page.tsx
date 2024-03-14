"use client";
import { ColumnDef } from "@tanstack/react-table";
import PageTitle from "@/components/PageTitle";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
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

import { useEffect, useState } from "react";
import { FormDrawer } from "@/components/FormDrawer";

export const columns: ColumnDef<User>[] = [
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
      const users = row.original;

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
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

type Props = {};

export default function UsersPage({}: Props) {
  //state
  const [users, setUsers] = useState<User[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<boolean>(false);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [filteredUser, setFilteredUser] = useState({});
  const [rows, setRows] = useState([]);

  const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "usersTest")); //TODO: change 'usersTest' to users collection
      const users: User[] = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id);
        const userInfo: User = {
          id: doc.data().id,
          name: doc.data().name,
          email: doc.data().email,
          school: doc.data().school,
          courses: doc.data().courses,
          phone: doc.data().phone,
          idNum: doc.data().idNum,
          role: doc.data().role,
        };
        users.push(userInfo);
      });
      setUsers(users);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <PageTitle title="User Page" />

      <FormDrawer />
      <div className="container mx-auto py-10 m-3 w-full">
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  );
}
