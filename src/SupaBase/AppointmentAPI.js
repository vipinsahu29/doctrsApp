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

export const getAppointments = async (clinic_Id) => {
  try {
    const { data, error } = await supabase
      .from("appointment_data")
      .select(
        `appointment_id, appointment_date, appointment_time, payment_status,payment_mode,fees, patient_id, clinic_id,
        patient(fname, lname,gender,mobile,email,
        patients_details(pd_id,address, dob, blood_group, height, weight,pan,adhar, occupation,clinic_id,patient_id))`
      )
      //   .join("appointment_data", "patient_id", "appointment_data.patient_id")
      //   // Join with appointment_data

      //   .join("patients_details", "patient_id", "patient_details.patient_id")
      // // Join with patient_detail
      .eq("clinic_id", clinic_Id);

    if (error) {
      console.error("Error fetching appointments:", error.message);
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
    console.log("from rpc func", clinicId,"data:", data);

  if (error) {
    console.error("Error fetching joined patient data:", error);
    return null;
  }

  return data;
}
