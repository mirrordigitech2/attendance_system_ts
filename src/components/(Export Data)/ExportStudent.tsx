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

  columnHeaders: [
    "Name",
    "Schools",
    "Age",
    "Class",
    "Phone Parents",
    "Address",
    "Courses",
  ],
  fieldSeparator: ";",
});

export default function ExportStudent({ items }: Props) {
  function csvExport() {
    const formattedItems = items.map((item) => ({
      ...item,
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
      "Schools",
      "Age",
      "Class",
      "Phone Parents",
      "Address",
      "Courses",
    ];
    const tableRows: string[][] = [];
    items.forEach((item) => {
      const itemData = [
        item.name,
        item.school,
        item.age,
        item.class,
        item.phoneParent,
        item.address,
        item.courses,
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
