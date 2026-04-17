'use client';
import { useEffect, useState } from 'react'; import { createClient } from '@/lib/supabase/client'; import { formatDate, truncate } from '@/lib/utils'; import { Search, Plus, Edit, Trash2, Loader2, X, ChevronLeft, ChevronRight } from 'lucide-react';
export default function ExamsPage() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]); const [loading, setLoading] = useState(true); const [page, setPage] = useState(1); const [total, setTotal] = useState(0); const [showModal, setShowModal] = useState(false); const [editing, setEditing] = useState<Record<string, unknown>|null>(null);
  const [form, setForm] = useState({ title: '', description: '', exam_type: 'quiz', total_marks: 100, pass_marks: 40, duration_minutes: 60, google_form_url: '', is_published: false }); const [saving, setSaving] = useState(false); const pageSize = 10; const supabase = createClient();
  const fetch_ = async () => { setLoading(true); const { data, count } = await supabase.from('exams').select('*', { count: 'exact' }).order('created_at', { ascending: false }).range((page-1)*pageSize, page*pageSize-1); setItems(data||[]); setTotal(count||0); setLoading(false); };
  useEffect(() => { fetch_(); }, [page]); // eslint-disable-line
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true);
    const payload = { ...form, total_marks: Number(form.total_marks), pass_marks: Number(form.pass_marks), duration_minutes: Number(form.duration_minutes) || null, google_form_url: form.google_form_url || null };
    if (editing) await supabase.from('exams').update(payload).eq('id', editing.id); else await supabase.from('exams').insert(payload);
    setSaving(false); setShowModal(false); fetch_(); };
  const del = async (id: number) => { if (!confirm('Delete?')) return; await supabase.from('exams').delete().eq('id', id); fetch_(); };
  const totalPages = Math.ceil(total / pageSize);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><div><h2 className="text-xl font-bold text-gray-800">Exams</h2><p className="text-sm text-gray-500">{total} exams</p></div>
        <button onClick={() => { setEditing(null); setForm({ title:'', description:'', exam_type:'quiz', total_marks:100, pass_marks:40, duration_minutes:60, google_form_url:'', is_published:false }); setShowModal(true); }} className="btn-primary text-sm py-2"><Plus size={16}/> Add Exam</button></div>
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        {loading ? <div className="flex justify-center py-20"><Loader2 size={32} className="animate-spin text-primary"/></div> :
        <div className="overflow-x-auto"><table className="data-table"><thead><tr><th>Title</th><th>Type</th><th>Marks</th><th>Pass</th><th>Status</th><th>Actions</th></tr></thead><tbody>
          {items.map((ex) => <tr key={ex.id as number}><td className="font-medium">{truncate(ex.title as string, 35)}</td>
            <td><span className="badge badge-info capitalize">{ex.exam_type as string}</span></td>
            <td>{ex.total_marks as number}</td><td>{ex.pass_marks as number}</td>
            <td><span className={`badge ${ex.is_published ? 'badge-success' : 'badge-warning'}`}>{ex.is_published ? 'Published' : 'Draft'}</span></td>
            <td><div className="flex gap-2"><button onClick={() => { setEditing(ex); setForm({ title: ex.title as string, description: ex.description as string || '', exam_type: ex.exam_type as string, total_marks: ex.total_marks as number, pass_marks: ex.pass_marks as number, duration_minutes: ex.duration_minutes as number || 60, google_form_url: ex.google_form_url as string || '', is_published: ex.is_published as boolean }); setShowModal(true); }} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Edit size={14}/></button>
              <button onClick={() => del(ex.id as number)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={14}/></button></div></td></tr>)}
          {items.length===0 && <tr><td colSpan={6} className="text-center py-10 text-gray-400">No exams found</td></tr>}
        </tbody></table></div>}
        {totalPages>1 && <div className="px-6 py-4 border-t flex justify-between text-sm"><span className="text-gray-500">Page {page}/{totalPages}</span><div className="flex gap-2"><button disabled={page<=1} onClick={()=>setPage(page-1)} className="p-2 rounded-lg border disabled:opacity-30"><ChevronLeft size={16}/></button><button disabled={page>=totalPages} onClick={()=>setPage(page+1)} className="p-2 rounded-lg border disabled:opacity-30"><ChevronRight size={16}/></button></div></div>}
      </div>
      {showModal && <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="px-6 py-4 border-b flex justify-between sticky top-0 bg-white"><h3 className="font-semibold">{editing?'Edit':'Add'} Exam</h3><button onClick={()=>setShowModal(false)}><X size={20} className="text-gray-400"/></button></div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div><label className="form-label">Title</label><input type="text" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} required className="form-input"/></div>
          <div><label className="form-label">Description</label><textarea value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} rows={2} className="form-input"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="form-label">Type</label><select value={form.exam_type} onChange={(e)=>setForm({...form,exam_type:e.target.value})} className="form-input"><option value="quiz">Quiz</option><option value="midterm">Midterm</option><option value="final">Final</option><option value="assignment">Assignment</option><option value="practical">Practical</option></select></div>
            <div><label className="form-label">Duration (min)</label><input type="number" value={form.duration_minutes} onChange={(e)=>setForm({...form,duration_minutes:parseInt(e.target.value)})} className="form-input"/></div></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="form-label">Total Marks</label><input type="number" value={form.total_marks} onChange={(e)=>setForm({...form,total_marks:parseInt(e.target.value)})} className="form-input"/></div>
            <div><label className="form-label">Pass Marks</label><input type="number" value={form.pass_marks} onChange={(e)=>setForm({...form,pass_marks:parseInt(e.target.value)})} className="form-input"/></div></div>
          <div><label className="form-label">Google Form URL (optional)</label><input type="url" value={form.google_form_url} onChange={(e)=>setForm({...form,google_form_url:e.target.value})} className="form-input" placeholder="https://forms.google.com/..."/></div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_published} onChange={(e)=>setForm({...form,is_published:e.target.checked})} className="rounded"/> Published</label>
          <div className="flex gap-3"><button type="button" onClick={()=>setShowModal(false)} className="btn-outline flex-1 justify-center">Cancel</button><button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">{saving?<Loader2 size={16} className="animate-spin"/>:editing?'Update':'Create'}</button></div>
        </form></div></div>}
    </div>);
}
