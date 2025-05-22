import {supabase} from '../supabaseClient'
// import {clinic, user} from './tableName'
export const registerUser = async (displayName, email, password, phone, address, fatherName) => {
    try {
      // **Step 1: Sign up user in Supabase authentication**
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            displayName,
            phone,
          }
        }
      });
  
      if (error) {
        console.error("Error signing up:", error.message);
        return;
      }
  
      const user = data.user;
  
      if (!user) {
        console.error("Signup failed, no user returned");
        return;
      }
  
      console.log("User signed up successfully:", user);
  
      // **Step 2: Store additional details in `userDetails` table**
      const { error: insertError } = await supabase.from('userDetails').insert([
        {
          UID: user.id, // Store UID to link both tables
          displayName,
          email,
          phone,
          address,
          fatherName
        }
      ]);
  
      if (insertError) {
        console.error("Error storing user details:", insertError.message);
        return;
      }
  
      console.log("User details stored successfully");
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };