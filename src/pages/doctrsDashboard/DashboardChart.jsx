import React from 'react'
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
const DashboardChart = ({chartData}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-10">
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-5 md:flex-row sm: flex-col justify-between ">
        <h2 className="md:text-xl font-bold">
          Visitor Analytics (Last 30 Days)
        </h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm bg-indigo-600  text-white rounded-xl hover:bg-indigo-800 ">
            Monthly
          </button>
          <button className="px-4 py-2 text-sm bg-gray-100 rounded-xl hover:bg-gray-200">
            Quarterly
          </button>
          <button className="px-4 py-2 text-sm bg-gray-100 rounded-xl hover:bg-gray-200">
            Annually
          </button>
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
  )
}

DashboardChart.propTypes = {
    chartData: PropTypes.arrayOf(PropTypes.shape({
      day: PropTypes.string.isRequired,
      visitors: PropTypes.number.isRequired,
    })).isRequired,
  };

export default DashboardChart