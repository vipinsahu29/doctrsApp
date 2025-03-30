import React from "react";
import { useLocation } from "react-router-dom";
const CheckIn = () => {
    const location = useLocation();
  const checkinData = location.state || {};
  console.log(checkinData)
  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-6 flex-col gap-7">
      <div className="w-full max-w-7xl bg-slate-700 p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center text-white">
          Checkin
        </h2>
        <div>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
