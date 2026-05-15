import { supabase } from "../supabaseClient";
export const createEmployee = async (empData) => {
  try {
    let { data, error } = await supabase.rpc("insert_employee", {
      p_adhar: empData.Adhar,
      p_city: empData.City,
      p_clinic_id: empData.clincId,
      p_department: empData.Department,
      p_dob: empData.DOB,
      p_email: empData.Email,
      p_fname: empData.FirstName,
      p_full_address: empData.Address,
      p_gender: empData.Gender,
      p_lname: empData.LastName,
      p_mobile: empData.Mobile,
      p_pan: empData.PANCard,
      p_qualification: empData.Qualification,
      p_specialization: empData.Specialization,
      p_date_of_joining: empData.JoiningDate,
    });
    if (error) console.error(error);
    else {
      createSalary({}, empData.clincId, data);
      console.log(data);
    }

    return { data, error };
  } catch (err) {
    console.log("failed to insert-", err);
    return { data: "failed to add", err };
  }
};

export const getEmployeeAndSalary = async (clinicId) => {
  if (!clinicId) {
    return { data: ["no data"], error: "Clinic id is missing" };
  }
  try {
    const { data, error } = await supabase.rpc(
      "get_employee_salary_by_clinic",
      {
        p_clinic_id: clinicId,
      },
    );
    if (error) {
      console.error(error);
      return { error };
    }
    return { data, error };
  } catch (err) {
    return { err };
  }
};

export const updateEmployee = async (clinicId, empData, empId) => {
  if (!empId || !clinicId) {
    return { data: null, error: "Employee ID and Clinic ID are required" };
  }
  const { data, error } = await supabase.rpc("update_employee", {
    p_clinic_id: clinicId,
    p_data: empData,
    p_emp_id: empId,
  });
  if (error) console.error(error);
  else console.log(data);
  return { data, error };
};

export const createSalary = async (salaryData, clinicId, empId) => {
  try {
    console.log("Creating salary with data:", salaryData, "clinicId:", clinicId, "empId:", empId);  
    let { data, error } = await supabase.rpc("insert_salary_data1", {
      p_bankdetails: salaryData?.BankDetails || {name: "", account_number: "", ifsc_code: ""},
      p_clinic_id: clinicId,
      p_deduction: salaryData?.Deduction || 0,
      p_emp_id: empId,
      p_gross_salary: salaryData?.GrossSalary || 0,
      p_net_salary: salaryData?.NetSalary || 0,
      p_payment_mode: salaryData?.PaymentMode || "",
      p_prev_salary: salaryData?.PreviousSalary || 0,
      p_tax: salaryData.Tax || 0,
      p_upi_id: salaryData.UPIId || "",
    });
    if (error) console.error(error);
    else console.log("response",data);

    return { data, error };
  } catch (err) {
    console.log("failed to insert-", err);
    return { data: "failed to add", err };
  }
};
