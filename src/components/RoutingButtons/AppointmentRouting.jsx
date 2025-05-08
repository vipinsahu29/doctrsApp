import React from "react";
import { Link, useLocation  } from "react-router-dom";
import { navigation, moreNavigation } from "../../Constants/navbarOptions";
import PropTypes from "prop-types";

const AppointmentRouting = ({ pageName }) => {
  const {pathname} = useLocation();
  const navOptions = pageName.includes("More")
    ? moreNavigation.find((item) => item.name === pageName)
    : navigation.find((item) => item.name === pageName);

  if (!navOptions) {
    return null; // Return null if no matching navigation option is found
  }

  const navValues = navOptions.options;
  console.log(navValues,pathname);
  return (
    <div className="mt-16">
      {navValues.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`md:px-6 md:py-2 sm:px-2 sm:py-2 ${pathname === item.path ? "bg-yellow-400  text-black":  "bg-gray-600  text-white"} rounded-md hover:bg-yellow-400 md:m-10 sm:m-2 focus:ring-4 focus:ring-blue-300 font-semibold text-sm dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800 hover:font-bold border-2 border-gray-200 hover:text-gray-900`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

AppointmentRouting.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default AppointmentRouting;