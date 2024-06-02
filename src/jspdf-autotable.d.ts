// src/jspdf-autotable.d.ts
declare module "jspdf-autotable" {
  import { jsPDF } from "jspdf";

  namespace autoTable {
    interface Styles {
      fontSize?: number;
    }

    interface HeadStyles extends Styles {
      fillColor?: number[];
    }

    interface Options {
      head: string[][];
      body: string[][];
      startY?: number;
      styles?: Styles;
      headStyles?: HeadStyles;
    }
  }

  function autoTable(doc: jsPDF, options: autoTable.Options): void;

  export = autoTable;
}

export declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: import("jspdf-autotable").autoTable.Options) => jsPDF;
  }
}
