import React, { useState } from "react";

// import medecineData from "../../Constants/indian_medicine_data.json";

import { timeOptions } from "../../Constants/constantUtil";
const CheckInMedecine = () => {
  const [medicineName, setMedicineName] = useState("");
  const [dose, setDose] = useState("");
  const [timeADay, setTimeADay] = useState(timeOptions[0].value);
  const [durationDays, setDurationDays] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [remark, setRemark] = useState("");

  // console.log(medecineData)
  const addMedicine = () => {
    if (!medicineName || !dose || !timeADay || !durationDays) {
      alert("Please fill all fields before adding!");
      return;
    }
    const newMedicine = { medicineName, dose, timeADay, durationDays, remark };
    setMedicines([...medicines, newMedicine]);

    // Clear input fields after adding
    setMedicineName("");
    setDose("");
    setTimeADay(timeOptions[0].value);
    setDurationDays("");
    setRemark("");
  };
  return (
    <div className="w-full max-w-7xl bg-slate-200 p-6 rounded-lg shadow-xl space-y-6 border border-slate-400">
      <div className="grid md:grid-cols-5 sm: grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="Medicine Name"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Dose"
          value={dose}
          onChange={(e) => setDose(e.target.value)}
          className="border p-2"
        />
        <select
          value={timeADay}
          onChange={(e) => setTimeADay(e.target.value)}
          className="border p-2"
        >
          {timeOptions.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Duration (Days)"
          value={durationDays}
          onChange={(e) => setDurationDays(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className="border p-2"
        />

        {/* Add Button */}
      </div>
      <button
        onClick={addMedicine}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-[300px]"
      >
        Add medicine
      </button>

      {/* Table */}

      <table className="w-full mt-4 border-collapse border border-gray-900">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-1 border-gray-900 w-[20px]">S.No.</th>
            <th className="border p-1 border-gray-900">Medicine Name</th>
            <th className="border p-1 border-gray-900 w-[20px]">
              Dose (ML/MG)
            </th>
            <th className="border p-1 border-gray-900">Times/Day</th>
            <th className="border p-1 border-gray-900 w-[20px]">
              Duration (Days)
            </th>
            <th className="border p-1 border-gray-900 w-1/6">Remark</th>
          </tr>
        </thead>
        {medicines.length > 0 && (
          <tbody>
            {medicines.map((medicine, index) => (
              <tr key={medicine.medicineName} className="text-center">
                <td className="border p-2 border-gray-900 w-[20px]">
                  {index + 1}
                </td>
                <td className="border p-2 border-gray-900">
                  {medicine.medicineName}
                </td>
                <td className="border p-2 border-gray-900 w-[20px]">
                  {medicine.dose}
                </td>
                <td className="border p-2 border-gray-900 w-14">
                  {medicine.timeADay}
                </td>
                <td className="border p-2 border-gray-900 w-[20px]">
                  {medicine.durationDays}
                </td>
                <td className="border p-2 border-gray-900 w-[20px]">
                  {medicine.remark}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default CheckInMedecine;
