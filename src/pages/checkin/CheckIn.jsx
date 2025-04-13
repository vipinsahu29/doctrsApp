import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { calculateExperience } from "../../utility/util";
import { checkInFields } from "../../Constants/checkinPageFields";
import CheckInMiddlePart from "./CheckInMiddlePart";
import CheckInMedecine from "./CheckInMedecine";
import CheckinBottomSection from "./CheckinBottomSection";
import PrintPrescription from "./PrintPrescription";
import { useReactToPrint } from "react-to-print";
const CheckIn = () => {
  const location = useLocation();
  const checkinData = location.state || {};
  const componentRef = useRef();
  const printData = {
    ...checkinData
  };
  const reactToPrintFn = useReactToPrint({
    contentRef: componentRef,
  });
  return (
    <div className="min-h-screen flex items-center mt-16 bg-gray-100 py-6 flex-col gap-7">
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
      <CheckInMiddlePart />
      <CheckInMedecine />
      <CheckinBottomSection />

      <div className="print:hidden text-center">
        <button
          onClick={reactToPrintFn}
          className="md:px-6 md:py-2 sm:px-2 sm:py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 md:m-1 sm:m-1 focus:ring-4 focus:ring-blue-300 font-medium text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          aria-label="Print prescription"
        >
          Print Prescription
        </button>
      </div>
      <div className="hidden">
        <PrintPrescription ref={componentRef} data={printData} />
      </div>
    </div>
  );
};

export default CheckIn;
