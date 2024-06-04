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
    "name",
    "email",
    "school",
    "courses",
    "phone",
    "idNum",
    "role",
  ],
  fieldSeparator: ";",
});

export default function Export({ items }: Props) {
  function csvExport() {
    const formattedItems = items.map((item) => ({
      ...item,
      idNum: item.idNum.toString(),
      phone: item.phone.toString(),
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
      "Email",
      "School",
      "Courses",
      "Phone",
      "ID Number",
      "Role",
    ];
    const tableRows: string[][] = [];
    items.forEach((item) => {
      const itemData = [
        item.name,
        item.email,
        item.school,
        item.courses,
        item.phone.toString(),
        item.idNum.toString(),
        item.role,
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
// "use client";
// import React from "react";
// import { Button } from "./ui/button";
// import { mkConfig, generateCsv, download } from "export-to-csv";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";

// // Define the type for the items
// interface Item {
//   name: string;
//   email: string;
//   school: string;
//   courses: string;
//   phone: string;
//   idNum: string | number; // Assuming idNum can be either string or number
//   role: string;
// }

// interface Props {
//   items: Item[];
// }

// const csvConfig = mkConfig({
//   useKeysAsHeaders: true, // Use object keys as headers
//   headers: ["name", "email", "school", "courses", "phone", "idNum", "role"],
//   fieldSeparator: ";", // Set the custom separator here
// });

// export default function Export({ items }: Props) {
//   function csvExport() {
//     const formattedItems = items.map((item) => ({
//       name: item.name,
//       email: item.email,
//       school: item.school,
//       courses: item.courses,
//       phone: item.phone,
//       idNum: item.idNum,
//       role: item.role,
//     }));

//     const csv = generateCsv(csvConfig)(formattedItems);
//     download(csvConfig)(csv);
//   }

//   return (
//     <div>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant="outline"
//             className="m-1 p-4 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium"
//           >
//             Export
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="w-56" align="end" forceMount>
//           <DropdownMenuItem onClick={csvExport}>CSV</DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// }
