import { createClient, SupabaseClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://bksffizgbspkydwauxqj.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrc2ZmaXpnYnNwa3lkd2F1eHFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxMTYxMDEsImV4cCI6MjEwMjY5MjEwMX0.j5QwM1oO_zSePpTDmEL1-Qc2aN3jq1epRVHhwuafteE';

function initSafeSupabase(): SupabaseClient {
  let url = (import.meta.env.VITE_SUPABASE_URL || '').trim();
  let key = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

  if (!url || !url.startsWith('http')) {
    url = DEFAULT_SUPABASE_URL;
  }
  if (!key || key.length < 20) {
    key = DEFAULT_SUPABASE_ANON_KEY;
  }

  try {
    return createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  } catch (err) {
    console.warn('Supabase initialization fallback to default:', err);
    return createClient(DEFAULT_SUPABASE_URL, DEFAULT_SUPABASE_ANON_KEY);
  }
}

export const supabase = initSafeSupabase();
