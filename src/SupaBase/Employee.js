import { supabase } from "../supabaseClient";
export const createEmployee = async (empData) => {
  console.log("API-", empData);
  try {
    let { data, error } = await supabase.rpc("insert_employee", {
      p_adhar: empData.Adhar,
      p_city: empData.State,
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
    });
    if (error) console.error(error);
    else console.log(data);

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
    const { data, error } = await supabase.rpc("get_employee_salary_by_clinic", {
      p_clinic_id: clinicId,
    });
    if (error) {
      console.error(error);
      return { error };
    }
    console.log("API-", data);
    return { data, error };
  } catch (err) {
    return { err };
  }
};

// export const getEmployeeAndSalary = async (clinicId) => {
//   // if (!startDate || !endDate) {
//   // const { startDate: p_startDate, endDate: p_endDate } = getDateRange("1M");
//   //   const { data, error } = await supabase.rpc("get_expenses", {
//   //     p_clinic_id: clinicId
//   //   });
//   //   return { data, error };
//   // }
//   const { data, error } = await supabase.rpc("get_employee", {
//     p_clinic_id: clinicId,
//   });
//   console.log("custom-", data, error,clinicId);
//   if (error) console.error(error);
//   else console.log(data);
//   return { data, error };
// };
