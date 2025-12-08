import { supabase } from "../supabaseClient";
export async function insertDoctor({
  clinicId,
  name,
  mobile1,
  mobile2,
  email,
  dob,
  qualification,
  collage,
  univercity,
  careerstartdate,
  graduateddate,
  shift = [],
  gender
}) {
  const { data, error } = await supabase.rpc("insert_doctor", {
    p_name: name,
    p_clinic_id: clinicId,
    p_mobile1: mobile1,
    p_mobile2: mobile2,
    p_email: email,
    p_dob: dob,
    p_qualification: qualification,
    p_college: collage,
    p_univercity: univercity,
    p_careerstartdate: careerstartdate,
    p_graduateddate: graduateddate,
    p_shift: shift,
    p_gender: gender
  });

  if (error) {
    console.error("Error while Dr:", error);
    return { error };
  }
  if (!data || data.length === 0) {
    console.warn("Update fail.");
    return [];
  }
  return { data, error };
}

export async function fetchDocters(
  clinicId,
) {
  const { data, error } = await supabase.rpc("get_doctors", {
    p_clinic_id: clinicId
  });
  console.log(data, error, 'clinicId->', clinicId);
  if (error) {
    console.error("Error fetching doctors data:", error);
    return { error };
  }
  if (!data || data.length === 0) {
    console.warn("No data found for the given clinicID.");
    return [];
  }
  return { data };
}
