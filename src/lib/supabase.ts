import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://bksffizgbspkydwauxqj.supabase.co';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrc2ZmaXpnYnNwa3lkd2F1eHFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxMTYxMDEsImV4cCI6MjEwMjY5MjEwMX0.j5QwM1oO_zSePpTDmEL1-Qc2aN3jq1epRVHhwuafteE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
