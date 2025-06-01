import { supabase } from "../supabaseClient";
export const checkClinicExists = async (uuid) => {
  try {
    const { data, error } = await supabase
      .from("clinic")
      .select("*")
      .eq("UUID", uuid)

    if (error) {
      console.error("Error checking clinic existence:", error.message);
      return false;
    }
    return !!data;
  } catch (err) {
    console.error("Unexpected error:", err);
    return false;
  }
};
export const createClinic = async (clinicData,userData) => {
  console.log("Creating clinic with data:", clinicData, "and user data:", userData);  
  try {
    const { data:clinic_data, error:clinic_error } = await supabase
      .from("clinic")
      .insert(clinicData)
      .select();

    if (clinic_error) {
      console.error("Error creating clinic:", clinic_error.message);
      return { error: clinic_error.message };
    }
    const user_data = { ...userData };
    user_data.clinic_id = clinic_data[0].clinic_id;
  console.log(" user data:", user_data, "clinic_data:", clinic_data,clinic_data[0].clinic_id);  
  // Set the clinic_id in userData
    const { data:userc_data, error:user_error } = await supabase
    .from("user")
    .insert(user_data)
    .select();
    if (user_error) {
      console.error("Error creating user:", user_error.message);
      return { error: user_error.message };
    }
    return { clinic_data, userc_data };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { error: "An unexpected error occurred." };
  }
};
