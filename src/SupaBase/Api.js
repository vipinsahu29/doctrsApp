import { supabase } from "../supabaseClient";
import { ExpensesTable } from "./tableName";

export const registerUserAPI = async (
  email,
  password,
  mobile,
) => {
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
