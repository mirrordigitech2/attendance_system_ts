"use client";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { CSVLink, CSVDownload } from "react-csv";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { mkConfig, generateCsv, download } from "export-to-csv";

type Props = {
  items: any[];
};
const csvConfig = mkConfig({
  useKeysAsHeaders: false,

  columnHeaders: ["Name", "Lecturer", "School", "Location", "Total Student"],
  fieldSeparator: ";",
});

export default function ExportCourse({ items }: Props) {
  function csvExport() {
    const formattedItems = items.map((item) => ({
      ...item,

      totalStudent: item.phone.toString(),
    }));

    const csv = generateCsv(csvConfig)(formattedItems);
    console.log(items);
    download(csvConfig)(csv);
  }

  //
  function pdfExport() {
    const doc = new jsPDF();
    const tableColumn = [
      "Name",
      "Lecturer",
      "School",
      "Location",
      "Total Student",
    ];
    const tableRows: string[][] = [];
    items.forEach((item) => {
      const itemData = [
        item.name,
        item.lecturer,
        item.school,
        item.location,
        item.totalStudent.toString(),
      ];
      tableRows.push(itemData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      // styles: {
      //   fontSize: 10
      // },
      // headStyles: {
      //   fillColor: [22, 160, 133]
      // }
    });

    doc.save("items.pdf");
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="m-1 p-4 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium "
          >
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem onClick={() => csvExport()}>CSV</DropdownMenuItem>
          {/* <CSVLink separator={";"} data={csvData}>
            Export CSV
          </CSVLink>
           */}
          <DropdownMenuItem onClick={pdfExport}>PDF</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
