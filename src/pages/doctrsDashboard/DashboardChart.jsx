import React from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
const DashboardChart = ({ chartData, period, setPeriod }) => {
  const data = [
    { id: 1, days: "Month", value: "month" },
    { id: 2, days: "Quarter", value: "quarter" },
    { id: 3, days: "Year", value: "year" },
    { id: 4, days: "Week", value: "week" },
  ];
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-5 md:flex-row sm: flex-col justify-between ">
          <h2 className="md:text-xl font-bold w-[330px]">
            Visitor Analytics (period:{" "}
            {period.charAt(0).toUpperCase() + period.slice(1)} )
          </h2>
          <div className="flex gap-2">
            {data.map((item) => (
              <button
                key={item.id}
                className={`px-4 py-2 text-sm rounded-xl transition-colors ${
                  period === item.value
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setPeriod(item.value)}
              >
                {item.days}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive Bar Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="visitors" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

DashboardChart.propTypes = {
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      visitors: PropTypes.number.isRequired,
    }),
  ).isRequired,
  period: PropTypes.string.isRequired,
  setPeriod: PropTypes.func.isRequired,
};

export default DashboardChart;
