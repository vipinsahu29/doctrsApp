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
    payment_mode: appointmentData.payment_mode,
    fees: appointmentData.fees,
    dr_name: appointmentData.dr_name,
    height: appointmentData.height,
    weight: appointmentData.weight,
  });

  if (error) {
    console.error("Error inserting appointment data:", error);
    return error;
  }
  return { data, error };
}

export const createAppt = async (appointmentData) => {
  const { data, error } = await createAppointment(appointmentData);
  if (error) {
    console.error("Error creating appointment:", error);
    return { error: error.message };
  }
  return { data };
};

export async function fetchJoinedAppointmentData(
  clinicId,
  pageNumber = 1,
  pageSize = 20
) {
  const { data, error } = await supabase.rpc("get_joined_appointment_data", {
    c_id: clinicId,
    page: pageNumber,
    page_size: pageSize,
  });

  if (error) {
    console.error("Error fetching joined patient data:", error);
    return error;
  }

  return data;
}

export async function fetchFilteredPatientData(
  clinicId,
  fnameFilter = null,
  mobile_filter = null
) {
  const { data, error } = await supabase.rpc("get_patient_details_by_filter", {
    c_id: clinicId,
    fname_filter: fnameFilter,
    mobile_filter: mobile_filter,
  });

  if (error) {
    console.error("Error fetching filtered patient data:", error);
    return { error };
  }
  if (!data || data.length === 0) {
    console.warn("No data found for the given filters.");
    return [];
  }
  return { data };
}

// console.log("filter:",fetchFilteredPatientData(32,"raju", null).then(data => {
//   console.log("Filtered Data:", data);
// }).catch(error => {
//   console.error("Error:", error);
// }));

export async function updateAppointment({
  clinicId,
  appointmentId = 0,
  patientId = 0,
  changes = {}}
) {
  const { data, error } = await supabase.rpc("update_appointment_partial", {
    p_appointment_id: appointmentId,
    p_clinic_id: clinicId,
    p_patient_id: patientId,
    p_changes: changes,
  });

  if (error) {
    console.error("Error while update appointment:", error);
    return { error };
  }
  if (!data || data.length === 0) {
    console.warn("Update fail.");
    return [];
  }
  return { data, error };
}
