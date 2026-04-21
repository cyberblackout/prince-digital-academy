import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/student';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('users')
          .select('role_id')
          .eq('id', user.id)
          .single();

        let redirectPath = next;
        if (profile) {
          if (profile.role_id <= 2) redirectPath = '/admin';
          else if (profile.role_id === 3) redirectPath = '/teacher';
          else redirectPath = '/student';
        }

        return NextResponse.redirect(`${origin}${redirectPath}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
