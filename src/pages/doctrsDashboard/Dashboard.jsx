// src/components/Dashboard.jsx

import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import DashboardStatsGrid from "./DashboardStatsGrid";
import DashboardChart from "./DashboardChart";

const Dashboard = () => {
  const statsPatient = [
    { label: "Total Patients", value: "4.2K", change: "+5%", positive: true },
    { label: "New Patients", value: "24.7K", change: "+20%", positive: true },
    { label: "Revisited", value: "54%", change: "-1.5%", positive: false },
    { label: "Female", value: "36%", change: "+7%", positive: true },
  ];
  const statsRevenu = [
    {
      label: "Total revenue",
      value: "3600",
      change: "+12%",
      positive: true,
    },
    {
      label: "In Cash",
      value: "1240",
      change: "+9%",
      positive: true,
    },
    {
      label: "UPI",
      value: "2400",
      change: "-3%",
      positive: false,
    },
    {
      label: "Card",
      value: "900",
      change: "+2%",
      positive: true,
    },
  ];

  // Generate expense data like salary given, item puschased, transportation, etc.
  const expenses = [
    { label: "Total Expenses", value: "1000", change: "-5%", positive: false },
    { label: "Item Purchases", value: "200", change: "+10%", positive: true },
    { label: "Salary", value: "50", change: "-2%", positive: false },
    { label: "Other", value: "300", change: "+5%", positive: true },
  ];

  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    if (endDate && e.target.value > endDate) {
      setEndDate(e.target.value); // Auto adjust if startDate > endDate
    }
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };
  const [timePeriod, setTimePeriod] = useState("month");

  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
  };

  // Generate dummy analytics data
  const chartData = Array.from({ length: 30 }, (_, i) => ({
    day: (i + 1).toString(),
    visitors: Math.floor(Math.random() * 400),
  }));

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 mt-11">Clinic Dashboard</h1>
      <div className="flex flex-col md:flex-row items-center gap-4 p-4">
        {/* Start Date */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            max={today}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            min={startDate} // endDate cannot be before startDate
            max={today} // endDate cannot be after today
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Time Period Buttons */}
      <div className="flex gap-2 mb-6 ml-4">
        <button
          className={`px-4 py-2 text-sm rounded-xl ${
            timePeriod === "today"
              ? "bg-indigo-600  text-white"
              : "bg-gray-100 text-black"
          }`}
          onClick={() => handleTimePeriodChange("today")}
        >
          Today
        </button>
        <button
          className={`px-4 py-2 text-sm rounded-xl ${
            timePeriod === "week"
              ? "bg-indigo-600  text-white"
              : "bg-gray-100 text-black"
          }`}
          onClick={() => handleTimePeriodChange("week")}
        >
          Past Week
        </button>
        <button
          className={`px-4 py-2 text-sm rounded-xl ${
            timePeriod === "month"
              ? "bg-indigo-600  text-white"
              : "bg-gray-100 text-black"
          }`}
          onClick={() => handleTimePeriodChange("month")}
        >
          This Month
        </button>
      </div>
      {/* Stats Grid */}
      <DashboardStatsGrid stats={statsPatient} bgColor="bg-[#e3f6f5]" />
      <DashboardStatsGrid stats={statsRevenu} bgColor="bg-[#fcffc1]" />
      <DashboardStatsGrid stats={expenses} bgColor="bg-[#f3d7ca]" />

      {/* Analytics Chart */}
      <DashboardChart chartData={chartData} />
    </div>
  );
};

export default Dashboard;
