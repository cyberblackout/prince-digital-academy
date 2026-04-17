'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/providers/AuthProvider';
import { formatDate, formatMoney, truncate } from '@/lib/utils';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
export default function MyResultsPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
  const supabase = createClient();
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, count } = await supabase.from('exam_results').select('*', { count: 'exact' }).eq('student_id', user!.id).order('created_at', { ascending: false }).range((page-1)*pageSize, page*pageSize-1);
      setItems(data || []);
      setTotal(count || 0);
      setLoading(false);
    })();
  }, [page, user]); // eslint-disable-line
  const totalPages = Math.ceil(total / pageSize);
  return (
    <div className="space-y-6">
      <div><h2 className="text-xl font-bold text-gray-800">My Results</h2><p className="text-sm text-gray-500">{total} records</p></div>
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        {loading ? <div className="flex justify-center py-20"><Loader2 size={32} className="animate-spin text-primary"/></div> :
        <div className="overflow-x-auto"><table className="data-table"><thead><tr><th>Marks Obtained</th><th>Grade</th><th>Remarks</th></tr></thead><tbody>
          {items.map((item, i) => <tr key={i}><td className="text-gray-600">{truncate(String(item.marks_obtained ?? '—'), 40)}</td><td className="text-gray-600">{truncate(String(item.grade ?? '—'), 40)}</td><td className="text-gray-600">{truncate(String(item.remarks ?? '—'), 40)}</td></tr>)}
          {items.length===0 && <tr><td colSpan={3} className="text-center py-10 text-gray-400">No records found</td></tr>}
        </tbody></table></div>}
        {totalPages>1 && <div className="px-6 py-4 border-t flex justify-between text-sm"><span className="text-gray-500">Page {page}/{totalPages}</span><div className="flex gap-2"><button disabled={page<=1} onClick={()=>setPage(page-1)} className="p-2 rounded-lg border disabled:opacity-30"><ChevronLeft size={16}/></button><button disabled={page>=totalPages} onClick={()=>setPage(page+1)} className="p-2 rounded-lg border disabled:opacity-30"><ChevronRight size={16}/></button></div></div>}
      </div>
    </div>);
}