'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { formatMoney, formatDate, truncate } from '@/lib/utils';
import { Search, Plus, Edit, Trash2, Loader2, ChevronLeft, ChevronRight, X, Eye } from 'lucide-react';

interface CourseRow { id: number; title: string; slug: string; level: string; price: number; is_published: boolean; is_featured: boolean; is_free: boolean; created_at: string; teacher_id: string; category_id?: number; }

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<CourseRow | null>(null);
  const [teachers, setTeachers] = useState<{ id: string; first_name: string; last_name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [form, setForm] = useState({ title: '', description: '', level: 'all', price: 0, is_free: false, is_published: false, is_featured: false, teacher_id: '', category_id: '' });
  const [saving, setSaving] = useState(false);
  const pageSize = 10;
  const supabase = createClient();

  const fetchCourses = async () => {
    setLoading(true);
    let query = supabase.from('courses').select('*', { count: 'exact' });
    if (search) query = query.ilike('title', `%${search}%`);
    const { data, count } = await query.order('created_at', { ascending: false }).range((page - 1) * pageSize, page * pageSize - 1);
    setCourses(data || []);
    setTotal(count || 0);
    setLoading(false);
  };

  const fetchMeta = async () => {
    const [{ data: t }, { data: c }] = await Promise.all([
      supabase.from('users').select('id, first_name, last_name').eq('role_id', 3),
      supabase.from('course_categories').select('id, name').eq('is_active', true),
    ]);
    setTeachers(t || []);
    setCategories(c || []);
  };

  useEffect(() => { fetchCourses(); fetchMeta(); }, [search, page]); // eslint-disable-line

  const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const payload = { ...form, slug: slugify(form.title), price: form.is_free ? 0 : Number(form.price), category_id: form.category_id ? parseInt(form.category_id) : null };
    if (editing) { await supabase.from('courses').update(payload).eq('id', editing.id); }
    else { await supabase.from('courses').insert(payload); }
    setSaving(false); setShowModal(false); fetchCourses();
  };

  const openNew = () => { setEditing(null); setForm({ title: '', description: '', level: 'all', price: 0, is_free: false, is_published: false, is_featured: false, teacher_id: '', category_id: '' }); setShowModal(true); };
  const openEdit = (c: CourseRow) => { setEditing(c); setForm({ title: c.title, description: '', level: c.level, price: c.price, is_free: c.is_free, is_published: c.is_published, is_featured: c.is_featured, teacher_id: c.teacher_id, category_id: c.category_id?.toString() || '' }); setShowModal(true); };
  const deleteCourse = async (c: CourseRow) => { if (!confirm(`Delete "${c.title}"?`)) return; await supabase.from('courses').delete().eq('id', c.id); fetchCourses(); };
  const togglePublish = async (c: CourseRow) => { await supabase.from('courses').update({ is_published: !c.is_published }).eq('id', c.id); fetchCourses(); };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div><h2 className="text-xl font-bold text-gray-800">Courses</h2><p className="text-sm text-gray-500">{total} courses</p></div>
        <button onClick={openNew} className="btn-primary text-sm py-2"><Plus size={16} /> Add Course</button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search courses..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="form-input pl-10" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-primary" /></div> : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead><tr><th>Course</th><th>Level</th><th>Price</th><th>Status</th><th>Created</th><th>Actions</th></tr></thead>
              <tbody>
                {courses.map((c) => (
                  <tr key={c.id}>
                    <td><span className="font-medium">{truncate(c.title, 40)}</span></td>
                    <td><span className="badge badge-info capitalize">{c.level}</span></td>
                    <td className="font-semibold">{c.is_free ? <span className="text-green-600">Free</span> : formatMoney(c.price)}</td>
                    <td>
                      <button onClick={() => togglePublish(c)} className={`badge cursor-pointer ${c.is_published ? 'badge-success' : 'badge-warning'}`}>
                        {c.is_published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="text-gray-400 text-xs">{formatDate(c.created_at)}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Edit size={14} /></button>
                        <button onClick={() => deleteCourse(c)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {courses.length === 0 && <tr><td colSpan={6} className="text-center py-10 text-gray-400">No courses found</td></tr>}
              </tbody>
            </table>
          </div>
        )}
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

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
              <h3 className="font-semibold text-gray-800">{editing ? 'Edit Course' : 'Add Course'}</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div><label className="form-label">Title</label><input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="form-input" /></div>
              <div><label className="form-label">Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="form-input" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="form-label">Teacher</label>
                  <select value={form.teacher_id} onChange={(e) => setForm({ ...form, teacher_id: e.target.value })} required className="form-input">
                    <option value="">Select teacher</option>
                    {teachers.map((t) => <option key={t.id} value={t.id}>{t.first_name} {t.last_name}</option>)}
                  </select>
                </div>
                <div><label className="form-label">Category</label>
                  <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} className="form-input">
                    <option value="">None</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="form-label">Level</label>
                  <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="form-input">
                    <option value="all">All Levels</option><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option>
                  </select>
                </div>
                <div><label className="form-label">Price (₵)</label><input type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} disabled={form.is_free} className="form-input disabled:bg-gray-50" /></div>
              </div>
              <div className="flex gap-6">
                {[{ key: 'is_free', label: 'Free' }, { key: 'is_published', label: 'Published' }, { key: 'is_featured', label: 'Featured' }].map((opt) => (
                  <label key={opt.key} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" checked={form[opt.key as keyof typeof form] as boolean} onChange={(e) => setForm({ ...form, [opt.key]: e.target.checked })} className="rounded border-gray-300" />
                    {opt.label}
                  </label>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline flex-1 justify-center">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">{saving ? <Loader2 size={16} className="animate-spin" /> : editing ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
