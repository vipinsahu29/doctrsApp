// src/components/Dashboard.jsx

import React, { useEffect, useMemo, useState } from "react";

import DashboardStatsGrid from "./DashboardStatsGrid";
import DashboardChart from "./DashboardChart";
import {
  getPatientStats,
  getRevenueStats,
  getExpensesStats,
} from "../../Constants/DashboardStats";
import Store from "../../store/store";
import {
  getPatientsCountNew,
  getAppointmentsCount,
  getExpenseStats,
  getChartStats,
} from "../../SupaBase/DashboardApi";

const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

const Dashboard = () => {
  const clinicId = Store.getState().clinicId;
  // Default dates = today
  const [startDate, setStartDate] = useState(getToday);
  const [endDate, setEndDate] = useState(getToday);
  const [chartStartDate, setChartStartDate] = useState(getToday);
  const [chartEndDate, setChartEndDate] = useState(getToday);
  const [timePeriod, setTimePeriod] = useState("today");
  const [chartPeriod, setChartPeriod] = React.useState("month");
  const [chartData, setChartData] = useState([{ days: 0, visitors: 0 }]);
  const [patientStats, setPatientStats] = useState({
    totalPatients: 0,
    newPatients: 0,
    totalMale: 0,
    totalFemale: 0,
    maleBetween: 0,
    femaleBetween: 0,
  });
  const [revenueStats, setRevenueStats] = useState({
    totalRevenue: 0,
    inCash: 0,
    upi: 0,
    card: 0,
    totalAppointments: 0,
    revisited: 0,
  });

  const [expenseStats, setExpenseStats] = useState({
    totalExpenses: 0,
    fixedExpenses: 0,
    professionalExpenses: 0,
    facilityExpenses: 0,
    businessMiscellaneous: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const today = getToday();
  // --------------------------------------------------
  // Date Handlers
  // --------------------------------------------------

  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;

    setStartDate(selectedDate);

    // If start date becomes greater than end date,
    // automatically move end date to start date.
    if (!endDate || selectedDate > endDate) {
      setEndDate(selectedDate);
    }

    // Manual date selection
    setTimePeriod("custom");
  };

  const handleEndDateChange = (e) => {
    const selectedDate = e.target.value;
    setEndDate(selectedDate);
    setTimePeriod("custom");
  };

  // --------------------------------------------------
  // Time Period
  // --------------------------------------------------

  const handleTimePeriodChange = (period, isChart = false) => {
    const todayDate = new Date();

    let start = new Date(todayDate);
    let end = new Date(todayDate);

    switch (period) {
      case "today":
        start = new Date(todayDate);
        end = new Date(todayDate);
        break;

      case "week":
        start = new Date(todayDate);
        start.setDate(todayDate.getDate() - 6);
        break;
      case "quarter":
        start = new Date(todayDate);
        start.setMonth(todayDate.getMonth() - 3);
        break;
      case "month":
        start = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);
        break;
      case "year":
        start = new Date(
          todayDate.getFullYear(),
          0, // January
          1, // First day
        );
        break;
      default:
        return;
    }

    if (isChart) {
      setChartStartDate(start.toISOString().split("T")[0]);
      setChartEndDate(end.toISOString().split("T")[0]);
      setChartPeriod(period);
    } else {
      setStartDate(start.toISOString().split("T")[0]);
      setEndDate(end.toISOString().split("T")[0]);
      setTimePeriod(period);
    }
  };

  // --------------------------------------------------
  // Fetch Patient Counts
  // --------------------------------------------------

  useEffect(() => {
    handleTimePeriodChange(chartPeriod, true);
  }, [chartPeriod]);

  useEffect(() => {
    if (!clinicId || !startDate || !endDate) {
      return;
    }
    const getAppointmentsCountData = async () => {
      try {
        const data = await getAppointmentsCount(startDate, endDate, clinicId);
        if (error) {
          setError(error.message || "Unable to fetch appointment stats");
          setRevenueStats({
            totalRevenue: 0,
            inCash: 0,
            upi: 0,
            card: 0,
            totalAppointments: 0,
            revisited: 0,
          });
          return { data: null, error };
        }
        setRevenueStats({
          totalRevenue: data?.totalRevenue ?? 0,
          inCash: data?.cash ?? 0,
          upi: data?.upi ?? 0,
          card: data?.card ?? 0,
          totalAppointments: data?.totalAppointments ?? 0,
          revisited: data?.revisited ?? 0,
        });
        return { data, error };
      } catch (error) {
        console.error("getAppointmentsCount:", error);
        setRevenueStats({
          totalRevenue: 0,
          inCash: 0,
          upi: 0,
          card: 0,
          totalAppointments: 0,
          revisited: 0,
        });
        setError(error.message || "Unable to fetch appointment stats");
        throw error;
      }
    };
    const fetchExpenseStats = async () => {
      try {
        const data = await getExpenseStats(startDate, endDate, clinicId);
        if (!data || data.length === 0) {
          setExpenseStats({
            totalExpenses: 0,
            fixedExpenses: 0,
            professionalExpenses: 0,
            facilityExpenses: 0,
            businessMiscellaneous: 0,
          });
          return;
        }
        setExpenseStats({
          totalExpenses: data.total_expense_sum,
          fixedExpenses: data.fixed_expenses,
          professionalExpenses: data.professional_expenses,
          facilityExpenses: data.facility_expenses,
          businessMiscellaneous: data.business_miscellaneous,
        });
      } catch (err) {
        console.log("Error while fetching expense data-", err);
      }
    };
    const fetchPatientCounts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPatientsCountNew(startDate, endDate, clinicId);

        if (!data || data?.error) {
          console.error("Error fetching patient count:", data?.error);

          setError(
            data?.error?.message + "Patient Stats" ||
              "Unable to fetch patient stats",
          );

          setPatientStats({
            totalPatients: 0,
            newPatients: 0,
            totalMale: 0,
            totalFemale: 0,
            maleBetween: 0,
            femaleBetween: 0,
          });
          return;
        }
        setPatientStats({
          totalPatients: data?.totalPatients ?? 0,
          newPatients: data?.femaleBetween + data?.maleBetween,
          totalMale: data?.totalMale ?? 0,
          totalFemale: data?.totalFemale ?? 0,
          maleBetween: data?.maleBetween ?? 0,
          femaleBetween: data?.femaleBetween ?? 0,
        });
      } catch (error) {
        console.error("Error fetching patient count:", error);
        setError(error.message || "Something went wrong with patient stats");
        setPatientStats({
          totalPatients: 0,
          newPatients: 0,
          totalMale: 0,
          totalFemale: 0,
          maleBetween: 0,
          femaleBetween: 0,
        });
      } finally {
        setLoading(false);
      }
    };
    getAppointmentsCountData();
    fetchPatientCounts();
    fetchExpenseStats();
  }, [startDate, endDate, clinicId, error]);

  // --------------------------------------------------
  // Patient Stats
  // --------------------------------------------------
  const statsPatient = useMemo(
    () =>
      getPatientStats(
        patientStats,
        revenueStats.totalAppointments,
        revenueStats.revisited,
      ),
    [patientStats, revenueStats.totalAppointments, revenueStats.revisited],
  );

  // --------------------------------------------------
  // Revenue Stats
  // --------------------------------------------------

  const statsRevenue = useMemo(
    () => getRevenueStats(revenueStats),
    [revenueStats],
  );

  // --------------------------------------------------
  // Expense Stats
  // --------------------------------------------------

  const expenses = useMemo(
    () => getExpensesStats(expenseStats),
    [expenseStats],
  );

  // --------------------------------------------------
  // Chart Data
  // --------------------------------------------------
  useEffect(() => {
    const getChartData = async () => {
      try {
        const data = await getChartStats(
          chartStartDate,
          chartEndDate,
          clinicId,
        );
        setChartData(
          data?.map((item) => ({
            day: item.appointment_date ?? "",
            visitors: item.total_count ?? 0,
          })) ?? [],
        );
      } catch (err) {
        console.error("Error fetching chart data:", err);
      }
    };
    getChartData();
  }, [chartStartDate, chartEndDate, clinicId]);
  return (
    <div className="min-h-screen bg-gray-500 p-8">
      <h1 className="mt-11 mb-6 text-3xl font-bold text-yellow-400">
        Clinic Dashboard
      </h1>

      {/* Date Filters */}
      <div className="flex flex-col items-center gap-4 p-4 md:flex-row">
        {/* Start Date */}
        <div className="flex flex-col">
          <label
            htmlFor="start-date"
            className="mb-1 text-sm font-semibold text-yellow-400"
          >
            Start Date
          </label>

          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            max={today}
            className="rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col">
          <label
            htmlFor="end-date"
            className="mb-1 text-sm font-semibold text-yellow-400"
          >
            End Date
          </label>

          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            min={startDate}
            max={today}
            className="rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Time Period Buttons */}
      <div className="mb-6 ml-4 flex gap-2">
        <button
          type="button"
          className={`rounded-xl px-4 py-2 text-sm ${
            timePeriod === "today"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-black"
          }`}
          onClick={() => handleTimePeriodChange("today")}
        >
          Today
        </button>

        <button
          type="button"
          className={`rounded-xl px-4 py-2 text-sm ${
            timePeriod === "week"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-black"
          }`}
          onClick={() => handleTimePeriodChange("week")}
        >
          Past Week
        </button>

        <button
          type="button"
          className={`rounded-xl px-4 py-2 text-sm ${
            timePeriod === "month"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-black"
          }`}
          onClick={() => handleTimePeriodChange("month")}
        >
          This Month
        </button>
        <button
          type="button"
          className={`rounded-xl px-4 py-2 text-sm ${
            timePeriod === "month"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-black"
          }`}
          onClick={() => handleTimePeriodChange("year")}
        >
          This Year
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mb-4 rounded-lg bg-blue-100 p-3 text-blue-700">
          Loading dashboard data...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      {/* Patient Stats */}
      <DashboardStatsGrid stats={statsPatient} bgColor="bg-[#e3f6f5]" />

      {/* Revenue Stats */}
      <DashboardStatsGrid stats={statsRevenue} bgColor="bg-[#fcffc1]" />

      {/* Expense Stats */}
      <DashboardStatsGrid stats={expenses} bgColor="bg-[#f3d7ca]" />

      {/* Analytics Chart */}
      <DashboardChart
        chartData={chartData}
        period={chartPeriod}
        setPeriod={setChartPeriod}
      />
    </div>
  );
};

export default Dashboard;
