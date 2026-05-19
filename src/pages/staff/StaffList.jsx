import React, { useEffect, useState } from "react";
import { FaEdit, FaRegEye } from "react-icons/fa";
import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";
import { getEmployeeAndSalary, updateEmployee } from "../../SupaBase/Employee";
import Store from "../../store/store";
import { staffDetailsFields } from "../../Constants/constantUtil";
import ViewDetailModal from "../../components/modal/ViewDetailModal";
import EditModal from "../../components/modal/EditModal";
import { UpdateSalary } from "../../SupaBase/Salary";
const columns = [
  "No.",
  "Name",
  "Department",
  "Qualification",
  "Email",
  "Mobile",
  "Action",
];

const StaffList = () => {
  const clinic_id = Store((state) => state.clinicId);

  const [viewData, setViewData] = useState();
  const [empData, setEmpData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [viewDetails, setViewDetails] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [error, setError] = useState("");

  const handleViewDetails = (id) => {
    setViewDetails(true);
    setViewData(empData.filter((value) => value.employee_id === id));
  };

  const filteredData = empData.filter((item) => {
    if (!searchValue) return true; // If search value is empty, show all data
    return (
      item.employee_fname.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.employee_lname.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.employee_email.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.employee_mobile.toString().includes(searchValue)
    );
  });
  const handleEditDetails = (id) => {
    setIsEditOpen(true);
    setViewData(empData.filter((value) => value.employee_id === id));
  };

  const handleSearch = (e) => {
    setTimeout(() => {
      setSearchValue(e.target.value);
    }, 1000);
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
      setEmpData(data);
    };
    if (clinic_id || refetch) callApi();
  }, [clinic_id, refetch]);

  const updateEmployeeData = async (formdata, empId) => {
    const { data, error } = await updateEmployee(clinic_id, formdata, empId);
    if (error) {
      setError("Somthing went wrong try again," + error);
      return;
    }
    if (!data) {
      setError("No record found.");
      return;
    }
    setRefetch(true);
  };
  const handleUpdateEmployee = async (formData) => {
    if (!formData) {
      setError("Form data is missing.");
      return;
    }
    if (
      formData.employee_fname.trim() === "" ||
      formData.employee_lname.trim() === "" ||
      formData.employee_email.trim() === ""
    ) {
      setError("All fields are required.");
      return;
    }
    if (
      formData.employee_joiningdate &&
      formData.employee_lastdate &&
      new Date(formData.employee_joiningdate) >
        new Date(formData.employee_lastdate)
    ) {
      setError("Joining date cannot be greater than last work date.");
      return;
    }
    if (formData.employee_dob && new Date(formData.employee_dob) > new Date()) {
      setError("Date of birth cannot be in the future.");
      return;
    }
    const data = {
      fname: formData.employee_fname,
      lname: formData.employee_lname,
      department: formData.employee_department,
      specialization: formData.employee_specialization,
      qualification: formData.employee_qualification,
      email: formData.employee_email,
      mobile: formData.employee_mobile,
      adhar: formData.employee_aadhar,
      pan: formData.employee_pan,
      dob: formData.employee_dob || "1990-01-01",
      gender: formData.employee_gender,
      city: formData.employee_city,
      full_address: formData.employee_full_address || "NA",
      status: formData.employee_status,
      joiningdate: formData.employee_joiningdate || "2020-01-01",
      lastdate: formData.employee_lastdate || "2020-01-01",
    };
    const salaryData = {
      p_bank_details: { accountNo: "123456789", IFSC: "KKBK0001769" },
      p_clinic_id: clinic_id,
      p_deduction: formData.salary_deduction,
      p_emp_id: formData.employee_id,
      p_gross_salary: formData.salary_gross,
      p_id: formData.salary_id,
      p_net_salary: formData.salary_net,
      p_payment_mode: formData.salary_payment_mode,
      p_prev_salary: formData.prev_salary || 0,
      p_tax: formData.salary_tax,
      p_upi_id: formData.salary_upi_id,
    };
    setIsEditOpen(false);
    setViewData("");
    updateEmployeeData(data, viewData[0]?.employee_id);
    UpdateSalary(viewData[0].salary_id, salaryData, viewData[0]?.employee_id);
    setRefetch(false);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 py-6 flex-col gap-7">
      <AppointmentRouting pageName="MoreStaff" />
      <div className="flex flex-wrap w-full py-2 flex-col gap-7 items-center justify-center">
        <div className="w-full max-w-5xl bg-slate-700 p-6 rounded-lg shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold text-center text-white">
            Staffs List
          </h2>
          <input
            className="px-4 py-2 focus:border-[#030331] outline-none bg-[#efeff2] border border-slate-700 rounded-md text-[#0b0b0b]"
            type="text"
            placeholder="Search"
            onChange={handleSearch}
          />
          <div className="flex justify-center items-center">
            <div className=" overflow-x-auto min-h-auto pb-5">
              <table className="border-collapse border border-gray-400 w-full text-sm text-left text-[#d0d2d6]">
                <thead className="text-sm uppercase">
                  <tr className="bg-gray-800 text-center text-[#f7f8f9]">
                    {columns.map((item) => (
                      <th
                        scope="col"
                        className="py-3 px-4 border border-gray-300 text-yellow-400"
                        key={item}
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((d, i) => (
                    <tr
                      key={d.employee_id}
                      className="hover:bg-gray-900 cursor-pointer transition duration-200 hover:text-white"
                    >
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-300"
                      >
                        {i + 1}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-300"
                      >
                        {d.employee_fname + " " + d.employee_lname}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-300"
                      >
                        {d.employee_department}{" "}
                        {/* Assuming `Department` is in the data */}
                      </td>
                      {/* <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-300"
                      >
                        {d.employee_specialization}
                      </td>*/}
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-300"
                      >
                        {d.employee_qualification}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-300"
                      >
                        {d.employee_email}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-300"
                      >
                        {d.employee_mobile}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-300"
                      >
                        <div className="flex justify-start items-center gap-4">
                          <button
                            tabIndex={-1}
                            onClick={() => handleEditDetails(d.employee_id)}
                            className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 cursor-pointer"
                          >
                            <FaEdit color="black" />
                          </button>

                          <button
                            tabIndex={-1}
                            className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50 cursor-pointer"
                            onClick={() => handleViewDetails(d?.employee_id)}
                          >
                            <FaRegEye />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {viewDetails && (
          <ViewDetailModal
            isOpen={viewDetails}
            onClose={() => setViewDetails(false)}
            data={viewData[0] || []}
            title="Staff Details"
            fields={staffDetailsFields}
          />
        )}
        {isEditOpen && (
          <EditModal
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            data={viewData[0] || []}
            pageTitle="Edit Staff Details"
            onSave={handleUpdateEmployee}
            errorMessage={error}
          />
        )}
      </div>
    </div>
  );
};

export default StaffList;
