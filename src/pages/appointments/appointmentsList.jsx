import React from "react";
import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";
const AppointmentsList = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-6 flex-col gap-12">
      <AppointmentRouting/>

      <div className="w-full max-w-3xl bg-slate-700 p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center text-white">
          Appointment List
        </h2>
      </div>
    </div>
  );
};

export default AppointmentsList;
