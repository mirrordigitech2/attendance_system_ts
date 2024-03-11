"use client";
import { ColumnDef } from "@tanstack/react-table";
import PageTitle from "@/components/PageTitle";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
type Props = {};

export default function Userpage({}: Props) {
  return (
    <div>
      <PageTitle title="User Page" />

      <div className="container mx-auto py-10">
        <Button className="m-3">Add User</Button>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export type User = {
  id: number;
  name: string;
  school: string;
  courses: string;
  phone: number;
  identity: number;
  role: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
    accessorKey: "identity",
    header: "Identity",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
];

export const data: User[] = [
  {
    id: 200,
    name: "Razan",
    school: "wadi-al",
    courses: "Math",
    phone: 2555,
    identity: 255,
    role: "string",
  },
];
