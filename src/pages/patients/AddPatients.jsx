import React, { useState } from "react";
import { validateEmail, validateMobile } from "../../utility/util";
import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";
import AtomInput from "../../components/Atom/AtomInput";

const AddPatients = () => {
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [error, setError] = useState("");
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
    PANCard: "",
    Adhar: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
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

  const inputFields = [
    { label: "First Name", name: "FirstName", type: "text", required: true },
    { label: "Last Name", name: "LastName", type: "text", required: true },
    { label: "Mobile", name: "Mobile", type: "tel", required: true },
    { label: "Email", name: "Email", type: "email", required: true },
    { label: "DOB", name: "DOB", type: "date", max: today, required: true },
    { label: "Gender", name: "Gender", type: "select", options: ["Male", "Female"], required: true },
    { label: "PAN Card", name: "PANCard", type: "text", required: true },
    { label: "Adhar number", name: "Adhar", type: "text", required: true },
    { label: "Qualification", name: "Qualification", type: "text", required: true },
    { label: "Specialization", name: "Specialization", type: "text", required: true },
    { label: "Department", name: "Department", type: "select", options: ["Orthopedics", "Dentist", "Bones"], required: true },
    { label: "City", name: "City", type: "text", required: true },
    { label: "State", name: "State", type: "text", required: true },
    { label: "Country", name: "Country", type: "text", required: true },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-6 flex-col gap-7">
      <AppointmentRouting pageName="Patients" />
      <div className="w-full max-w-3xl bg-slate-700 p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center text-white">
          Fill patient's details
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {inputFields.map((field) => (
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
          {/* Other fields */}
          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className={`w-full mt-4 p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 ${error.length > 0 && "cursor-not-allowed"}`}
            disabled={error.length > 0}
          >
            Save details
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPatients;