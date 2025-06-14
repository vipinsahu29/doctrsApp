import { supabase } from "../supabaseClient";

// export const createAppointment = async (appointmentData) => {
//   try {
//     const { data, error } = await supabase
//       .from("appointment_data")
//       .insert(appointmentData)
//       .select();

//     if (error) {
//       console.error("Error creating appointment:", error.message);
//       return { error: error.message };
//     }
//     return { data };
//   } catch (err) {
//     console.error("Unexpected error:", err);
//     return { error: "An unexpected error occurred." };
//   }
// };

export async function fetchJoinedPatientData(clinicId) {
  const { data, error } = await supabase.rpc("get_joined_patient_data", {
    c_id: clinicId,
  });

  if (error) {
    console.error("Error fetching joined patient data:", error);
    return null;
  }

  return data;
}

export async function createAppointment(appointmentData) {
  const { data, error } = await supabase.rpc("insert_appointment_data", {
    clinic_id: appointmentData.clinic_id,
    patient_id: appointmentData.patient_id,
    appointment_date: appointmentData.appointment_date,
    appointment_time: appointmentData.appointment_time,
    payment_status: appointmentData.payment_status,
    payment_mode: appointmentData.payment_mode,
    fees: appointmentData.fees,
    dr_name: appointmentData.dr_name,
  });

  if (error) {
    console.error("Error inserting appointment data:", error);
    return null;
  }

  return data;
}

export const createAppt = async(appointmentData) => {
  const {data, error} = await createAppointment(appointmentData);
  if (error) {
    console.error("Error creating appointment:", error);
    return { error: error.message };
  }
  console.log("Appointment created successfully:", data);

}

// createAppt({
//   clinic_id: "32",
//   patient_id: "17",
//   appointment_date: "2025-06-15",
//   appointment_time: "10:00",
//   payment_status: "waiting",
//   payment_mode: "",
//   fees: 0,
//   dr_name: "Dr. Gopal"
// });