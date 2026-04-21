'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, Eye, EyeOff, Loader2, User, Phone } from 'lucide-react';

export default function RegisterPage() {
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '', password: '', confirm_password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm_password) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (form.phone.replace(/\D/g, '').length < 10) { setError('Phone number must be at least 10 digits'); return; }
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { first_name: form.first_name, last_name: form.last_name } },
      });
      if (authError) { setError(authError.message); setLoading(false); return; }
      if (!authData.user) { setError('Registration failed'); setLoading(false); return; }

      const { error: profileError } = await supabase.from('users').insert({
        id: authData.user.id,
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        role_id: 4,
        is_active: true,
        avatar: 'default-avatar.png',
        country: 'Ghana',
      });

      if (profileError) { setError('Profile creation failed: ' + profileError.message); setLoading(false); return; }
      router.push('/student');
      router.refresh();
    } catch { setError('An unexpected error occurred'); setLoading(false); }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
        <p className="text-gray-500 text-sm">Join Prince Digital Academy today</p>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-6">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">First Name</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={form.first_name} onChange={(e) => update('first_name', e.target.value)} required placeholder="John" className="form-input pl-10" />
            </div>
          </div>
          <div>
            <label className="form-label">Last Name</label>
            <input type="text" value={form.last_name} onChange={(e) => update('last_name', e.target.value)} required placeholder="Doe" className="form-input" />
          </div>
        </div>

        <div>
          <label className="form-label">Email Address</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required placeholder="you@example.com" className="form-input pl-10" />
          </div>
        </div>

        <div>
          <label className="form-label">Phone Number</label>
          <div className="relative">
            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} required placeholder="0599822088" className="form-input pl-10" />
          </div>
        </div>

        <div>
          <label className="form-label">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type={showPw ? 'text' : 'password'} value={form.password} onChange={(e) => update('password', e.target.value)} required placeholder="Min 6 characters" className="form-input pl-10 pr-10" />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div>
          <label className="form-label">Confirm Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="password" value={form.confirm_password} onChange={(e) => update('confirm_password', e.target.value)} required placeholder="••••••••" className="form-input pl-10" />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 text-base disabled:opacity-60">
          {loading ? <><Loader2 size={18} className="animate-spin" /> Creating account...</> : 'Create Account'}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-500">
        Already have an account?{' '}
        <Link href="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
      </p>
    </div>
  );
}
