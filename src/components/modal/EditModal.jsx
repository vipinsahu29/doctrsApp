import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import AtomInput from "../Atom/AtomInput";
import PropTypes from "prop-types";
import { validateEmail, validateMobile } from "../../utility/util";
import { staffDetailsFields } from "../../Constants/constantUtil";
const EditModal = ({
  data,
  isOpen,
  pageTitle,
  onClose,
  onSave,
  errorMessage,
}) => {
  const [formData, setFormData] = React.useState(data);
  const [error, setError] = React.useState(errorMessage || "");
  const [isMobileValid, setIsMobileValid] = React.useState(true);
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  const handleChange = (e) => {
    if (e.target.name === "mobile") {
      setIsMobileValid(validateMobile(e.target.value));
    }
    if (e.target.name === "email") {
      setIsValidEmail(validateEmail(e.target.value));
    }
    const updatedFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    if (
      e.target.name === "salary_gross" ||
      e.target.name === "salary_deduction" ||
      e.target.name === "salary_tax"
    ) {
      const gross = Number(updatedFormData.salary_gross) || 0;
      const deduction = Number(updatedFormData.salary_deduction) || 0;
      const tax = Number(updatedFormData.salary_tax) || 0;
      updatedFormData.salary_net = gross - deduction - tax;
      if (updatedFormData.salary_net < 0) {
        updatedFormData.salary_net = 0;
        setError("Net salary cannot be negative. Please check the gross salary, deduction, and tax values.");
      }
      else {
        setError("");
      }
    }
    // Update state once
    setFormData(updatedFormData);
  };

  if (!isMobileValid) {
    setError("Please enter a valid mobile number.");
  } else if (!isValidEmail) {
    setError("Please enter a valid email address.");
  }
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10 ">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-300/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto top-[20px]">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative md:bottom-0 sm: bottom-[73px] transform overflow-hidden rounded-lg bg-gray-700 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg md:max-w-5xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <DialogTitle as="h3" className="text-lg text-white font-bold">
                {pageTitle}
              </DialogTitle>
              <form
                onSubmit={onSave}
                className="grid grid-cols-2 gap-4  mt-4 font-black"
              >
                {/* First Name */}
                {staffDetailsFields.map((field) => (
                  <div key={field.key}>
                    <AtomInput
                      label={field.label}
                      name={field.key}
                      placeholder={field.label}
                      value={formData[field.key]}
                      onChange={handleChange}
                      type={field.type}
                      options={field.options}
                      required={field.required}
                      setError={setError}
                      disableInput={field.disabled}
                    />
                  </div>
                ))}
              </form>
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  onClick={() => onSave(formData)}
                  className={`w-44 mt-4 p-2 bg-green-600 text-white rounded hover:bg-green-700 ${
                    error.length > 0 && "cursor-not-allowed"
                  }`}
                  disabled={error.length > 0}
                >
                  Save details
                </button>
                <button
                  onClick={onClose}
                  className={`w-44 mt-4 p-2 bg-red-600 text-white rounded hover:bg-red-700 ${
                    error.length > 0 && "cursor-not-allowed"
                  }`}
                  disabled={error.length > 0}
                >
                  Cancel
                </button>
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default EditModal;

EditModal.defaultProps = {
  pageTitle: "Edit Details",
};
EditModal.propTypes = {
  data: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  pageTitle: PropTypes.string,
  errorMessage: PropTypes.string,
};
