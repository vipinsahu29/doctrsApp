import React from "react";
import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";
const AppointmentsList = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-6 flex-col gap-12">
      <AppointmentRouting pageName="Appointment"/>

      <div className="w-full max-w-3xl bg-white-700 p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center text-black-50">
          Appointment List
        </h2>
        <table className="table-auto">
          <thead>
            <tr>
              <th>Song</th>
              <th>Artist</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
            <tr>
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsList;
