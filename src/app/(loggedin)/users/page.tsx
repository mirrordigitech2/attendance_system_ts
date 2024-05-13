import PageTitle from "@/components/PageTitle";
import { withAuth } from "next-auth/middleware";
import { NextApiRequest, NextApiResponse } from "next";

import { UsersDataTable } from "./components/DataTable";

function UsersPage() {
  //state

  return (
    <div>
      <PageTitle title="User Page" />

      <UsersDataTable />
    </div>
  );
}

export default UsersPage;
