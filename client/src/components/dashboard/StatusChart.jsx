import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#06b6d4",
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
];

function StatusChart({ quotes }) {
  const data = [
    {
      name: "New",
      value: quotes.filter((q) => q.status === "New").length,
    },
    {
      name: "Contacted",
      value: quotes.filter((q) => q.status === "Contacted").length,
    },
    {
      name: "In Progress",
      value: quotes.filter((q) => q.status === "In Progress").length,
    },
    {
      name: "Completed",
      value: quotes.filter((q) => q.status === "Completed").length,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Leads by Status
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={110}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StatusChart;