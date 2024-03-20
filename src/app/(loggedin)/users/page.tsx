import PageTitle from "@/components/PageTitle";

import { UsersDataTable } from "./components/DataTable";

export default function UsersPage() {
  //state

  return (
    <div>
      <PageTitle title="User Page" />

      <UsersDataTable />
    </div>
  );
}
