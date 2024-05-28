"use client";
import { useEffect } from "react";
import { Button } from "./ui/button";
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
} from "./ui/dropdown-menu";
import { mkConfig, generateCsv, download } from "export-to-csv";

type Props = {
  items: any[];
};
const csvConfig = mkConfig({
  useKeysAsHeaders: false,
  columnHeaders: [
    "name",
    "email",
    "school",
    "courses",
    "phone",
    "idNum",
    "role",
  ],
});

export default function Export({ items }: Props) {
  const csvData = [
    ["Name", "Identity", "Schools", "Courses", "Phone Number", "Email", "Role"],
  ];

  const makeCsv = () => {
    items.map((item, index) => {
      const row = [
        item.name,
        item.idNum.toString(),
        item.school,
        item.courses,
        item.phone.toString(),
        item.email,
        item.role,
      ];
      csvData.push(row);
    });
  };

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
          {/* <DropdownMenuItem onClick={() => csvExport()}>CSV</DropdownMenuItem> */}
          <CSVLink separator={";"} data={csvData} onClick={makeCsv}>
            Export CSV
          </CSVLink>
          ;
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
