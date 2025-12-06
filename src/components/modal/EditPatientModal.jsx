"use client";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import PropTypes from "prop-types";
import {
  generateTimeSlots,
  validateEmail,
  validateMobile,
} from "./../../utility/util";
import { createAppt, updateAppointment } from "../../SupaBase/AppointmentAPI";
import Store from "../../store/store";
EditPatientModal.propTypes = {
  isOpen: PropTypes.bool,
  isNewAppointment: PropTypes.bool,
  patient: PropTypes.object,
  // onSave: PropTypes.func,
  onClose: PropTypes.func,
  isPatient: PropTypes.bool,
  onSave: PropTypes.func,
};
export default function EditPatientModal({
  isOpen,
  patient,
  onClose,
  isNewAppointment,
  isPatient,
  onSave,
}) {
  const clinic_id = Store.getState().clinicId;
  const [formData, setFormData] = useState({ ...patient });
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [PaymentMode, setPaymentMode] = useState(formData?.payment_mode);
  const [fee, setFee] = useState(formData?.fees);
  const today = new Date().toISOString().split("T")[0];

  const handleFnameChange = (e) => {
    setFormData({ ...formData, fname: e.target.value });
  };
  const handleLnameChange = (e) => {
    setFormData({ ...formData, lname: e.target.value });
  };
  const handleMobileChange = (e) => {
    setIsMobileValid(validateMobile(e.target.value));
    setFormData({ ...formData, mobile: e.target.value });
  };
  const handleGenderChange = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };
  const handleOccupationChange = (e) => {
    setFormData({ ...formData, occupation: e.target.value });
  };
  const handleBloodGroupChange = (e) => {
    setFormData({ ...formData, blood_group: e.target.value });
  };
  const handleDateChange = (e) => {
    setFormData({ ...formData, appointment_date: e.target.value });
  };
  const handleTimeChange = (e) => {
    setFormData({ ...formData, appointment_time: e.target.value });
  };
  const handleDobChange = (e) => {
    setFormData({ ...formData, dob: e.target.value });
  };
  const handleEmailChange = (e) => {
    setIsValidEmail(validateEmail(e.target.value));
    setFormData({ ...formData, email: e.target.value });
  };
  const handleWeightChange = (e) => {
    setFormData({ ...formData, weight: e.target.value });
  };
  const handleHeightChange = (e) => {
    setFormData({ ...formData, height: e.target.value });
  };
  const handleDoctorChange = (e) => {
    setFormData({ ...formData, drname: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSaveButton = async (e) => {
    e.preventDefault();
    if (
      isNewAppointment &&
      formData.appointment_date &&
      formData.appointment_time &&
      formData.drname
    ) {
      const { data } = await createAppt({
        clinic_id: clinic_id,
        patient_id: formData.patient_id,
        appointment_date: formData.appointment_date,
        appointment_time: formData.appointment_time,
        payment_mode: PaymentMode,
        fees: fee,
        dr_name: formData.drname,
        height: formData.height,
        weight: formData.weight,
      });
      if (data) {
        alert("Appointment booked successfully.");
        onClose(false);
      } else {
        alert("Failed to book appointment. Please try again.");
      }
    } else if (!isNewAppointment) {
      console.log("after update->", formData);
      const { data, error } = await updateAppointment({
        appointmentId: formData.appointment_id,
        clinicId: clinic_id,
        patientId: formData.patient_id,
        changes: {
          appointment_date: formData.appointment_date,
          appointment_time: formData.appointment_time,
          payment_mode: PaymentMode,
          fees: fee,
          dr_name: formData.drname,
          height: formData.height,
          weight: formData.weight,
        },
      });
      if (error) {
        console.alert("Error on update");
      }
      if (data) {
        onSave();
        onClose(false);
      }
      return;
    }
    // onClose(false);
  };
  const pageTitle = isNewAppointment
    ? "Book Appointment"
    : isPatient
    ? "Edit Patient Details"
    : "Edit Appointment Details";
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
                {pageTitle}
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
                      value={formData.fname}
                      placeholder="First name"
                      onChange={handleFnameChange}
                      className="bg-gray-50 border w-[250px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      disabled={isNewAppointment || !isPatient}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1" htmlFor="firstname">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      placeholder="Last name"
                      value={formData.lname}
                      onChange={handleLnameChange}
                      className="bg-gray-50 border w-[250px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      disabled={isNewAppointment || !isPatient}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1" htmlFor="mobile">
                      Mobile:
                    </label>
                    <input
                      type="text"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      placeholder="XXXXXXXXXXX"
                      onChange={handleMobileChange}
                      maxLength="10"
                      className="bg-gray-50 border w-[250px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      disabled={isNewAppointment || !isPatient}
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
                      onChange={handleGenderChange}
                      className="bg-gray-50 border w-[250px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      disabled={isNewAppointment || !isPatient}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1" htmlFor="blood_group">
                      Blood Group:
                    </label>
                    <input
                      type="text"
                      id="blood_group"
                      name="blood_group"
                      value={formData.blood_group}
                      placeholder="Blood group"
                      onChange={handleBloodGroupChange}
                      maxLength="10"
                      className="bg-gray-50 border w-[250px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      disabled={isNewAppointment || !isPatient}
                    />
                  </div>
                  {(isNewAppointment || (!isPatient && !isNewAppointment)) && (
                    <>
                      <div className="flex flex-col">
                        <label
                          className="mb-1 text-red-800"
                          htmlFor="appointmentDate"
                        >
                          Appointment Date:
                        </label>
                        <input
                          type="date"
                          name="appointment_date"
                          value={formData.appointment_date}
                          min={today} // Prevent past dates
                          placeholder="mm-dd--yyyy"
                          onChange={handleDateChange}
                          className="bg-gray-50 border w-[250px] border-green-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mb-1" htmlFor="time">
                          Time:
                        </label>
                        <select
                          name="time"
                          id="time"
                          value={formData.appointment_time.substring(0, 5)}
                          onChange={handleTimeChange}
                          className="bg-gray-50 border w-[250px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="">Select Time</option>
                          {generateTimeSlots().map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>{" "}
                    </>
                  )}
                  {!isNewAppointment && (
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
                        value={formData?.email}
                        className="bg-gray-50 border w-[250px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="john.doe@company.com"
                        required
                        onChange={handleEmailChange}
                        disabled={isNewAppointment || !isPatient}
                      />
                      {!isValidEmail && (
                        <h3 className="text-red-600">
                          Please enter valid Email.
                        </h3>
                      )}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <label className="mb-1" htmlFor="dob">
                      Date of birth:
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData?.dob}
                      max={today} // Prevent past dates
                      placeholder="mm-dd-yyyy"
                      onChange={handleDobChange}
                      className="bg-gray-50 border w-[250px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      disabled={isNewAppointment || !isPatient}
                    />
                  </div>
                  <div className="flex flex-col">
                    {/* Weight Field */}
                    <label className="block mb-4">
                      Weight (kg):
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="number"
                          name="weight"
                          value={formData?.weight}
                          min="1"
                          max="250"
                          onChange={handleWeightChange}
                          placeholder="Enter weight"
                          className="bg-gray-50 border w-1/2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          // disabled={isNewAppointment || !isPatient}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="flex flex-col">
                    {/* Height Field */}
                    <label className="block mb-4">
                      Height (CM):
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="number"
                          name="height"
                          value={formData?.height}
                          min="1"
                          max="250"
                          onChange={handleHeightChange}
                          placeholder="Enter height"
                          className="bg-gray-50 border w-1/2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          // disabled={isNewAppointment || !isPatient}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1" htmlFor="occupation">
                      Occupation:
                    </label>
                    <input
                      type="text"
                      id="occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleOccupationChange}
                      maxLength="10"
                      className="bg-gray-50 border w-[250px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      disabled={isNewAppointment || !isPatient}
                    />
                  </div>
                  {(isNewAppointment || (!isPatient && !isNewAppointment)) && (
                    <>
                      <div className="flex flex-col">
                        <label className="mb-1" htmlFor="doctor">
                          Doctor:
                        </label>
                        <input
                          type="text"
                          id="doctor"
                          name="doctorName"
                          value={formData?.drname}
                          onChange={handleDoctorChange}
                          maxLength="10"
                          className="bg-gray-50 border w-[250px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          disabled={isNewAppointment || !isPatient}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mb-1 text-red-600" htmlFor="doctor">
                          Payment Method:
                        </label>
                        <select
                          name="payment_mode"
                          id="payment_mode"
                          value={PaymentMode}
                          onChange={(e) => {
                            setPaymentMode(e.target.value);
                          }}
                          className="bg-gray-50 border w-[250px] border-gray-300 text-red-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="select_option">Select Option</option>
                          <option value="Pending">Pending</option>
                          <option value="UPI">UPI</option>
                          <option value="Cash">Cash</option>
                          <option value="Credit Card">Credit Card</option>
                          <option value="No Fee">No Fee</option>
                          <option value="Cancel">Cancel</option>
                        </select>
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="fee"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Total Fee
                        </label>
                        <input
                          type="number"
                          id="fee"
                          value={fee < 0 ? 0 : fee}
                          className="bg-gray-50 border w-[250px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          onChange={(e) =>
                            setFee(Math.max(0, Number(e.target.value)))
                          }
                          min="0"
                        />
                      </div>
                    </>
                  )}
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
                onClick={handleSaveButton}
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
