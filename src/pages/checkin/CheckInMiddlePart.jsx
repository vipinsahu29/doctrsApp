import React, { useState } from "react";
import symptomsData from "../../Constants/symptoms.json"

const CheckInMiddlePart = () => {
  const [symptoms, setSymptoms] = useState("");
  const [familyHistory, setFamiliyHistory] = useState("");
  const [suggestions, setSuggestions] = useState([]);
console.log(symptomsData.symptoms)
  return (
    <div className="w-full max-w-7xl bg-slate-200 p-6 rounded-lg shadow-lg space-y-6">
      <div>
        <label
          htmlFor="Symtoms"
          className="block text-sm font-medium text-gray-900"
        >
          Symtoms/History
        </label>
        <textarea
          type="text"
          id="Symptoms"
          name="Symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label
          htmlFor="FHistory"
          className="block text-sm font-medium text-gray-900"
        >
          Family History for any kind of illness
        </label>
        <textarea
          type="text"
          id="FHistory"
          name="FHistory"
          value={familyHistory}
          onChange={(e) => setFamiliyHistory(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default CheckInMiddlePart;
