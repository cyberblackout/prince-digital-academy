'use client';
import { useEffect, useState } from 'react'; import { createClient } from '@/lib/supabase/client'; import { formatDate } from '@/lib/utils'; import { Search, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
export default function EnrollmentsPage() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]); const [loading, setLoading] = useState(true); const [page, setPage] = useState(1); const [total, setTotal] = useState(0); const [search, setSearch] = useState(''); const pageSize = 10; const supabase = createClient();
  useEffect(() => { (async () => { setLoading(true);
    const { data, count } = await supabase.from('enrollments').select('*, users!enrollments_user_id_fkey(first_name, last_name, email), courses!enrollments_course_id_fkey(title)', { count: 'exact' }).order('enrolled_at', { ascending: false }).range((page-1)*pageSize, page*pageSize-1);
    setItems(data || []); setTotal(count || 0); setLoading(false); })(); }, [page]); // eslint-disable-line
  const totalPages = Math.ceil(total / pageSize);
  return (
    <div className="space-y-6">
      <div><h2 className="text-xl font-bold text-gray-800">Enrollments</h2><p className="text-sm text-gray-500">{total} enrollments</p></div>
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        {loading ? <div className="flex justify-center py-20"><Loader2 size={32} className="animate-spin text-primary"/></div> :
        <div className="overflow-x-auto"><table className="data-table"><thead><tr><th>Student</th><th>Course</th><th>Status</th><th>Progress</th><th>Enrolled</th></tr></thead><tbody>
          {items.map((e, i) => { const u = e.users as Record<string,string>|null; const c = e.courses as Record<string,string>|null; return (
            <tr key={i}><td className="font-medium">{u?.first_name} {u?.last_name}</td><td className="text-gray-500">{c?.title}</td>
              <td><span className={`badge ${e.status==='active'?'badge-success':e.status==='completed'?'badge-info':'badge-warning'}`}>{e.status as string}</span></td>
              <td><div className="flex items-center gap-2"><div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{width:`${e.progress_percentage}%`}}/></div><span className="text-xs">{e.progress_percentage as number}%</span></div></td>
              <td className="text-gray-400 text-xs">{formatDate(e.enrolled_at as string)}</td></tr>); })}
          {items.length===0 && <tr><td colSpan={5} className="text-center py-10 text-gray-400">No enrollments</td></tr>}
        </tbody></table></div>}
        {totalPages>1 && <div className="px-6 py-4 border-t flex justify-between text-sm"><span className="text-gray-500">Page {page} of {totalPages}</span><div className="flex gap-2"><button disabled={page<=1} onClick={()=>setPage(page-1)} className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-30"><ChevronLeft size={16}/></button><button disabled={page>=totalPages} onClick={()=>setPage(page+1)} className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-30"><ChevronRight size={16}/></button></div></div>}
      </div></div>);
}
