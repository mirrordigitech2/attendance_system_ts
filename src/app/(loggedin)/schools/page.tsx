import PageTitle from "@/components/PageTitle";

import { SchoolsDataTable } from "./components/DataTable";

export default function SchoolsPage() {
  //state

  return (
    <div>
      <PageTitle title="School Page" />

      <SchoolsDataTable />
    </div>
  );
}
