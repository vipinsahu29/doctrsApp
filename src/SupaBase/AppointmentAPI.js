import { supabase } from "../supabaseClient";

export const createAppointment = async (appointmentData) => {
  try {
    const { data, error } = await supabase
      .from("appointment_data")
      .insert(appointmentData)
      .select();

    if (error) {
      console.error("Error creating appointment:", error.message);
      return { error: error.message };
    }
    return { data };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { error: "An unexpected error occurred." };
  }
};
export async function fetchJoinedPatientData(clinicId) {
  const { data, error } = await supabase.rpc("get_joined_patient_data", {
    c_id: clinicId,
  });
  console.log("from rpc func", clinicId, "data:", data);

  if (error) {
    console.error("Error fetching joined patient data:", error);
    return null;
  }

  return data;
}
