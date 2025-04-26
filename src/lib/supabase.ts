
// src/lib/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseClient;

if (supabaseUrl && supabaseAnonKey) {
  try {
    new URL(supabaseUrl); // Check if supabaseUrl is a valid URL
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Invalid NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl);
    throw new Error('Invalid NEXT_PUBLIC_SUPABASE_URL.  Must be a valid URL.');
  }
} else {
  console.warn('NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set.');
  // You might want to return a mock client or some other fallback
  // to allow your app to function in a limited capacity if
  // Supabase isn't configured.
  supabaseClient = null;
}

export { supabaseClient };


