import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { calculateExperience } from "../../utility/util";
import { checkInFields } from "../../Constants/checkinPageFields";
import CheckInMiddlePart from "./CheckInMiddlePart";
import CheckInMedecine from "./CheckInMedecine";
import CheckinBottomSection from "./CheckinBottomSection";
import PrintPrescription from "./PrintPrescription";
import { useReactToPrint } from "react-to-print";
import CheckInLabTest from "./CheckInLabTest";

const CheckIn = () => {
  const location = useLocation();
  const checkinData = location.state || {};
  const componentRef = useRef();
  const [familyHistory, setFamiliyHistory] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [advice, setAdvice] = useState("");
  const [diet, setDiet] = useState("");
  const [followUpDate, setFollowupDate] = useState("");
  const [selectedData, setSelectedData] = useState("");
  const printData = {
    ...checkinData,
    familyHistory: familyHistory,
    selectedSymptoms: selectedSymptoms,
    medicines: medicines,
    advice: advice,
    diet: diet,
    followUpDate: followUpDate,
    labTest: selectedData,
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
                {
                  items.lable === "Name:"
                  ? checkinData[0].fname + " " + checkinData[0].lname
                  : items.lable === "Age:"
                  ? calculateExperience(checkinData[0].dob)
                  : checkinData[0]?.[items?.value]}
              </h3>
            </div>
          ))}
        </div>
      </div>
      <CheckInMiddlePart
        familyHistory={familyHistory}
        setFamiliyHistory={setFamiliyHistory}
        selectedSymptoms={selectedSymptoms}
        setSelectedSymptoms={setSelectedSymptoms}
      />
      <CheckInMedecine medicines={medicines} setMedicines={setMedicines} />
      <CheckInLabTest
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />
      <CheckinBottomSection
        advice={advice}
        setAdvice={setAdvice}
        diet={diet}
        setDiet={setDiet}
        followUpDate={followUpDate}
        setFollowupDate={setFollowupDate}
      />

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
