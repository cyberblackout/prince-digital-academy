'use client';
import { useEffect, useState } from 'react'; import { createClient } from '@/lib/supabase/client'; import { formatDate } from '@/lib/utils'; import { Search, Plus, Edit, Trash2, Loader2, X } from 'lucide-react';
export default function CategoriesPage() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]); const [loading, setLoading] = useState(true); const [showModal, setShowModal] = useState(false); const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [form, setForm] = useState({ name: '', description: '', icon: '' }); const [saving, setSaving] = useState(false); const supabase = createClient();
  const fetch_ = async () => { setLoading(true); const { data } = await supabase.from('course_categories').select('*').order('name'); setItems(data || []); setLoading(false); };
  useEffect(() => { fetch_(); }, []); // eslint-disable-line
  const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true);
    if (editing) await supabase.from('course_categories').update({ name: form.name, slug: slugify(form.name), description: form.description, icon: form.icon }).eq('id', editing.id);
    else await supabase.from('course_categories').insert({ name: form.name, slug: slugify(form.name), description: form.description, icon: form.icon, is_active: true });
    setSaving(false); setShowModal(false); fetch_(); };
  const del = async (id: number) => { if (!confirm('Delete?')) return; await supabase.from('course_categories').delete().eq('id', id); fetch_(); };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><div><h2 className="text-xl font-bold text-gray-800">Categories</h2><p className="text-sm text-gray-500">{items.length} categories</p></div>
        <button onClick={() => { setEditing(null); setForm({ name:'', description:'', icon:'' }); setShowModal(true); }} className="btn-primary text-sm py-2"><Plus size={16}/> Add Category</button></div>
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        {loading ? <div className="flex justify-center py-20"><Loader2 size={32} className="animate-spin text-primary"/></div> :
        <table className="data-table"><thead><tr><th>Name</th><th>Description</th><th>Status</th><th>Actions</th></tr></thead><tbody>
          {items.map((c) => <tr key={c.id as number}><td className="font-medium">{c.name as string}</td><td className="text-gray-500 text-sm">{(c.description as string)?.substring(0,50) || '—'}</td>
            <td><span className={`badge ${c.is_active ? 'badge-success' : 'badge-danger'}`}>{c.is_active ? 'Active' : 'Inactive'}</span></td>
            <td><div className="flex gap-2"><button onClick={() => { setEditing(c); setForm({ name: c.name as string, description: c.description as string || '', icon: c.icon as string || '' }); setShowModal(true); }} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Edit size={14}/></button>
              <button onClick={() => del(c.id as number)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={14}/></button></div></td></tr>)}
          {items.length === 0 && <tr><td colSpan={4} className="text-center py-10 text-gray-400">No categories</td></tr>}
        </tbody></table>}</div>
      {showModal && <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-2xl w-full max-w-md animate-scale-in">
        <div className="px-6 py-4 border-b flex justify-between"><h3 className="font-semibold">{editing ? 'Edit' : 'Add'} Category</h3><button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400"/></button></div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div><label className="form-label">Name</label><input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="form-input"/></div>
          <div><label className="form-label">Description</label><textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows={2} className="form-input"/></div>
          <div><label className="form-label">Icon (emoji)</label><input type="text" value={form.icon} onChange={(e) => setForm({...form, icon: e.target.value})} placeholder="📚" className="form-input"/></div>
          <div className="flex gap-3"><button type="button" onClick={() => setShowModal(false)} className="btn-outline flex-1 justify-center">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">{saving ? <Loader2 size={16} className="animate-spin"/> : editing ? 'Update' : 'Create'}</button></div>
        </form></div></div>}
    </div>);
}
