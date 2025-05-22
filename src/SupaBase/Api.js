import { supabase } from "../supabaseClient";
import { ExpensesTable } from "./tableName";

export const registerUserAPI = async (email, password, display_name) => {
  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  // Step 2: Call Supabase signup
  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    display_name,
  });

  if (signUpError) {
    console.error("Signup Error:", signUpError.message);
    return { error: signUpError.message };
  }
  console.log("Signup Data:", data);
  // Supabase returns data.user in newer SDK
  const user = data?.user;

  if (!user || !user.id) {
    return { error: "User ID not found after signup." };
  }

  const uuid = user.id;

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
