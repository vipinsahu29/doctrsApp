import { useState } from "react";
import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";
import { validateEmail, validateMobile } from "../../utility/util";

export default function AddDoctor() {
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Mobile: "",
    Email: "",
    DOB: "",
    Qualification: "",
    Gender: "",
    Specialization: "",
    CareerStartDate: "",
    Shifts: [
      { Days: [], StartTime: "", EndTime: "" },
      { Days: [], StartTime: "", EndTime: "" },
      { Days: [], StartTime: "", EndTime: "" },
    ],
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    console.log("name-", e.target.name);
    if (e.target.name === "mobile") {
      setIsMobileValid(validateMobile(e.target.value));
    }
    if (e.target.name === "email") {
      setIsValidEmail(validateEmail(e.target.value));
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShiftChange = (shiftIndex, field, value) => {
    const updatedShifts = [...formData.Shifts];
    updatedShifts[shiftIndex][field] = value;
    setFormData({ ...formData, Shifts: updatedShifts });
  };

  const handleDayToggle = (shiftIndex, day) => {
    const updatedShifts = [...formData.Shifts];
    const dayExists = updatedShifts[shiftIndex].Days.includes(day);
    if (dayExists) {
      updatedShifts[shiftIndex].Days = updatedShifts[shiftIndex].Days.filter(
        (d) => d !== day
      );
    } else {
      updatedShifts[shiftIndex].Days.push(day);
    }
    setFormData({ ...formData, Shifts: updatedShifts });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-6 flex-col gap-7">
      <AppointmentRouting pageName="Doctors" />
      <div className="w-full max-w-3xl bg-slate-700 p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center text-white">
          Fill doctors details
        </h2>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-white"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.FirstName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            />
          </div>
          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.LastName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            />
          </div>
          {/* Mobile */}
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-white"
            >
              Mobile
            </label>
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile"
              value={formData.Mobile}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
              maxLength="10"
            />
            {!isMobileValid && (
              <h3 className="text-red-600">
                Please enter valid mobile no.
              </h3>
            )}
          </div>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.Email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            />
            {!isValidEmail && (
              <h3 className="text-red-600">
                Please enter valid Email.
              </h3>
            )}
          </div>
          {/* DOB */}
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-white"
            >
              DOB
            </label>
            <input
              type="date"
              name="dob"
              value={formData.DOB}
              max={today}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            />
          </div>
          {/* Qualification */}
          <div>
            <label
              htmlFor="qualification"
              className="block text-sm font-medium text-white"
            >
              Qualification
            </label>
            <input
              type="text"
              name="qualification"
              placeholder="Qualification"
              value={formData.Qualification}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            />
          </div>
          {/* Specialization */}
          <div>
            <label
              htmlFor="specialization"
              className="block text-sm font-medium text-white"
            >
              Specialization
            </label>
            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={formData.Specialization}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            />
          </div>
          {/* Career Start Date */}
          <div>
            <label
              htmlFor="careerStartDate"
              className="block text-sm font-medium text-white"
            >
              Career Start Date
            </label>
            <input
              type="date"
              name="careerStartDate"
              value={formData.CareerStartDate}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            />
          </div>
          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-white"
            >
              Gender
            </label>
            <select
              name="gender"
              value={formData.Gender}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </form>

        {/* Shift Details */}
        {formData.Shifts.map((shift, index) => (
          <div key={index} className="mt-4 p-4 border rounded bg-gray-800">
            <h3 className="text-lg font-semibold text-white">
              Shift-{index + 1} Working Days
            </h3>
            <div className="flex space-x-2 mt-2 text-white">
              {daysOfWeek.map((day) => (
                <label key={day} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={shift.Days.includes(day)}
                    onChange={() => handleDayToggle(index, day)}
                    className="mr-1"
                  />
                  {day}
                </label>
              ))}
            </div>
            {/* Shift Timing */}
            <div className="flex mt-2 space-x-2">
              <input
                type="time"
                value={shift.StartTime}
                onChange={(e) =>
                  handleShiftChange(index, "StartTime", e.target.value)
                }
                className="p-2 border rounded bg-white text-black"
              />
              <span className="text-white mt-3">To</span>
              <input
                type="time"
                value={shift.EndTime}
                onChange={(e) =>
                  handleShiftChange(index, "EndTime", e.target.value)
                }
                className="p-2 border rounded bg-white text-black"
              />
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-4 p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Save details
        </button>
      </div>
    </div>
  );
}
