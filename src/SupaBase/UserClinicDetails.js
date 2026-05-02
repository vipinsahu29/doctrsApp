import { supabase } from "../supabaseClient";

export async function UserClinicDetails(clinicId) {
  const { data, error } = await supabase.rpc(
    "fetch_users_and_clinic_by_clinic_id",
    {
      p_clinic_id: clinicId,
    },
  );
  if (error) {
    console.error("Error fetching clinic data:", error);
    return { error };
  }
  if (!data || data.length === 0) {
    console.warn("No data found for the given clinicID.");
    return [];
  }
  return { data: data[0] };
}

export async function updateUserClinicDetails(formData) {
  console.log("API:", formData)
  const { data, error } = await supabase.rpc("update_clinic_and_users1", {
    p_clinic_uuid: formData.UUID,
    p_clinic_name: formData.clinic_name,
    p_clinic_specialization: formData.clinic_specialization,
    p_clinic_address: formData.clinic_address,
    p_user_name: formData.user_name,
    p_user_mobile: formData.user_mobile,
    p_user_status: formData.user_status,
    p_user_role: formData.user_role,
    p_user_email: formData.user_email,
    p_user_gender: formData.gender,
  });
  if (error) console.error(error);
  else console.log(data);

  return { data: true, error };
}

// export async function updateUserClinicDetails(
//  clinicDetails,
//  userDetails,
// ) {

//   const { data, error } = await supabase.rpc("update_clinic_and_users", {
//     p_clinic_address : clinicDetails.address,
//     p_clinic_name: clinicDetails.name,
//     p_clinic_specialization: clinicDetails.specialization,
//     p_clinic_uuid: clinicDetails.UUID,
//     p_user_email: userDetails.email,
//     p_user_gender: userDetails.gender,
//     p_user_mobile: userDetails.mobile,
//     p_user_name: userDetails.name,
//     p_user_role: userDetails.role,
//     p_user_status: userDetails.status,
//   });
//   if (error) console.error(error);
//   else console.log(data);

//   return { data: true, error };
// }


// CREATE OR REPLACE FUNCTION public.update_clinic_and_users(
//   p_clinic_uuid uuid,
//   p_clinic_name text,
//   p_clinic_specialization text,
//   p_clinic_address text,
//   p_user_name text,
//   p_user_mobile character varying,
//   p_user_status character varying,
//   p_user_role character varying,
//   p_user_email character varying,
//   p_user_gender text
// )
// RETURNS TABLE(clinic_updated boolean, updated_users integer)
// LANGUAGE plpgsql
// SECURITY DEFINER
// AS $$
// DECLARE
//   v_clinic_id bigint;
//   v_users_updated integer := 0;
// begin
//   -- Find clinic id by clinic UUID
//   SELECT c.clinic_id
//     INTO v_clinic_id
//   FROM public.clinic c
//   WHERE c."UUID" = p_clinic_uuid;

//   if v_clinic_id is null then
//     clinic_updated := false;
//     updated_users := 0;
//     return next;
//   end if;

//   -- Update clinic row
//   UPDATE public.clinic c
//   SET name = p_clinic_name,
//       specialization = p_clinic_specialization,
//       address = p_clinic_address
//   WHERE c.clinic_id = v_clinic_id
//     AND c."UUID" = p_clinic_uuid;

//   clinic_updated := FOUND;

//   -- Update all users belonging to the clinic
//   UPDATE public."user" u
//   SET name = p_user_name,
//       mobile = p_user_mobile,
//       status = p_user_status,
//       role = p_user_role,
//       email = p_user_email,
//       gender = p_user_gender
//   WHERE u.clinic_id = v_clinic_id
//     AND u."UUID" = p_clinic_uuid::text;

//   v_users_updated := COALESCE((SELECT row_count()), 0);
//   updated_users := v_users_updated;

//   return next;
// end;
// $$;