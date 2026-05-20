import React, { useState, useEffect } from "react";
import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";
import { salaryPageFields } from "../../Constants/constantUtil";
import AtomInput from "../../components/Atom/AtomInput";
import Store from "../../store/store";

import { getEmployeeAndSalary } from "../../SupaBase/Employee";
const Salary = () => {
  const clinic_id = Store((state) => state.clinicId);

  const [salaryData, setSalaryData] = useState([]);
  const [addNewSalary, setAddNewSalary] = useState(false);
  const [error, setError] = useState("");
  // Fetching salary data from a mock API
  const [data, setData] = useState({
    employee_fname: "",
    employee_lname: "",
    salary_gross: "",
    salary_deduction: "",
    salary_net: "",
  });

  useEffect(() => {
    const netSalary = Number(data.salary_gross) - Number(data.salary_deduction);
    setData((prevData) => ({ ...prevData, salary_net: String(netSalary) }));
  }, [data.salary_gross, data.salary_deduction]);

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
  };
  useEffect(() => {
    const callApi = async () => {
      const { data, error } = await getEmployeeAndSalary(clinic_id);
      if (error) {
        setError("Somthing went wrong try again," + error);
        return;
      }
      if (!data) {
        setError("No record found.");
        return;
      }
      setSalaryData(data);
    };
    if (clinic_id) callApi();
  }, [clinic_id]);
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center bg-white py-6 flex-col gap-7 px-2">
      <AppointmentRouting pageName="MoreSalary" />
      <div className="w-full md:max-w-6xl bg-slate-700 p-3 rounded-lg shadow-lg space-y-6 justify-center">
        <h2 className="text-2xl font-semibold text-center text-yellow-400">
          Salary Page
        </h2>
        {/*!addNewSalary && (
          <button
            onClick={() => setAddNewSalary(true)}
            className={`md:px-6 sm: m-2 md:py-2 sm: px-4 sm: py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-gray-600 focus:ring-4 focus:ring-blue-300 font-semibold text-sm dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800 hover:font-bold border-2 border-gray-200 hover:text-white ${
              addNewSalary && "cursor-not-allowed"
            }`}
            disabled={addNewSalary}
          >
            Add New Data
          </button>
        )*/}

        {addNewSalary && (
          <>
            <div className="grid md:grid-cols-3 sm: grid-cols-2 gap-2 sm: m-2">
              {salaryPageFields.map((field) => (
                <div key={field.key}>
                  <AtomInput
                    label={field.label}
                    name={field.key}
                    placeholder={field.label}
                    value={data[field.key]}
                    onChange={
                      field.name === "NetSalary" ? () => {} : handleChange
                    }
                    type={field.type}
                    options={field.options}
                    required={field.required}
                    disableInput={field.key === "salary_net"}
                    setError={() => {}}
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className={`md:px-6 md:py-2 sm: px-4 sm: py-2 sm: m-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-gray-600 focus:ring-4 focus:ring-blue-300 font-semibold text-sm dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800 hover:font-bold border-2 border-gray-200 hover:text-white
              }`}
            >
              Save details
            </button>
          </>
        )}
        <div className="overflow-x-auto">
          <table className="w-full mt-4 border-collapse border border-gray-900 p-2 ">
            <thead>
              <tr className="bg-gray-200 ">
                <th className="border p-2 border-gray-900 w-[20px]">S.No.</th>
                {salaryPageFields.map((col) => (
                  <th key={col.key} className="border p-2 border-gray-900">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            {salaryData.length > 0 && (
              <tbody>
                {salaryData.map((data, index) => (
                  <tr
                    key={data.employee_fname}
                    className="text-center bg-gray-100 hover:bg-gray-900 hover:text-white cursor-pointer"
                  >
                    <td className="border p-2 border-gray-900 w-[20px]">
                      {index + 1}
                    </td>
                    <td className="border p-2 border-gray-900 w-[20px]">
                      {data.employee_fname}
                    </td>
                    <td className="border p-2 border-gray-900">
                      {data.employee_lname}
                    </td>
                    <td className="border p-2 border-gray-900 w-[20px]">
                      {data.salary_gross || 0}
                    </td>
                    <td className="border p-2 border-gray-900 w-14">
                      {data.salary_deduction || 0}
                    </td>
                    <td className="border p-2 border-gray-900 w-14">
                      {data.salary_tax || 0}
                    </td>
                    <td className="border p-2 border-gray-900 w-[20px]">
                      {data.salary_net || 0}
                    </td>
                    <td className="border p-2 border-gray-900 w-[20px]">
                      {data.salary_payment_mode || "NA"}
                    </td>
                    <td className="border p-2 border-gray-900 w-[20px]">
                      {data.salary_upi_id || "NA"}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Salary;
