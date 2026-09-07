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

export async function updateFollowUpData(
  clinicId,
  patientId,
  followUpDate,
  followUpNotes,
  followUpStatus,
  checkInId
) {
  try {
    const { data, error } = await supabase.rpc("upDateFollowUpData", {
      p_clinic_id: clinicId,
      p_patient_id: patientId,
      p_followup_date: followUpDate,
      p_follow_up_notes: followUpNotes,
      p_follow_up_status: followUpStatus,
      p_id: checkInId,
    });
    if (error) {
      console.error("Error fetching clinic data:", error);
      return { error };
    }
    if (!data || data.length === 0) {
      console.warn("There is some error. Please try again.");
      return { error: "Failed to update follow-up data." };
    }
    return { data: "Success..." };
  } catch (error) {
    console.log("Error while updating record:", error);
    return { error };
  }
}
