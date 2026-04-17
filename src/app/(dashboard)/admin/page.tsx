'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { formatMoney, timeAgo, truncate, getAvatarUrl } from '@/lib/utils';
import { Users, BookOpen, UserPlus, CreditCard, GraduationCap, TrendingUp, Loader2, BarChart3, Settings, Bell, FileText, ChevronRight, Inbox } from 'lucide-react';
import Link from 'next/link';
import type { DashboardStats } from '@/types';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentEnrollments, setRecentEnrollments] = useState<Record<string, unknown>[]>([]);
  const [recentPayments, setRecentPayments] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersRes, studentsRes, teachersRes, coursesRes, pubCoursesRes, enrollRes, paymentsRes, pendingRes] = await Promise.all([
          supabase.from('users').select('*', { count: 'exact', head: true }),
          supabase.from('users').select('*', { count: 'exact', head: true }).eq('role_id', 4),
          supabase.from('users').select('*', { count: 'exact', head: true }).eq('role_id', 3),
          supabase.from('courses').select('*', { count: 'exact', head: true }),
          supabase.from('courses').select('*', { count: 'exact', head: true }).eq('is_published', true),
          supabase.from('enrollments').select('*', { count: 'exact', head: true }),
          supabase.from('payments').select('amount').eq('status', 'successful'),
          supabase.from('payments').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        ]);

        const totalRevenue = (paymentsRes.data || []).reduce((sum: number, p: { amount: number }) => sum + Number(p.amount), 0);

        setStats({
          total_users: usersRes.count || 0,
          total_students: studentsRes.count || 0,
          total_teachers: teachersRes.count || 0,
          total_courses: coursesRes.count || 0,
          published_courses: pubCoursesRes.count || 0,
          total_enrollments: enrollRes.count || 0,
          total_revenue: totalRevenue,
          pending_payments: pendingRes.count || 0,
        });

        const { data: enrollData } = await supabase.from('enrollments').select(`
          *, users!enrollments_user_id_fkey(first_name, last_name, email),
          courses!enrollments_course_id_fkey(title)
        `).order('enrolled_at', { ascending: false }).limit(5);
        setRecentEnrollments(enrollData || []);

        const { data: payData } = await supabase.from('payments').select(`
          *, users!payments_user_id_fkey(first_name, last_name)
        `).order('created_at', { ascending: false }).limit(5);
        setRecentPayments(payData || []);
      } catch (err) { console.error('Dashboard fetch error:', err); }
      setLoading(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  const statCards = [
    { label: 'Total Users', value: stats?.total_users || 0, icon: <Users size={22} />, variant: 'primary' as const },
    { label: 'Total Courses', value: stats?.total_courses || 0, icon: <BookOpen size={22} />, variant: 'secondary' as const, sub: `${stats?.published_courses || 0} published` },
    { label: 'Enrollments', value: stats?.total_enrollments || 0, icon: <GraduationCap size={22} />, variant: 'success' as const },
    { label: 'Total Revenue', value: formatMoney(stats?.total_revenue || 0), icon: <CreditCard size={22} />, variant: 'info' as const, sub: `${stats?.pending_payments || 0} pending` },
  ];

  const quickActions = [
    { label: 'Add User', href: '/admin/users', icon: <UserPlus size={24} /> },
    { label: 'Create Course', href: '/admin/courses', icon: <BookOpen size={24} /> },
    { label: 'Post Notice', href: '/admin/notices', icon: <Bell size={24} /> },
    { label: 'View Reports', href: '/admin/reports', icon: <BarChart3 size={24} /> },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">Welcome back, {user?.first_name}! 👋</h2>
        <p className="text-gray-500 text-sm mt-1">Here&apos;s what&apos;s happening with your academy today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.variant}`}>{s.icon}</div>
            <div>
              <h4 className="text-xl font-bold text-gray-800">{typeof s.value === 'number' ? s.value.toLocaleString() : s.value}</h4>
              <p className="text-xs text-gray-500">{s.label}</p>
              {s.sub && <span className="text-xs text-green-600 flex items-center gap-1 mt-1"><TrendingUp size={10} />{s.sub}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Settings size={16} className="text-yellow-500" />
          <h3 className="font-semibold text-gray-800">Quick Actions</h3>
        </div>
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((a) => (
            <Link key={a.label} href={a.href} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all text-gray-600 hover:text-primary">
              {a.icon}
              <span className="text-xs font-medium">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Enrollments */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2"><GraduationCap size={16} className="text-green-500" /> Recent Enrollments</h3>
            <Link href="/admin/enrollments" className="text-xs text-primary font-medium flex items-center gap-1">View All <ChevronRight size={12} /></Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentEnrollments.length === 0 ? (
              <div className="p-8 text-center text-gray-400"><Inbox size={32} className="mx-auto mb-2" /><p className="text-sm">No enrollments yet</p></div>
            ) : (
              recentEnrollments.map((e: Record<string, unknown>, i: number) => {
                const u = e.users as Record<string, string> | null;
                const c = e.courses as Record<string, string> | null;
                return (
                  <div key={i} className="px-6 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center"><UserPlus size={14} className="text-green-600" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 truncate">{u?.first_name} {u?.last_name}</p>
                      <p className="text-xs text-gray-400 truncate">Enrolled in &quot;{truncate(c?.title || '', 30)}&quot;</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{timeAgo(e.enrolled_at as string)}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2"><CreditCard size={16} className="text-blue-500" /> Recent Payments</h3>
            <Link href="/admin/payments" className="text-xs text-primary font-medium flex items-center gap-1">View All <ChevronRight size={12} /></Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentPayments.length === 0 ? (
              <div className="p-8 text-center text-gray-400"><CreditCard size={32} className="mx-auto mb-2" /><p className="text-sm">No payments yet</p></div>
            ) : (
              recentPayments.map((p: Record<string, unknown>, i: number) => {
                const u = p.users as Record<string, string> | null;
                return (
                  <div key={i} className="px-6 py-3 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${p.status === 'successful' ? 'bg-green-50' : 'bg-yellow-50'}`}>
                      <FileText size={14} className={p.status === 'successful' ? 'text-green-600' : 'text-yellow-600'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 truncate">{u?.first_name} {u?.last_name}</p>
                      <p className="text-xs text-gray-400">{formatMoney(p.amount as number)} · <span className={`badge text-xs ${p.status === 'successful' ? 'badge-success' : 'badge-warning'}`}>{(p.status as string)}</span></p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{timeAgo(p.created_at as string)}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* User Breakdown */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><BarChart3 size={16} className="text-primary" /> User Breakdown</h3>
          {[
            { label: 'Students', count: stats?.total_students || 0, color: 'bg-primary' },
            { label: 'Teachers', count: stats?.total_teachers || 0, color: 'bg-secondary' },
            { label: 'Admins', count: (stats?.total_users || 0) - (stats?.total_students || 0) - (stats?.total_teachers || 0), color: 'bg-info' },
          ].map((item) => (
            <div key={item.label} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-semibold">{item.count}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${stats?.total_users ? (item.count / stats.total_users) * 100 : 0}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">System Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              ['Site Name', 'Prince Digital Academy'],
              ['Framework', 'Next.js 16'],
              ['Database', 'Supabase PostgreSQL'],
              ['Currency', 'GHS (₵)'],
              ['SMS Provider', 'AfricasTalking'],
              ['Payment', 'Paystack'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">{k}</span>
                <span className="text-sm font-semibold text-gray-700">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
