'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { getAvatarUrl, formatDate } from '@/lib/utils';
import { ROLE_NAMES, type RoleId } from '@/lib/constants';
import { Search, Plus, Edit, Trash2, Loader2, ChevronLeft, ChevronRight, X, Eye, EyeOff } from 'lucide-react';

interface UserRow { id: string; first_name: string; last_name: string; email: string; phone?: string; role_id: number; is_active: boolean; avatar?: string; created_at: string; last_login?: string; }

export default function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<UserRow | null>(null);
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '', role_id: 4, password: '' });
  const [saving, setSaving] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const pageSize = 10;
  const supabase = createClient();

  const fetchUsers = async () => {
    setLoading(true);
    let query = supabase.from('users').select('*', { count: 'exact' });
    if (search) query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`);
    if (roleFilter) query = query.eq('role_id', parseInt(roleFilter));
    const { data, count } = await query.order('created_at', { ascending: false }).range((page - 1) * pageSize, page * pageSize - 1);
    setUsers(data || []);
    setTotal(count || 0);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, [search, roleFilter, page]); // eslint-disable-line

  const openNew = () => { setEditing(null); setForm({ first_name: '', last_name: '', email: '', phone: '', role_id: 4, password: '' }); setShowModal(true); };
  const openEdit = (u: UserRow) => { setEditing(u); setForm({ first_name: u.first_name, last_name: u.last_name, email: u.email, phone: u.phone || '', role_id: u.role_id, password: '' }); setShowModal(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (editing) {
      await supabase.from('users').update({ first_name: form.first_name, last_name: form.last_name, phone: form.phone, role_id: form.role_id }).eq('id', editing.id);
    } else {
      const { data: authData, error: authErr } = await supabase.auth.signUp({ email: form.email, password: form.password || 'Default@123' });
      if (authErr || !authData.user) { alert(authErr?.message || 'Failed'); setSaving(false); return; }
      await supabase.from('users').insert({ id: authData.user.id, first_name: form.first_name, last_name: form.last_name, email: form.email, phone: form.phone, role_id: form.role_id, is_active: true, country: 'Ghana' });
    }
    setSaving(false);
    setShowModal(false);
    fetchUsers();
  };

  const toggleActive = async (u: UserRow) => { await supabase.from('users').update({ is_active: !u.is_active }).eq('id', u.id); fetchUsers(); };
  const deleteUser = async (u: UserRow) => { if (!confirm(`Delete ${u.first_name} ${u.last_name}?`)) return; await supabase.from('users').delete().eq('id', u.id); fetchUsers(); };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Users</h2>
          <p className="text-sm text-gray-500">{total} total users</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm py-2"><Plus size={16} /> Add User</button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search users..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="form-input pl-10" />
        </div>
        <select value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }} className="form-input w-auto">
          <option value="">All Roles</option>
          {Object.entries(ROLE_NAMES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-primary" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <img src={getAvatarUrl(u.avatar, `${u.first_name} ${u.last_name}`)} alt="" className="w-8 h-8 rounded-full" />
                        <span className="font-medium">{u.first_name} {u.last_name}</span>
                      </div>
                    </td>
                    <td className="text-gray-500">{u.email}</td>
                    <td><span className="badge badge-primary">{ROLE_NAMES[u.role_id as RoleId] || 'Unknown'}</span></td>
                    <td>
                      <button onClick={() => toggleActive(u)} className={`badge ${u.is_active ? 'badge-success' : 'badge-danger'} cursor-pointer`}>
                        {u.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="text-gray-400 text-xs">{formatDate(u.created_at)}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(u)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Edit size={14} /></button>
                        <button onClick={() => deleteUser(u)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-10 text-gray-400">No users found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm">
            <span className="text-gray-500">Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30"><ChevronLeft size={16} /></button>
              <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30"><ChevronRight size={16} /></button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg animate-scale-in">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">{editing ? 'Edit User' : 'Add User'}</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="form-label">First Name</label><input type="text" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} required className="form-input" /></div>
                <div><label className="form-label">Last Name</label><input type="text" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} required className="form-input" /></div>
              </div>
              <div><label className="form-label">Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required disabled={!!editing} className="form-input disabled:bg-gray-50" /></div>
              <div><label className="form-label">Phone</label><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="form-input" /></div>
              <div><label className="form-label">Role</label>
                <select value={form.role_id} onChange={(e) => setForm({ ...form, role_id: parseInt(e.target.value) })} className="form-input">
                  {Object.entries(ROLE_NAMES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              {!editing && (
                <div>
                  <label className="form-label">Password</label>
                  <div className="relative">
                    <input type={showPw ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Min 6 chars (default: Default@123)" className="form-input pr-10" />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                  </div>
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline flex-1 justify-center">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center disabled:opacity-60">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
