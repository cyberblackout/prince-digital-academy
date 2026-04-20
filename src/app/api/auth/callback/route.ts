import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

const SITE_URL = 'https://prince-digital-academy.vercel.app';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/student';

  if (!code) {
    return NextResponse.redirect(`${SITE_URL}/login?error=no_code`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${SITE_URL}/login?error=auth_failed`);
  }

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.redirect(`${SITE_URL}/login?error=no_user`);
  }

  const { data: profile } = await supabase
    .from('users')
    .select('role_id')
    .eq('id', user.id)
    .single();

  if (!profile) {
    await supabase.from('users').insert({
      id: user.id,
      email: user.email,
      first_name: user.user_metadata?.first_name || user.user_metadata?.name?.split(' ')[0] || 'Google',
      last_name: user.user_metadata?.last_name || user.user_metadata?.name?.split(' ').slice(1).join(' ') || 'User',
      role_id: 4,
      is_active: true,
      avatar: user.user_metadata?.avatar_url || 'default-avatar.png',
      country: 'Ghana',
    });
  }

  let destination = next;
  if (next === '/student' && profile?.role_id && profile.role_id <= 3) {
    if (profile.role_id === 1 || profile.role_id === 2) destination = '/admin';
    else if (profile.role_id === 3) destination = '/teacher';
  }

  return NextResponse.redirect(`${SITE_URL}${destination}`);
}
