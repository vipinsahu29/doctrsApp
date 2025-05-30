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
    console.log("data", data);
    return data ? true : false;
  } catch (err) {
    console.error("Unexpected error:", err);
    return false;
  }
};
