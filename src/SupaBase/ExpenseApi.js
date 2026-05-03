import { supabase } from "../supabaseClient";
import { getDateRange } from "../utility/util";

export const createExpense = async (expenseData) => {
  try {
    const { data, error } = await supabase
      .from("expense")
      .insert(expenseData)
      .select();

    if (error) {
      console.error("Error creating expense:", error.message);
      return { error: error.message };
    }
    return { data };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { error: "An unexpected error occurred." };
  }
};

export const getExpenseData = async (clinic_id) => {
  let errorMessage = null;
  try {
    const { data, error, count, status, statusText } = await supabase
      .from("expense")
      .select("*", { count: "exact" })
      .eq("clinic_id", clinic_id)
      .order("expense_date", { ascending: false });

    if (error) {
      errorMessage = `Error (${status} ${statusText}):, ${error.message}`;
      console.error(errorMessage);
      return { data: [], error: errorMessage, count: 0 };
    }

    return { data, errorMessage, count };
  } catch (err) {
    console.error("Unexpected error: ", err);
    return { data: [], error: "Unexpected error occurred", count: 0 };
  }
};

export const getExpenseDataByDate = async (clinicId, startDate, endDate) => {
  if (!startDate || !endDate) {
    const { startDate: p_startDate, endDate: p_endDate } = getDateRange("1M");
    const { data, error } = await supabase.rpc("get_expenses", {
      p_clinic_id: clinicId,
      p_date1: p_startDate,
      p_date2: p_endDate,
    });
    return { data, error };
  }
  const { data, error } = await supabase.rpc("get_expenses", {
     p_clinic_id: clinicId,
      p_date1: startDate,
      p_date2: endDate,
  });
  console.log("custom-", data);
  if (error) console.error(error);
  else console.log(data);
  return { data, error };
};
