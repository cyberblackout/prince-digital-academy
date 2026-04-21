'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Mail, Loader2, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/api/auth/callback?type=recovery`,
    });
    if (error) { setError(error.message); } else { setSent(true); }
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="animate-fade-in text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Check Your Email</h2>
        <p className="text-gray-500 text-sm mb-6">If an account exists for <strong>{email}</strong>, a reset link has been sent.</p>
        <Link href="/login" className="text-primary font-medium hover:underline">← Back to Sign In</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
        <p className="text-gray-500 text-sm">Enter your email and we&apos;ll send you a reset link</p>
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-6">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="form-label">Email Address</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="form-input pl-10" />
          </div>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 disabled:opacity-60">
          {loading ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : 'Send Reset Link'}
        </button>
      </form>
      <p className="text-center mt-6 text-sm text-gray-500">
        Remember your password? <Link href="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
      </p>
    </div>
  );
}
