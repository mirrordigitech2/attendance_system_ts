// components/Chart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import { Student } from "@/lib/types";

interface ChartProps {
  data: Student[];
  title: string;
}

export const Chart: React.FC<ChartProps> = ({ data, title }) => {
  const chartData = {
    labels: Array.from(
      new Set(data.map((student) => student.school?.name || "Unknown"))
    ),
    datasets: [
      {
        label: "Students",
        data: Array.from(
          new Set(data.map((student) => student.school?.name || "Unknown"))
        ).map(
          (school) =>
            data.filter((student) => student.school?.name === school).length
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <Bar data={chartData} />
    </div>
  );
};
