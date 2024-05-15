import PageTitle from "@/components/PageTitle";
import { withAuth } from "next-auth/middleware";
import { NextApiRequest, NextApiResponse } from "next";

import { UsersDataTable } from "./components/DataTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

async function UsersPage() {
  //state
  const session = await getServerSession(authOptions);
  if (session?.user?.role == "user") {
    redirect("/dashboard");
  }

  return (
    <div>
      <PageTitle title="User Page" />

      <UsersDataTable />
    </div>
  );
}

export default UsersPage;
