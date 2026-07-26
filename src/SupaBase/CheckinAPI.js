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

export const getCheckInItems = async(patient_id, clinic_id)=>{
  const {data, error} = await supabase.rpc("get_checkin_data", {
       p_patient_id: patient_id,
        p_clinic_id: clinic_id,
    });
  if (error) console.error(error);
  else console.log(data);
  return { data, error };
}