import React, { useState } from "react";
import { validateEmail, validateMobile } from "../../utility/util";
import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";
import AtomInput from "../../components/Atom/AtomInput";
import { addPatientsInputFields } from "../../Constants/constantUtil";

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
              disabled={error.length > 0}
            >
              Save details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatients;
