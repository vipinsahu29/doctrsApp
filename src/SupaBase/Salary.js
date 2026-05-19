import { supabase } from "../supabaseClient";

export const updateSalary = async (id, salaryData, empId) => {
  if (!empId || !id) {
    return { data: null, error: "Employee ID and salary ID are required" };
  }
  const { data, error } = await supabase.rpc("update_salary", {
    ...salaryData
  });
  if (error) console.error(error);
  else console.log(data);
  return { data, error };
};

export const UpdateSalary = async (salaryId, salaryData, empId) => {
  const { data, error } = await updateSalary(salaryId, salaryData, empId);
  if (error) {
    console.error("Error updating salary:", error);
  } else {
    console.log("Salary updated successfully:", data);
  }
};
