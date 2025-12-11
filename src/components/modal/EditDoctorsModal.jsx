"use client";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import PropTypes from "prop-types";
import { validateEmail, validateMobile } from "./../../utility/util";
EditDoctorsModal.propTypes = {
  isOpen: PropTypes.bool,
  doctor: PropTypes.object,
  onSave: PropTypes.func,
  onClose: PropTypes.func,
};
export default function EditDoctorsModal({ isOpen, doctor, onSave, onClose }) {
  const [formData, setFormData] = useState(doctor);
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const today = new Date().toISOString().split("T")[0];
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle mobile and email validation separately
    if (name === "mobile") {
      setIsMobileValid(validateMobile(value));
    }
    if (name === "email") {
      setIsValidEmail(validateEmail(value));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleShiftChange = (shiftIndex, field, value) => {
    const updatedShifts = [...formData.shift];
    updatedShifts[shiftIndex][field] = value;
    setFormData((prevData) => ({ ...prevData, shift: updatedShifts }));
  };

  const handleDayToggle = (shiftIndex, day) => {
    const updatedShifts = [...formData.shift];
    const dayExists = updatedShifts[shiftIndex].Days.includes(day);
    if (dayExists) {
      updatedShifts[shiftIndex].Days = updatedShifts[shiftIndex].Days.filter(
        (d) => d !== day
      );
    } else {
      updatedShifts[shiftIndex].Days.push(day);
    }
    setFormData((prevData) => ({ ...prevData, shift: updatedShifts }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isMobileValid || !isValidEmail) {
      console.warn("Please fix validation errors.");
      return; // Prevent form submission if validation fails
    }
    onSave(formData);
  };
  if (!isOpen) return null;
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10 ">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto top-[20px]">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative md:bottom-0 sm: bottom-[73px] transform overflow-hidden rounded-lg bg-gray-700 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg md:max-w-5xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-gray-200 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <DialogTitle
                as="h3"
                className="text-lg text-indigo-700 font-bold"
              >
                {"Edit Doctors Details"}
              </DialogTitle>
              <form onSubmit={handleSubmit}>
                <div className="grid sm: grid-cols-1 md:grid-cols-3 md:gap-4 sm: gap-2 pt-3">
                  <div className="flex flex-col">
                    <label className="mb-1" htmlFor="firstname">
                      Name:
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      value={formData.name}
                      placeholder="Full name"
                      onChange={handleChange}
                      className="bg-gray-50 border w-[250px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1" htmlFor="mobile1">
                      Mobile:
                    </label>
                    <input
                      type="text"
                      id="mobile1"
                      name="mobile1"
                      value={formData.mobile1}
                      placeholder="XXXXXXXXXXX"
                      onChange={handleChange}
                      maxLength="10"
                      className="bg-gray-50 border w-[250px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {!isMobileValid && (
                      <h3 className="text-red-600">
                        Please enter valid mobile no.
                      </h3>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1" htmlFor="mobile2">
                      Mobile2:
                    </label>
                    <input
                      type="text"
                      id="mobile2"
                      name="mobile2"
                      value={formData.mobile2}
                      placeholder="XXXXXXXXXXX"
                      onChange={handleChange}
                      maxLength="10"
                      className="bg-gray-50 border w-[250px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {!isMobileValid && (
                      <h3 className="text-red-600">
                        Please enter valid mobile no.
                      </h3>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1" htmlFor="gender">
                      Gender:
                    </label>
                    <select
                      name="gender"
                      id="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="bg-gray-50 border w-[250px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      className="bg-gray-50 border w-[250px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="john.doe@company.com"
                      required
                      onChange={handleChange}
                    />
                    {!isValidEmail && (
                      <h3 className="text-red-600">
                        Please enter valid Email.
                      </h3>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1" htmlFor="DOB">
                      Date of birth:
                    </label>
                    <input
                      id="DOB"
                      type="date"
                      name="DOB"
                      value={formData.dob}
                      max={today} // Prevent past dates
                      placeholder="mm-dd-yyyy"
                      onChange={handleChange}
                      className="bg-gray-50 border w-[250px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    {/* Qualification Field */}
                    <label
                      htmlFor="Qualification"
                      className="block text-sm font-medium text-black"
                    >
                      Qualification
                    </label>
                    <input
                      type="text"
                      name="Qualification"
                      placeholder="Qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    {/* Specialization Field */}
                    <label
                      htmlFor="Specialization"
                      className="block text-sm font-medium text-black"
                    >
                      Specialization
                    </label>
                    <input
                      type="text"
                      name="Specialization"
                      placeholder="Specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="CareerStartDate"
                      className="block text-sm font-medium text-black"
                    >
                      Career Start Date
                    </label>
                    <input
                      id="CareerStartDate"
                      type="date"
                      name="CareerStartDate"
                    //   placeholder="mm-dd-yyyy"
                      value={formData.careerStartDate}
                    //   onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
                    />
                  </div>
                  {formData.shift.map((shift, index) => (
                    <div
                      key={index}
                      className="mt-4 p-4 border rounded bg-gray-800"
                    >
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
                            handleShiftChange(
                              index,
                              "StartTime",
                              e.target.value
                            )
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
                </div>
              </form>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Close
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => onClose(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-green-700 sm:mt-0 sm:w-auto"
              >
                Save
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
