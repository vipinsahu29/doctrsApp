import { supabase } from "../supabaseClient";

export async function getFollowUpList(clinicId, startDate, endDate) {
  try {
    const { data, error } = await supabase.rpc("get_follow_up_data", {
      p_clinic_id: clinicId,
      start_date: startDate,
      end_date: endDate,
    });
    if (error) {
      console.error("Error fetching clinic data:", error);
      return { error };
    }
    if (!data || data.length === 0) {
      console.warn("No data found for the given clinicID.");
      return [];
    }
    return { data: data };
  } catch (error) {
    console.log("Error fetching follow-up data:", error);
    return { error };
  }
}
