import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// const supabaseUrl = "https://npsfqxhdrkjtckhmdlnx.supabase.co/";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wc2ZxeGhkcmtqdGNraG1kbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NDQ2NTQsImV4cCI6MjA2MjAyMDY1NH0.FL7dN2jSH6fgvUPIAgV7hruQlltTMbdx_WB-CtMuM18";

export const supabase = createClient(supabaseUrl, supabaseKey);
