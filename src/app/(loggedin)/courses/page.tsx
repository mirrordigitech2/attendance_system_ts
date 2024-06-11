import PageTitle from "@/components/PageTitle";

import { CoursesDataTable } from "./components/DataTable";

export default function CoursesPage() {
  //state

  return (
    <div>
      <PageTitle title="Courses Page" />

      <CoursesDataTable />
    </div>
  );
}
