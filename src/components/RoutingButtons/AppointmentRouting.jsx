import React from "react";
import { Link } from "react-router-dom";
import { navigation } from "../../Constants/navbarOptions";
import PropTypes from "prop-types";

const AppointmentRouting = ({ pageName }) => {
  const navOptions = navigation.filter((item) => item.name === pageName);
  if (navOptions.length === 0) {
    return;
  }
  const navValues = navOptions[0].options;
  return (
    <div>
      {navValues.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 m-10 focus:ring-4 focus:ring-blue-300 font-medium  text-sm  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};
AppointmentRouting.PropTypes = {
  pageName: PropTypes.string.isRequired,
};

export default AppointmentRouting;
