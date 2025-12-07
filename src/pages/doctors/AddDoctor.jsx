import { useState } from "react";
import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";
import { validateEmail, validateMobile } from "../../utility/util";
import Store from "../../store/store";

import { insertDoctor } from "../../SupaBase/DoctorsApi";
export default function AddDoctor() {
  const clinic_id = Store.getState().clinicId;

  const [isMobileValid, setIsMobileValid] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Mobile1: "",
    Mobile2: "",
    Email: "",
    DOB: "",
    Qualification: "",
    Collage: "",
    Univercity: "",
    CareerStartDate: "",
    GraduatedDate: "",
    Gender: "",
    Specialization: "",
    Shifts: [
      { Days: [], StartTime: "", EndTime: "" },
      { Days: [], StartTime: "", EndTime: "" },
      { Days: [], StartTime: "", EndTime: "" },
    ],
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date().toISOString().split("T")[0];
  console.log("Docters data-->", formData);
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle mobile and email validation separately
    if (name === "Mobile1" || name === "Mobile2") {
      setIsMobileValid(validateMobile(value));
    }
    if (name === "Email") {
      setIsValidEmail(validateEmail(value));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const insertDocterData = async () => {
    try {
      const { data, error } = await insertDoctor({
        clinicId: clinic_id,
        name: formData.FirstName + " " + formData.LastName,
        mobile1: formData.Mobile1,
        mobile2: formData.Mobile2,
        email: formData.Email,
        dob: formData.DOB,
        qualification: formData.Qualification,
        collage: formData.Collage,
        univercity: formData.Univercity,
        careerstartdate: formData.CareerStartDate,
        graduateddate: formData.GraduatedDate,
        shift: formData.Shifts,
        gender: formData.Gender,
      });
      if (error) {
        console.log("Not able to insert Record");
      }
      if (data) {
        console.log("Insert successful.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleShiftChange = (shiftIndex, field, value) => {
    const updatedShifts = [...formData.Shifts];
    updatedShifts[shiftIndex][field] = value;
    setFormData((prevData) => ({ ...prevData, Shifts: updatedShifts }));
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
    setFormData((prevData) => ({ ...prevData, Shifts: updatedShifts }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission
    insertDocterData();
    // Validate mobile and email before submitting
    if (!isMobileValid || !isValidEmail) {
      return; // Prevent form submission if validation fails
    }
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
              htmlFor="FirstName"
              className="block text-sm font-medium text-white"
            >
              First Name
            </label>
            <input
              type="text"
              name="FirstName"
              placeholder="First Name"
              value={formData.FirstName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            />
          </div>
          {/* Last Name */}
          <div>
            <label
              htmlFor="LastName"
              className="block text-sm font-medium text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              name="LastName"
              placeholder="Last Name"
              value={formData.LastName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            />
          </div>
          {/* Mobile */}
          <div>
            <label
              htmlFor="Mobile1"
              className="block text-sm font-medium text-white"
            >
              Primary mobile
            </label>
            <input
              type="tel"
              name="Mobile1"
              placeholder="Mobile"
              value={formData.Mobile1}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
              maxLength="10"
            />
            {!isMobileValid && (
              <h3 className="text-red-600">
                Please enter a valid mobile number.
              </h3>
            )}
          </div>
          <div>
            <label
              htmlFor="Mobile2"
              className="block text-sm font-medium text-white"
            >
              Secondary mobile
            </label>
            <input
              type="tel"
              name="Mobile2"
              placeholder="Mobile"
              value={formData.Mobile2}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
              maxLength="10"
            />
            {!isMobileValid && (
              <h3 className="text-red-600">
                Please enter a valid mobile number.
              </h3>
            )}
          </div>
          {/* Email */}
          <div>
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="Email"
              placeholder="Email"
              value={formData.Email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            />
            {!isValidEmail && (
              <h3 className="text-red-600">Please enter a valid email.</h3>
            )}
          </div>
          {/* DOB */}
          <div>
            <label
              htmlFor="DOB"
              className="block text-sm font-medium text-white"
            >
              DOB
            </label>
            <input
              type="date"
              name="DOB"
              value={formData.DOB}
              max={today}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            />
          </div>
          {/* Qualification */}
          <div>
            <label
              htmlFor="Qualification"
              className="block text-sm font-medium text-white"
            >
              Qualification
            </label>
            <input
              type="text"
              name="Qualification"
              placeholder="Qualification"
              value={formData.Qualification}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            />
          </div>
          {/* Specialization */}
          <div>
            <label
              htmlFor="Specialization"
              className="block text-sm font-medium text-white"
            >
              Specialization
            </label>
            <input
              type="text"
              name="Specialization"
              placeholder="Specialization"
              value={formData.Specialization}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            />
          </div>
          {/* Univercity */}
          <div>
            <label
              htmlFor="Univercity"
              className="block text-sm font-medium text-white"
            >
              Univercity
            </label>
            <input
              type="text"
              name="Univercity"
              placeholder="Univercity"
              value={formData?.Univercity}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            />
          </div>
          {/* College */}
          <div>
            <label
              htmlFor="Collage"
              className="block text-sm font-medium text-white"
            >
              College
            </label>
            <input
              type="text"
              name="Collage"
              placeholder="Collage"
              value={formData?.Collage}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            />
          </div>
          {/* Career Start Date */}
          <div>
            <label
              htmlFor="CareerStartDate"
              className="block text-sm font-medium text-white"
            >
              Career Start Date
            </label>
            <input
              type="date"
              name="CareerStartDate"
              value={formData.CareerStartDate}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="GraduatedDate"
              className="block text-sm font-medium text-white"
            >
              Graduation End Date
            </label>
            <input
              type="date"
              name="GraduatedDate"
              value={formData.GraduatedDate}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            />
          </div>
          {/* Gender */}
          <div>
            <label
              htmlFor="Gender"
              className="block text-sm font-medium text-white"
            >
              Gender
            </label>
            <select
              name="Gender"
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

        {/* Submit Button Handle*/}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full mt-4 p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Save details
        </button>
      </div>
    </div>
  );
}
