import { supabase } from "../supabaseClient";
import { ExpensesTable } from "./tableName";

export const registerUserAPI = async (
  email,
  password,
  drName,
  role,
  mobile,
  specialization,
  clinicName,
  clinicAddress
) => {
  console.log(
    "API reg: ",
    email,
    password,
    drName,
    role,
    Number(mobile),
    specialization,
    clinicName,
    clinicAddress
  );
  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  // Step 2: Call Supabase signup
  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    phone: String(mobile), // Ensure mobile is a string
  });

  if (signUpError) {
    console.error("Signup Error:", signUpError.message);
    return { error: signUpError.message };
  }
  // Supabase returns data.user in newer SDK
  const user = data?.user;
  const uuid = user?.id;

  if (!user || !user.id) {
    return { error: "User ID not found after signup." };
  }
  return {
    uuid,
    message: "User registered successfully.",
  };
};
export const loginUserAuthAPI = async (email, password) => {
  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login Error:", error.message);
    return { error: error.message };
  }

  const session = data?.session;
  const user = data?.user;

  return {
    user,
    session,
    message: "Login successful.",
  };
};

//delete user

// const deleteUser = async (userId) => {
//   const { error } = await supabase.auth.api.deleteUser(userId);
//   // Specify the user ID to delete

//   if (error) {
//     console.error("Error deleting user:", error);
//   } else {
//     console.log("User deleted successfully:");
//   }
// };
export const getExpenseData = async () => {
  let errorMessage = null;
  try {
    const { data, error, count, status, statusText } = await supabase
      .from(ExpensesTable)
      .select("*", { count: "exact" });
    if (error) {
      errorMessage = `Error (${status} ${statusText}):, ${error.message}`;
      console.error(errorMessage);
      return { data: [], error: errorMessage, count: 0 };
    }
    console.log("api: ", data);

    return { data, errorMessage, count };
  } catch (err) {
    console.error("Unexpected error: ", err);
    return { data: [], error: "Unexpected error occurred", count: 0 };
  }
};

export const createClinicAndUser = async (
  {uuid,columnData}
) => {
  if (
    !uuid ||
    !columnData.DrName ||
    // !columnData.role ||
    !columnData.Specialization ||
    !columnData.Mobile ||
    // !columnData.email ||
    !columnData.ClinicName ||
    !columnData.Address
  ) {
    console.error("All fields are required for creating clinic and user.");
    return "All fields are required for creating clinic and user";
  }
  console.log("Creating clinic and user with data:", {
    uuid,
    ...columnData,
  });
  // Check if the user already exists in the clinic table
  // const { data: existingClinic, error: checkError } = await supabase
  //   .from("clinic")
  //   .select("*")
  //   .eq("UUID", columnData.uuid)
  //   .single();

  // if (checkError) {
  //   console.error("Error checking existing clinic:", checkError.message);
  //   return;
  // }

  // if (existingClinic) {
  //   console.log("Clinic already exists for this user.");
  //   return;
  // }
  const { data, error: rpcError } = await supabase.rpc(
    "createClincUser",
    {
      p_user_id:uuid,
      p_name: columnData.DrName,
      p_role: "doctor",
      p_specialization: columnData.Specialization,
      p_mobile: columnData.Mobile,
      p_email: 'testEmailRPC@tt.com',//columnData.Email,
      p_status: "active",
      p_clinic_name: columnData.ClinicName,
      p_clinic_address: columnData.Address,
    }
  );

  if (rpcError) {
    console.error("Registration RPC error:", rpcError.message);
    return {error:rpcError.message};
  } else {
    return data;
  }
};
