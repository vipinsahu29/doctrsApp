import React, { useState } from "react";

const CheckinBottomSection = () => {
  const [advice, setAdvice] = useState("");
  const [diet, setDiet] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const [followUpDate, setFollowupDate] = useState("");
  const handleDateChange = (e) => {
    setFollowupDate(e.target.value);
  };
  return (
    <div className="w-full max-w-7xl bg-slate-200 p-6 rounded-lg shadow-xl space-y-6 mb-2 border border-slate-400">
      <div>
        <label
          htmlFor="advice"
          className="block text-sm font-medium text-gray-900"
        >
          Advice
        </label>
        <textarea
          type="text"
          id="advice"
          name="advice"
          value={advice}
          onChange={(e) => setAdvice(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="diet"
          className="block text-sm font-medium text-gray-900"
        >
          Diet
        </label>
        <textarea
          type="text"
          id="diet"
          name="diet"
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-red-800" htmlFor="appointmentDate">
          Follow-up Date:
        </label>
        <input
          type="date"
          name="appointment_date"
          value={followUpDate}
          min={today} // Prevent past dates
          placeholder="mm-dd-yyyy"
          onChange={handleDateChange}
          className="bg-gray-50 border w-[150px] border-green-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default CheckinBottomSection;
