interface DashboardCardProps {
  title: string;
  count: number;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  count,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-3xl font-bold">{count}</p>
    </div>
  );
};
