import { createBrowserClient } from '@supabase/ssr';

const createBrowserClientNoop = () => ({
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signOut: async () => ({ error: null }),
    resetPasswordForEmail: async () => ({ error: null }),
    updateUser: async () => ({ data: { user: null }, error: null }),
    signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
    signUp: async () => ({ data: { user: null, session: null }, error: null }),
  },
  from: () => ({
    select: () => ({ eq: () => ({ order: () => ({ limit: () => ({ single: async () => ({ data: null, error: null }) }), data: [], count: 0 }) }), data: [], count: 0 }),
    insert: async () => ({ data: null, error: null }),
    update: () => ({ eq: () => ({ select: async () => ({ data: null, error: null }) }) }),
    delete: () => ({ eq: () => ({ select: async () => ({ data: null, error: null }) }) }),
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
