import React from "react";
import { Link } from "react-router-dom";
const AppointmentRouting = () => {
  return (
    <div>
      <Link
        to="/book_appointment"
        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 m-10 focus:ring-4 focus:ring-blue-300 font-medium  text-sm  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Book Appointment
      </Link>
      <Link
        to="/appointment_list"
        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 m-10 focus:ring-4 focus:ring-blue-300 font-medium  text-sm  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Appointment List
      </Link>
    </div>
  );
};

export default AppointmentRouting;
