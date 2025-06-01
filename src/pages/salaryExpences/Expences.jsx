import React, { useState, useEffect } from "react";
import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";
import { expensesInputFields } from "../../Constants/constantUtil";
import AtomInput from "../../components/Atom/AtomInput";
import useGetApiData from "../../hooks/useGetApiData";
import Store from "../../store/store";
import { createExpense, getExpenseData } from "../../SupaBase/ExpenseApi";
const Expenses = () => {
  const clinic_id = Store((state) => state.clinicId);
  const UID = Store((state) => state.UID);
  const [insertError, setInsertError] = useState("");
  const [inserted, setInserted] = useState(false);
  const [addNewSalary, setAddNewSalary] = useState(false);
  const [response, setResponse] = useState([]);

  const { data,refetch } = useGetApiData(
    clinic_id,
    getExpenseData
  );

  useEffect(() => {
    if (data) {
      setResponse(data);
    }
  }, [data]);
  useEffect(() => {
    refetch();
    if (inserted) {
      setTimeout(() => {
        setInserted(false);
      }, 1500);
    }
  }, [inserted]);
  const [tableData, setTableData] = useState({
    Date: "",
    Description: "",
    Amount: "",
    PaymentMode: "",
  });

  const disabled =
    !tableData.Date ||
    !tableData.Description ||
    !tableData.Amount ||
    !tableData.PaymentMode;
  const handleChange = (e) => {
    e.preventDefault(); // Prevents the default form submission
    const { name, value } = e.target;

    setTableData({ ...tableData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission
    const newData = { user: UID, clinicId: clinic_id, ...tableData };

    const { data, error } = await createExpense({
      clinic_id: newData.clinicId,
      user: newData.user,
      expense_date: newData.Date,
      description: newData.Description,
      amount: newData.Amount,
      payment_mode: newData.PaymentMode,
    });

    if (error) {
      setInsertError(error.message);
      setInserted(false);
    }
    if (data.length > 0) {
      setInserted(true);
      setInsertError("");
    }

    // Log the form data
    setTableData({
      Date: "",
      Description: "",
      Amount: "",
      PaymentMode: "",
    });
    setAddNewSalary(false);
  };

  return (
    <div className="min-h-screen flex items-center bg-white py-6 flex-col gap-7">
      <AppointmentRouting pageName="MoreSalary" />
      <div className="md:w-full sm: w-auto md:max-w-3xl bg-slate-700 p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center text-yellow-400">
          Expence Page
        </h2>
        {!addNewSalary && (
          <button
            onClick={() => setAddNewSalary(true)}
            className={`md:px-6 md:py-2 sm: px-4 sm: py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-gray-600 focus:ring-4 focus:ring-blue-300 font-semibold text-sm dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800 hover:font-bold border-2 border-gray-200 hover:text-white ${
              addNewSalary && "cursor-not-allowed"
            }`}
            disabled={addNewSalary}
          >
            Add New Expense
          </button>
        )}
        {addNewSalary && (
          <>
            <div className="grid md:grid-cols-3 sm: grid-cols-2 gap-2">
              {expensesInputFields.map((field) => (
                <div key={field.name}>
                  <AtomInput
                    label={field.label}
                    name={field.name}
                    placeholder={field.label}
                    value={tableData[field.name]}
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
              className={`md:px-6 md:py-2 sm: px-4 sm: py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-gray-600 focus:ring-4 focus:ring-blue-300 font-semibold text-sm dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800 hover:font-bold border-2 border-gray-200 hover:text-white ${
                disabled && "cursor-not-allowed"
              }`}
              disabled={disabled}
            >
              Save details
            </button>
          </>
        )}
        {inserted && (
          <p className="text-green-500 text-center">
            Expense details added successfully!
          </p>
        )}
        {insertError && (
          <p className="text-red-500 text-center">Data not saved try again!</p>
        )}
        <table className="w-full mt-4 border-collapse border border-gray-900 p-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 border-gray-900 w-[20px]">S.No.</th>
              {expensesInputFields.map((col) => (
                <th key={col.name} className="border p-2 border-gray-900">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          {response?.length > 0 && (
            <tbody>
              {response.map((data, index) => (
                <tr key={data.description} className="text-center bg-gray-100">
                  <td className="border p-2 border-gray-900 w-[20px]">
                    {index + 1}
                  </td>
                  <td className="border p-2 border-gray-900 w-[130px]">
                    {data.expense_date}
                  </td>
                  <td className="border p-2 border-gray-900">
                    {data.description}
                  </td>
                  <td className="border p-2 border-gray-900 w-[20px]">
                    {data.amount}
                  </td>
                  <td className="border p-2 border-gray-900 w-17">
                    {data.payment_mode}
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

export default Expenses;
