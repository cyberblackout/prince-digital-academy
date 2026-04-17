'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { formatMoney, formatDate} from '@/lib/utils';
import { Search, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      setLoading(true);
      let query = supabase.from('payments').select('*, users!payments_user_id_fkey(first_name, last_name, email)', { count: 'exact' });
      if (statusFilter) query = query.eq('status', statusFilter);
      if (search) query = query.ilike('reference', `%${search}%`);
      const { data, count } = await query.order('created_at', { ascending: false }).range((page - 1) * pageSize, page * pageSize - 1);
      setPayments(data || []);
      setTotal(count || 0);
      setLoading(false);
    })();
  }, [search, statusFilter, page]); // eslint-disable-line

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      <div><h2 className="text-xl font-bold text-gray-800">Payments</h2><p className="text-sm text-gray-500">{total} payment records</p></div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Search by reference..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="form-input pl-10" /></div>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="form-input w-auto">
          <option value="">All Status</option><option value="pending">Pending</option><option value="successful">Successful</option><option value="failed">Failed</option><option value="refunded">Refunded</option>
        </select>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-primary" /></div> : (
          <div className="overflow-x-auto"><table className="data-table"><thead><tr><th>Reference</th><th>User</th><th>Amount</th><th>Method</th><th>Status</th><th>Date</th></tr></thead><tbody>
            {payments.map((p, i) => { const u = p.users as Record<string, string> | null; return (
              <tr key={i}><td className="font-mono text-xs">{(p.reference as string)?.substring(0, 20)}</td>
              <td>{u?.first_name} {u?.last_name}</td>
              <td className="font-semibold">{formatMoney(p.amount as number)}</td>
              <td className="capitalize text-gray-500">{(p.payment_method as string) || 'N/A'}</td>
              <td><span className={`badge ${p.status === 'successful' ? 'badge-success' : p.status === 'pending' ? 'badge-warning' : 'badge-danger'}`}>{p.status as string}</span></td>
              <td className="text-gray-400 text-xs">{formatDate(p.created_at as string)}</td></tr>); })}
            {payments.length === 0 && <tr><td colSpan={6} className="text-center py-10 text-gray-400">No payments found</td></tr>}
          </tbody></table></div>
        )}
        {totalPages > 1 && <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm"><span className="text-gray-500">Page {page} of {totalPages}</span><div className="flex gap-2"><button disabled={page<=1} onClick={()=>setPage(page-1)} className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-30"><ChevronLeft size={16}/></button><button disabled={page>=totalPages} onClick={()=>setPage(page+1)} className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-30"><ChevronRight size={16}/></button></div></div>}
      </div>
    </div>
  );
}
