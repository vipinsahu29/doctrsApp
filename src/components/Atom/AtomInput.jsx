import React, { useState } from "react";
import PropTypes from "prop-types";

const AtomInput = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  type,
  options,
  required = false,
  setError,
  disableInput = false
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleBlur = () => {
    if (required && value.trim() === "") {
      setErrorMessage(`${label} is required.`);
      setError(`${label} is required.`);
    } else {
      setErrorMessage("");
      setError("");
    }
  };
  const today = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format

  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-white">
          {label}
        </label>
      )}
      {type === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
          required={required}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md"
          required={required}
          max={today}
          disabled={disableInput}
        />
      )}
      {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
    </div>
  );
};

AtomInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["text", "tel", "email", "number", "date", "password"])
    .isRequired,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.string),
  setError: PropTypes.func,
  disableInput: PropTypes.bool
};

export default AtomInput;
