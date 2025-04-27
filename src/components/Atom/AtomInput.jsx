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
  required=false,
  setError
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

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-white">
        {label}
      </label>
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
        />
      )}
      {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
    </div>
  );
};

AtomInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["text", "tel", "email", "number", "date", "password"])
    .isRequired,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.string),
};

export default AtomInput;
