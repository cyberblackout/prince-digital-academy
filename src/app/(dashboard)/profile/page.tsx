'use client';
import { useAuth } from '@/providers/AuthProvider';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Save, Camera } from 'lucide-react';
import { getAvatarUrl, formatDate } from '@/lib/utils';

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [form, setForm] = useState({ first_name: user?.first_name||'', last_name: user?.last_name||'', phone: user?.phone||'', bio: user?.bio||'', address: user?.address||'', city: user?.city||'', country: user?.country||'Ghana', date_of_birth: user?.date_of_birth||'', gender: user?.gender||'' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const supabase = createClient();
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true); setMsg('');
    const { error } = await supabase.from('users').update(form).eq('id', user!.id);
    if (error) setMsg('Failed to update'); else { setMsg('Profile updated!'); refreshUser(); }
    setSaving(false); };
  if (!user) return null;
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <div className="flex items-center gap-4 mb-6"><div className="relative"><img src={getAvatarUrl(user.avatar, user.first_name+' '+user.last_name)} className="w-20 h-20 rounded-full object-cover" alt=""/><button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center"><Camera size={14}/></button></div>
          <div><h2 className="text-xl font-bold text-gray-800">{user.first_name} {user.last_name}</h2><p className="text-sm text-gray-500">{user.email}</p><p className="text-xs text-gray-400">Joined {formatDate(user.created_at)}</p></div></div>
        {msg && <div className={`rounded-xl px-4 py-3 text-sm mb-4 ${msg.includes('Failed')?'bg-red-50 text-red-600':'bg-green-50 text-green-600'}`}>{msg}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4"><div><label className="form-label">First Name</label><input type="text" value={form.first_name} onChange={(e)=>setForm({...form,first_name:e.target.value})} required className="form-input"/></div>
            <div><label className="form-label">Last Name</label><input type="text" value={form.last_name} onChange={(e)=>setForm({...form,last_name:e.target.value})} required className="form-input"/></div></div>
          <div className="grid grid-cols-2 gap-4"><div><label className="form-label">Phone</label><input type="tel" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} className="form-input"/></div>
            <div><label className="form-label">Gender</label><select value={form.gender} onChange={(e)=>setForm({...form,gender:e.target.value})} className="form-input"><option value="">Select</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></div></div>
          <div><label className="form-label">Bio</label><textarea value={form.bio} onChange={(e)=>setForm({...form,bio:e.target.value})} rows={3} className="form-input"/></div>
          <div className="grid grid-cols-2 gap-4"><div><label className="form-label">City</label><input type="text" value={form.city} onChange={(e)=>setForm({...form,city:e.target.value})} className="form-input"/></div>
            <div><label className="form-label">Date of Birth</label><input type="date" value={form.date_of_birth} onChange={(e)=>setForm({...form,date_of_birth:e.target.value})} className="form-input"/></div></div>
          <button type="submit" disabled={saving} className="btn-primary py-2.5">{saving?<><Loader2 size={16} className="animate-spin"/>Saving...</>:<><Save size={16}/>Save Changes</>}</button>
        </form></div></div>);
}