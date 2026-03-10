import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== '' && supabaseAnonKey !== '');
};

// Only create the client if credentials are provided
// Use dummy values if not configured (client won't be used anyway)
export const supabase = isSupabaseConfigured() 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key');

if (!isSupabaseConfigured()) {
  console.warn('Supabase credentials not found. Using localStorage fallback mode.');
}
