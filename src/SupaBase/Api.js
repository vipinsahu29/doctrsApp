import { supabase } from "../supabaseClient";
import tableNames from "./tableName";

export const getExpenseData = async () => {
  let errorMessage = null;
  try {
    const { data, error, count, status, statusText } = await supabase
      .from(tableNames.Expense)
      .select("*", { count: "exact" });
    if (error) {
      errorMessage = `Error (${status} ${statusText}):, ${error.message}`;
      console.error(errorMessage);
      return { data: [], error: errorMessage, count: 0 };
    }
    console.log("api: ", data);

    return { data, errorMessage, count };
  } catch (err) {
    console.error("Unexpected error: ", err);
    return { data: [], error: "Unexpected error occurred", count: 0 };
  }
};
