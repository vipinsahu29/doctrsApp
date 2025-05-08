import React, { useState, useEffect } from "react";
import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";
import { salaryInputFields } from "../../Constants/constantUtil";
import AtomInput from "../../components/Atom/AtomInput";
const Salary = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [addNewSalary, setAddNewSalary] = useState(false);
  // Fetching salary data from a mock API
  const [data, setData] = useState({
    Name: "",
    Designation: "",
    BasicSalary: "",
    Deduction: "",
    NetSalary: "",
  });

  const disabled =
    !data.Name || !data.Designation || !data.BasicSalary || !data.Deduction;
  useEffect(() => {
    const netSalary = Number(data.BasicSalary) - Number(data.Deduction);
    setData((prevData) => ({ ...prevData, NetSalary: String(netSalary) }));
  }, [data.BasicSalary, data.Deduction]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission
    const newData = { ...data };
    setSalaryData([...salaryData, newData]);
    // Log the form data
    setData({
      Name: "",
      Designation: "",
      BasicSalary: "",
      Deduction: "",
      NetSalary: "",
    });
    setAddNewSalary(false);
    console.log("Form Submitted:", data, salaryData);
  };

  return (
    <div className="min-h-screen flex items-center bg-white py-6 flex-col gap-7">
      <AppointmentRouting pageName="MoreSalary" />
      <div className="md:w-full sm: w-auto md:max-w-3xl bg-slate-700 p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center text-yellow-400">
          Salary Page
        </h2>
        { ! addNewSalary &&
        <button
          onClick={() => setAddNewSalary(true)}
          className={`md:px-6 sm: m-2 md:py-2 sm: px-4 sm: py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-gray-600 focus:ring-4 focus:ring-blue-300 font-semibold text-sm dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800 hover:font-bold border-2 border-gray-200 hover:text-white ${
            addNewSalary && "cursor-not-allowed"
          }`}
          disabled={addNewSalary}
        >
          Add New Data
        </button>}
        {addNewSalary && (
          <>
            <div className="grid md:grid-cols-3 sm: grid-cols-2 gap-2 sm: m-2">
              {salaryInputFields.map((field) => (
                <div key={field.name}>
                  <AtomInput
                    label={field.label}
                    name={field.name}
                    placeholder={field.label}
                    value={data[field.name]}
                    onChange={
                      field.name === "NetSalary" ? () => {} : handleChange
                    }
                    type={field.type}
                    options={field.options}
                    required={field.required}
                    disableInput={field.name === "NetSalary"}
                    setError={() => {}}
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className={`md:px-6 md:py-2 sm: px-4 sm: py-2 sm: m-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-gray-600 focus:ring-4 focus:ring-blue-300 font-semibold text-sm dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800 hover:font-bold border-2 border-gray-200 hover:text-white ${
                disabled && "cursor-not-allowed"
              }`}
              disabled={disabled}
            >
              Save details
            </button>
          </>
        )}

        <table className="w-full mt-4 border-collapse border border-gray-900 p-2 ">
          <thead>
            <tr className="bg-gray-200 ">
              <th className="border p-2 border-gray-900 w-[20px]">S.No.</th>
              {salaryInputFields.map((col) => (
                <th key={col.name} className="border p-2 border-gray-900">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          {salaryData.length > 0 && (
            <tbody>
              {salaryData.map((data, index) => (
                <tr key={data.Name} className="text-center bg-gray-100">
                  <td className="border p-2 border-gray-900 w-[20px]">
                    {index + 1}
                  </td>
                  <td className="border p-2 border-gray-900 w-[20px]">
                    {data.Name}
                  </td>
                  <td className="border p-2 border-gray-900">
                    {data.Designation}
                  </td>
                  <td className="border p-2 border-gray-900 w-[20px]">
                    {data.BasicSalary}
                  </td>
                  <td className="border p-2 border-gray-900 w-14">
                    {data.Deduction}
                  </td>
                  <td className="border p-2 border-gray-900 w-[20px]">
                    {data.NetSalary}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Salary;
