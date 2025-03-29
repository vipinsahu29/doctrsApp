import React, { useState } from "react";
import { validateEmail, validateMobile } from "../../utility/util";
import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";

const AddStaff = () => {
  //! States
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Mobile: "",
    Email: "",
    DOB: "",
    Gender: "",
    Qualification: "",
    Specialization: "",
    Department: "",
    City: "",
    State: "",
    Country: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission
    if (!isMobileValid || !isValidEmail) {
      console.log("Please fix validation errors.");
      return; // Prevent form submission if validation fails
    }
    // Log the form data
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-6 flex-col gap-7">
      <AppointmentRouting pageName="MoreStaff" />
      <div className="w-full max-w-3xl bg-slate-700 p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center text-white">
          Fill Staff details
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
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
              htmlFor="lastName"
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
              htmlFor="mobile"
              className="block text-sm font-medium text-white"
            >
              Mobile
            </label>
            <input
              type="tel"
              name="Mobile"
              placeholder="Mobile"
              value={formData.Mobile}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
              maxLength="10"
            />
            {!isMobileValid && (
              <h3 className="text-red-600">Please enter valid mobile no.</h3>
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
              name="Email"
              placeholder="Email"
              value={formData.Email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            />
            {!isValidEmail && (
              <h3 className="text-red-600">Please enter valid Email.</h3>
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
              name="DOB"
              value={formData.DOB}
              max={today}
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
              name="Qualification"
              placeholder="Qualification"
              value={formData.Qualification}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            />
          </div>
          {/* Designation */}
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
          {/* Department */}
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-white"
            >
              Department
            </label>
            <select
              name="Department"
              value={formData.Department}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            >
              <option value="">Select Department</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Dentist">Dentist</option>
              <option value="Bones">Bones</option>
            </select>
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-white"
            >
              City
            </label>
            <input
              type="text"
              name="City"
              placeholder="City"
              value={formData.City}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            />
          </div>
          {/* State */}
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-white"
            >
              State
            </label>
            <input
              type="text"
              name="State"
              placeholder="State"
              value={formData.State}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            />
          </div>
          {/* Country */}
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-white"
            >
              Country
            </label>
            <input
              type="text"
              name="Country"
              placeholder="Country"
              value={formData.Country}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
            />
          </div>
        </form>

        {/* Submit Button */}
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
};

export default AddStaff;
