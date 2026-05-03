import React, { useState, useEffect } from "react";
import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";
import { expensesInputFields } from "../../Constants/constantUtil";
import AtomInput from "../../components/Atom/AtomInput";
import Store from "../../store/store";
import { createExpense, getExpenseDataByDate } from "../../SupaBase/ExpenseApi";
import { getDateRange } from "../../utility/util";
const Expenses = () => {
  const clinic_id = Store((state) => state.clinicId);
  const UID = Store((state) => state.UID);
  const [insertError, setInsertError] = useState("");
  const [inserted, setInserted] = useState(false);
  const [addNewSalary, setAddNewSalary] = useState(false);
  const [response, setResponse] = useState([]);
  const [filterType, setFilterType] = useState("1M"); // default
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState("");
  const [tableData, setTableData] = useState({
    Date: "",
    Description: "",
    Amount: "",
    PaymentMode: "",
  });
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (inserted) {
      setTimeout(() => {
        setInserted(false);
      }, 1500);
    }
  }, [inserted]);

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
  useEffect(() => {
    if (startDate && endDate && startDate > endDate) {
      setError("From date cannot be greater than To date");
    } else {
      setError("");
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const { startDate, endDate } = getDateRange("1M");
    setStartDate(startDate);
    setEndDate(endDate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission
    const newData = { user: UID, clinicId: clinic_id, ...tableData };
    if (!newData.clinicId || !newData?.Description || newData?.Date) return;
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
  const handleFilterChange = (value) => {
    setFilterType(value);

    if (value !== "CUSTOM") {
      const { startDate, endDate } = getDateRange(value);
      setStartDate(startDate);
      setEndDate(endDate);
    } else {
      // Reset for custom selection
      setStartDate(null);
      setEndDate(null);
    }
  };
  const handleCustomDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    if (!clinic_id || !startDate || !endDate || error) return;
    const apiData = async () => {
      const { data, errors } = await getExpenseDataByDate(
        clinic_id,
        startDate,
        endDate,
      );
      console.log("called", data, error, errors);
      if (!errors) {
        // cacheRef.current[cacheKey] = data
        setResponse(data);
        setError("");
      }
    };
    if (!error || inserted) {
      apiData();
      setInserted(false);
      setError("");
    }
  }, [clinic_id, startDate, endDate, error, inserted]);

  const totalExpenses = response?.reduce((sum, item) => {
    return sum + Number(item.amount);
  }, 0);
  const totalAmount = (amount) => {
    return new Intl.NumberFormat("en-IN").format(amount);
  };
  const filterSection = () => {
    return (
      <div className="ml-5">
        <label
          htmlFor={"filter"}
          className="block text-sm font-medium text-white"
        >
          {"Filter"}
        </label>
        <select
          id="filter"
          onChange={(e) => handleFilterChange(e.target.value)}
          className="mt-1 block w-[160] px-3 py-2 border border-gray-900 rounded-md"
          value={filterType}
        >
          <option value="1W">1 Week</option>
          <option value="1M">1 Month</option>
          <option value="1Y">1 Year</option>
          <option value="CUSTOM">Custom Date</option>
        </select>
        <p className="block text-sm font-medium text-white mt-4">
          Total- {totalAmount(totalExpenses)}
        </p>
        {filterType === "CUSTOM" && (
          <div className="flex flex-col md:flex-row md:gap-8 sm: gap-2 mt-4">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-white"
              >
                start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                max={today} // Prevent past dates
                // value={startDate}
                onChange={(e) =>
                  handleCustomDateChange(new Date(e.target.value), endDate)
                }
                className="mt-1 block w-[200px] px-2 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-white"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                max={today} // Prevent past dates
                // value={endDate}
                onChange={(e) =>
                  handleCustomDateChange(startDate, new Date(e.target.value))
                }
                className="mt-1 block w-[200px] px-2 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        )}
        {error && <p>Select the valid date</p>}
      </div>
    );
  };
  return (
    <div className="min-h-screen w-auto flex items-center bg-gray-300 flex-col gap-7 mt-4 px-3">
      <AppointmentRouting pageName="MoreSalary" />
      <div className="pb-10 w-full md:max-w-5xl  bg-slate-700 rounded-lg shadow-lg space-y-6 px-1">
        <h2 className="text-2xl font-semibold text-center text-yellow-400 pt-6">
          Expence Page
        </h2>
        {!addNewSalary && (
          <button
            onClick={() => setAddNewSalary(true)}
            className={`md:px-6 md:py-2 ml-4 sm: px-4 sm: py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-gray-600 focus:ring-4 focus:ring-blue-300 font-semibold text-sm dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800 hover:font-bold border-2 border-gray-200 hover:text-white ${
              addNewSalary && "cursor-not-allowed"
            }`}
            disabled={addNewSalary}
          >
            Add New Expense
          </button>
        )}
        {addNewSalary && (
          <>
            <div className="grid md:ml-4 md:grid-cols-3 sm: grid-cols-2 gap-2">
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
              className={`md:px-6 md:py-2 md:ml-4 sm: px-4 sm: py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-green-600 focus:ring-4 focus:ring-blue-300 font-semibold text-sm dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800 hover:font-bold border-2 border-gray-200 hover:text-white ${
                disabled && "cursor-not-allowed"
              }`}
              disabled={disabled}
            >
              Save details
            </button>
            {addNewSalary && (
              <button
                onClick={() => setAddNewSalary(false)}
                className={`md:px-6 md:py-2 ml-4 sm: px-4 sm: py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-red-600 focus:ring-4 focus:ring-blue-300 font-semibold text-sm dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800 hover:font-bold border-2 border-gray-200 hover:text-white 
                }`}
                disabled={!addNewSalary}
              >
                Cancel
              </button>
            )}
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
        <div className="overflow-x-auto">
          {filterSection()}
          <table className="w-full mt-4 border-collapse border border-gray-900 p-2 pb-10">
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
                  <tr
                    key={data.description}
                    className="text-center bg-gray-100"
                  >
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
    </div>
  );
};

export default Expenses;
