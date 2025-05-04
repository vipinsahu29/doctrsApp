import React from "react";
import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";

const Expenses = () => {
  return (
    <div className="min-h-screen flex items-center bg-white py-6 flex-col gap-7">
      <AppointmentRouting pageName="MoreSalary" />
      <div className="w-full max-w-3xl bg-slate-700 p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-center text-yellow-400">
          Expences Page
        </h2>
      </div>
    </div>
  );
};

export default Expenses;
