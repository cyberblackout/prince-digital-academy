'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { BookOpen, Users, Video, ClipboardList, GraduationCap, TrendingUp, Loader2, ChevronRight, Inbox } from 'lucide-react';
import Link from 'next/link';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ courses: 0, students: 0, assignments: 0, liveClasses: 0 });
  const [recentCourses, setRecentCourses] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (!user) return;
    async function fetchData() {
      try {
        const [coursesRes, assignRes, liveRes] = await Promise.all([
          supabase.from('courses').select('*', { count: 'exact', head: true }).eq('teacher_id', user!.id),
          supabase.from('assignments').select('*', { count: 'exact', head: true }).eq('teacher_id', user!.id),
          supabase.from('live_classes').select('*', { count: 'exact', head: true }).eq('instructor_id', user!.id),
        ]);

        const { count: studentCount } = await supabase
          .from('enrollments')
          .select('user_id', { count: 'exact', head: true })
          .in('course_id', (await supabase.from('courses').select('id').eq('teacher_id', user!.id)).data?.map((c: { id: number }) => c.id) || []);

        setStats({
          courses: coursesRes.count || 0,
          students: studentCount || 0,
          assignments: assignRes.count || 0,
          liveClasses: liveRes.count || 0,
        });

        const { data } = await supabase.from('courses').select('*').eq('teacher_id', user!.id).order('created_at', { ascending: false }).limit(5);
        setRecentCourses(data || []);
      } catch (err) { console.error(err); }
      setLoading(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">Welcome, {user?.first_name}! 📚</h2>
        <p className="text-gray-500 text-sm mt-1">Manage your courses, assignments, and students.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'My Courses', value: stats.courses, icon: <BookOpen size={22} />, variant: 'primary' },
          { label: 'My Students', value: stats.students, icon: <Users size={22} />, variant: 'secondary' },
          { label: 'Assignments', value: stats.assignments, icon: <ClipboardList size={22} />, variant: 'success' },
          { label: 'Live Classes', value: stats.liveClasses, icon: <Video size={22} />, variant: 'info' },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.variant}`}>{s.icon}</div>
            <div>
              <h4 className="text-xl font-bold text-gray-800">{s.value}</h4>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">My Courses</h3>
            <Link href="/teacher/courses" className="text-xs text-primary font-medium flex items-center gap-1">View All <ChevronRight size={12} /></Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentCourses.length === 0 ? (
              <div className="p-8 text-center text-gray-400"><Inbox size={32} className="mx-auto mb-2" /><p className="text-sm">No courses yet</p></div>
            ) : (
              recentCourses.map((c: Record<string, unknown>) => (
                <div key={c.id as number} className="px-6 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><BookOpen size={14} className="text-primary" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">{c.title as string}</p>
                    <p className="text-xs text-gray-400">{c.is_published ? '✅ Published' : '📝 Draft'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Create Course', href: '/teacher/courses', icon: <BookOpen size={20} /> },
              { label: 'Add Assignment', href: '/teacher/assignments', icon: <ClipboardList size={20} /> },
              { label: 'Schedule Class', href: '/teacher/live-classes', icon: <Video size={20} /> },
              { label: 'View Results', href: '/teacher/results', icon: <TrendingUp size={20} /> },
            ].map((a) => (
              <Link key={a.label} href={a.href} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all text-gray-500 hover:text-primary">
                {a.icon}
                <span className="text-xs font-medium">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
