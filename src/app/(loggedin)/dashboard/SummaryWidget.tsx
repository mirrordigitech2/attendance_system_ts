import React from "react";

interface SummaryWidgetProps {
  title: string;
  value: number;
}

export const SummaryWidget: React.FC<SummaryWidgetProps> = ({
  title,
  value,
}) => {
  return (
    <div className="p-4 bg-white rounded shadow-md text-center">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};
