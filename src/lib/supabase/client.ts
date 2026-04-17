import { createBrowserClient } from '@supabase/ssr';

const createBrowserClientNoop = () => ({
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signOut: async () => ({ error: null }),
  },
  from: () => ({
    select: () => ({ eq: () => ({ order: () => ({ limit: () => ({ single: async () => ({ data: null, error: null }) }), data: [], count: 0 }) }), data: [], count: 0 }),
  }),
});

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return createBrowserClientNoop();
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
