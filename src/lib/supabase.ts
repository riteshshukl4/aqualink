// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// Retrieve the Supabase URL and anon key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if the environment variables are defined
if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not defined");
}
if (!supabaseAnonKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined");
}

// Create a Supabase client instance
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// The supabaseClient can be used throughout your application to interact with your Supabase project.
// For example, you can perform database queries, manage authentication, or interact with storage.
