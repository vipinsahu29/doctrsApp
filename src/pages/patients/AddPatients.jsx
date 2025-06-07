import React, { useState } from "react";
import { validateEmail, validateMobile } from "../../utility/util";
import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";
import AtomInput from "../../components/Atom/AtomInput";
import { addPatientsInputFields } from "../../Constants/constantUtil";
import { createPatient } from "./../../SupaBase/PatientAPI";
import Store from "./../../store/store";

const AddPatients = () => {
  const clinic_id = Store((state) => state.clinicId);
  const UID = Store((state) => state.UID);
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [insertedPatient, setInsertedPatient] = useState(false);
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Mobile: "",
    Email: "",
    DOB: "",
    Height: 0,
    Weight: 0,
    Gender: "",
    Occupation: "",
    LastVisit: "",
    City: "",
    State: "",
    Country: "",
    PANCard: "",
    Adhar: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "mobile") {
      setIsMobileValid(validateMobile(e.target.value));
    }
    if (e.target.name === "email") {
      setIsValidEmail(validateEmail(e.target.value));
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission
    if (!isMobileValid) {
      setError("Please enter valid mobile number");
      return; // Prevent form submission if validation fails
    }
    if (formData.Email.length > 0 && !isValidEmail) {
      setError("Please enter valid email address");
      return;
    }
    if (formData.FirstName.length < 2 || formData.LastName.length < 2) {
      setError("First name and Last name should be at least 2 characters long");
      return;
    }
    if (formData.Mobile.length < 10) {
      setError("Mobile number should be at least 10 digits long");
      return;
    }
    setLoading(true);
    setInsertedPatient(false);
    const { patient, patientDetails, error } = await createPatient(
      {
        fname: formData.FirstName,
        lname: formData.LastName,
        mobile: formData.Mobile,
        email: formData.Email,
        gender: formData.Gender,
        clinic_id: clinic_id,
      },
      {
        height: formData.Height,
        weight: formData.Weight,
        dob: formData.DOB,
        occupation: formData.Occupation,
        address: {
          city: formData.City,
          state: formData.State,
          country: formData.Country,
        },
        pan: formData.PANCard,
        adhar: formData.Adhar,
        clinic_id: clinic_id,
      }
    );
    console.log("pageData", formData);
    console.log(
      "Patient:",
      patient,
      "  Details:",
      patientDetails,
      "error",
      error,
      "clinic_id",
      clinic_id,
      "UID",
      UID
    );
    if (error) {
      setErrorMessage(error);
      setLoading(false);
      setInsertedPatient(false);
      setError("");
      return;
    }
    if (!patient || !patientDetails) {
      setErrorMessage("Failed to create patient. Please try again.");
      setLoading(false);
      setInsertedPatient(false);
      setError("");
      return;
    }
    setLoading(false);
    setError("");
    setErrorMessage("");
    setInsertedPatient(true);
    setFormData({
      FirstName: "",
      LastName: "",
      Mobile: "",
      Email: "",
      DOB: "",
      Height: 0,
      Weight: 0,
      Gender: "",
      Occupation: "",
      LastVisit: "",
      City: "",
      State: "",
      Country: "",
      PANCard: "",
      Adhar: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center  bg-white py-6 flex-col gap-7">
      <AppointmentRouting pageName="Patients" />
      <div className="w-full max-w-3xl bg-slate-700 p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center text-yellow-400">
          Fill patient's detail
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {addPatientsInputFields.map((field) => (
              <div key={field.name}>
                <AtomInput
                  label={field.label}
                  name={field.name}
                  placeholder={field.label}
                  value={formData[field.name]}
                  onChange={handleChange}
                  type={field.type}
                  options={field.options}
                  required={field.required}
                  setError={setError}
                />
              </div>
            ))}
          </div>
          {/* Other fields */}
          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              onClick={handleSubmit}
              className={`w-full mt-4 p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 ${
                error.length > 0 && "cursor-not-allowed"
              }`}
              disabled={error.length > 0 || loading}
            >
              {loading ? "Saving..." : "Save details"}
            </button>
          </div>
          {insertedPatient && (
            <h2 className="text-green-400 text-2xl my-10 text-center top-2">
              Patient details added successfully!
            </h2>
          )}
          {errorMessage && (
            <p className="text-red-600 text-center mb-4">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddPatients;
