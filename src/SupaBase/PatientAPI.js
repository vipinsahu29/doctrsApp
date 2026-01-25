import { supabase } from "../supabaseClient";

export const createPatient = async (patientData, patientDetailsData) => {
  try {
    // Step 1: Check if the patient already exists
    const { data: existingPatient, error: checkError } = await supabase
      .from("patient")
      .select("*")
      .eq("fname", patientData.fname)
      .eq("lname", patientData.lname)
      .eq("mobile", patientData.mobile)
      .eq("clinic_id", patientData.clinic_id); // Ensure the patient belongs to the correct clinic

    if (checkError) {
      console.error("Error checking patient existence:", checkError.message);
      return { error: checkError.message };
    }

    if (existingPatient.length > 0) {
      return { error: "Patient already exists." };
    }

    // Step 2: Insert into the `patient` table
    const { data: patient, error: patientError } = await supabase
      .from("patient")
      .insert(patientData)
      .select();

    if (patientError) {
      console.error("Error inserting patient:", patientError.message);
      return { error: patientError.message };
    }

    // Step 3: Insert into the `patient_details` table
    const patientId = patient[0].patient_id; // Get the inserted patient ID
    const patientDetails = { ...patientDetailsData, patient_id: patientId };
    const { data: patientDetailsDataResult, error: patientDetailsError } =
      await supabase.from("patients_details").insert(patientDetails).select();
    if (patientDetailsError || !patientDetailsDataResult) {
      console.error(
        "Error inserting patient details:",
        patientDetailsError.message
      );
      // Rollback: Delete the inserted record from the `patient` table
      const { error: rollbackError, data: rollbackData } = await supabase
        .from("patient")
        .delete()
        .eq("patient_id", patientId);

      console.log("Rolling back patient insertion...", rollbackData);
      if (rollbackError) {
        console.error("Error during rollback:", rollbackError.message);
      }

      return { error: patientDetailsError.message };
    }

    // Step 4: Return success response
    return { patient, patientDetails: patientDetailsDataResult };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { error: "An unexpected error occurred." };
  }
};

export const getPatientData = async (clinic_id) => {
  try {
    const { data, error } = await supabase
      .from("patient")
      .select(
        `
        patient_id,
        fname,
        lname,
        mobile,
        email,
        gender,
        patients_details (
          height,
          weight,
          dob,
          occupation,
          address,
          pan,
          adhar
        )
        `
      )
      .eq("clinic_id", clinic_id); // Ensure the patient belongs to the correct clinic
    if (error) {
      console.error("Error fetching patient data:", error.message);
      return { error: error.message, data: [] };
    }
    if (data.length === 0) {
      return { error: "Patient already exists." };
    }
    return { data };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "An unexpected error occurred in select patient." };
  }
};

export async function getPatientDetails(clinicId, pageNumber = 1,
  pageSize = 20,) {
  const { data, error } = await supabase.rpc("get_patientdetails_data_v2", {
    p_clinic_id: clinicId,
    p_limit: pageSize,
    p_page: pageNumber,
  });

  if (error) {
    console.error("Error fetching joined patient data:", error);
    return null;
  }

  return data;
}

export async function updatePatient({
  patientId,
  patientChanges,
  patientDetailsChanges,
  clinic_id
}) {
  try {
    if (!patientId || !clinic_id) {
      return { error: "Patient ID is required for update.",clinic_id };
    }
    const { data, error } = await supabase.rpc("update_patient_and_details", {
      p_patient_id: patientId,
      p_patient_changes: patientChanges,
      p_details_changes: patientDetailsChanges,
      p_clinic_id: clinic_id,
    });

    if (error) {
      console.error("Error updating patient data:", error);
      return { error: error.message };
    }
    return { data };
  } catch (error) {
    console.error("Error updating patient data:", error);
    return { error: "An unexpected error occurred while updating patient." };
  }
}

export const UpdatePatientsData = async (
  patientId,
  patientChanges,
  patientDetailsChanges,
  clinic_id
) => {
  try {
    // Update patient tabl
    const { data: patientData, error: patientError } = await updatePatient(
      patientId,
      patientChanges,
      patientDetailsChanges,
      clinic_id
    );
    if (patientError) {
      console.error("Error updating patient data:", patientError);
      return { error: patientError };
    }
    return { data: patientData };
  } catch (error) {
    console.error("Error updating patient data:", error);
    return { error: "An unexpected error occurred while updating patient." };
  }
};
