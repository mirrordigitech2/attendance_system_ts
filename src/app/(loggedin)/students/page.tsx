import PageTitle from "@/components/PageTitle";

import { StudentsDataTable } from "./components/DataTable";

export default function StudentsPage() {
  //state

  return (
    <div>
      <PageTitle title="Student Page" />

      <StudentsDataTable />
    </div>
  );
}
