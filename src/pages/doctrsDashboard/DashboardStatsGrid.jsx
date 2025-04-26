import React from 'react'

const DashboardStatsGrid = ({stats, bgColor="bg-white"}) => {
  return (
    <div className={` grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4`}>
          {stats.map((stat) => (
            <div key={stat.label} className={`${bgColor} rounded-2xl shadow-md p-6`}>
              <h2 className="text-[#240041] text-lg">{stat.label}</h2>
              <p className="text-2xl font-semibold mt-2">{stat.value}</p>
              <p
                className={`mt-1 text-sm ${
                  stat.positive ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.change} vs last month
              </p>
            </div>
          ))}
        </div>
  )
}

export default DashboardStatsGrid
