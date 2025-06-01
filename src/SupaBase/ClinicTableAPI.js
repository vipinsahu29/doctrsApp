import { supabase } from "../supabaseClient";
import Store from '../store/store'
export const checkClinicExists = async (uuid) => {
  try {
    const { data, error } = await supabase
      .from("clinic")
      .select("*")
      .eq("UUID", uuid);

    if (error) {
      console.error("Error checking clinic existence:", error.message);
      return false;
    }
    Store.getState().setClinicId(data[0]?.clinic_id);
    return data.length > 0; // Returns true if clinic exists, false otherwise
  } catch (err) {
    console.error("Unexpected error:", err);
    return false;
  }
};
export const createClinic = async (clinicData, userData) => {
  try {
    const { data: clinic_data, error: clinic_error } = await supabase
      .from("clinic")
      .insert(clinicData)
      .select();

    if (clinic_error) {
      return { error: clinic_error.message };
    }
    const user_data = { ...userData };
    user_data.clinic_id = clinic_data[0].clinic_id;
    // Set the clinic_id in userData
    const { data: userc_data, error: user_error } = await supabase
      .from("user")
      .insert(user_data)
      .select();

    if (user_error) {
      console.error("Error creating user:", user_error.message);
      const { error: deleteError } = await supabase
        .from("clinic")
        .delete()
        .eq("clinic_id", clinic_data[0].clinic_id);
        
      return { error: user_error.message + deleteError | null };
    }
    return { clinic_data, userc_data };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { error: "An unexpected error occurred." };
  }
};
