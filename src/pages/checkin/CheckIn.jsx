import React from "react";
import { useLocation } from "react-router-dom";
import { calculateExperience } from "../../utility/util";
import { checkInFields } from "../../Constants/checkinPageFields";
import CheckInMiddlePart from "./CheckInMiddlePart";
import CheckInMedecine from "./CheckInMedecine";
import CheckinBottomSection from "./CheckinBottomSection";
const CheckIn = () => {
  const location = useLocation();
  const checkinData = location.state || {};
  console.log(checkinData);
  return (
    <div className="min-h-screen flex items-center mt-16 bg-white py-6 flex-col gap-7">
      <div className="w-full max-w-7xl bg-slate-700 p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center text-white">
          Checkin
        </h2>
        <div className="grid md:grid-cols-4 sm: grid-cols-2 md:gap-4 sm: gap-3">
          {checkInFields.map((items) => (
            <div className="flex" key={items.id}>
              <label
                htmlFor={items.value}
                className="text-sm font-medium text-white"
              >
                {items.lable}
              </label>
              <h3
                className="text-sm font-small text-white"
                id={items.value}
                name={items.value}
              >
                {" "}
                &nbsp;
                {items.lable === "Name:"
                  ? checkinData[0][items.value] + " " + checkinData[0].LastName
                  : items.lable === "Age:"
                  ? calculateExperience(checkinData[0][items.value])
                  : checkinData[0][items.value]}
              </h3>
            </div>
          ))}
        </div>
      </div>
      <CheckInMiddlePart/>
      <CheckInMedecine/>
      <CheckinBottomSection/>
    </div>
  );
};

export default CheckIn;
