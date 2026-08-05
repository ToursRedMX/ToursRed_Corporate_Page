import { createClient, SupabaseClient } from '@supabase/supabase-js';

function createServerClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
  }

  const key = serviceRoleKey || anonKey;
  if (!key) {
    throw new Error('No Supabase key available (tried SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_ANON_KEY)');
  }

  return createClient(supabaseUrl, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

let clientInstance: SupabaseClient | null = null;

export function getSupabaseServerClient(): SupabaseClient {
  if (!clientInstance) {
    clientInstance = createServerClient();
  }
  return clientInstance;
}
