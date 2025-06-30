import { supabase } from "../supabaseClient";

export const createCheckin = async (checkinData) => {
  try {
    const { data, error } = await supabase.rpc("insert_checkin_data", checkinData);
    if (error) {
      console.error("Error creating checkin:", error.message);
      return { error: error.message };
    }
    if (!data || data.length === 0) {
      console.error("No data returned from checkin creation.");
      return { error: "No data returned from checkin creation." };
    }
    return { data };
  } catch (err) {
    console.error("Error creating checkin:", err);
    return { error: "An unexpected error occurred.", err };
  }
};
