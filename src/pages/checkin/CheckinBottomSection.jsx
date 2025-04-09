import React, { useState } from "react";

const CheckinBottomSection = () => {
  const [advice, setAdvice] = useState("");
  return (
    <div className="w-full max-w-7xl bg-slate-200 p-6 rounded-lg shadow-lg space-y-6 mb-10">
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
      <h2>Diet:</h2>
      <h2>Follow-up Date:</h2>
    </div>
  );
};

export default CheckinBottomSection;
