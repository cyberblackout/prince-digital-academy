'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { BookOpen, Award, Video, ClipboardList, TrendingUp, Loader2, ChevronRight, Inbox, Play, Calendar } from 'lucide-react';
import Link from 'next/link';
import { formatDateTime } from '@/lib/utils';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ enrolled: 0, completed: 0, assignments: 0, upcomingClasses: 0 });
  const [enrolledCourses, setEnrolledCourses] = useState<Record<string, unknown>[]>([]);
  const [upcomingClasses, setUpcomingClasses] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (!user) return;
    async function fetchData() {
      try {
        const [enrollRes, completedRes, assignRes] = await Promise.all([
          supabase.from('enrollments').select('*', { count: 'exact', head: true }).eq('user_id', user!.id).eq('status', 'active'),
          supabase.from('enrollments').select('*', { count: 'exact', head: true }).eq('user_id', user!.id).eq('status', 'completed'),
          supabase.from('assignment_submissions').select('*', { count: 'exact', head: true }).eq('student_id', user!.id),
        ]);

        const { data: liveData, count: liveCount } = await supabase
          .from('live_classes')
          .select('*', { count: 'exact' })
          .gte('scheduled_at', new Date().toISOString())
          .eq('status', 'scheduled')
          .order('scheduled_at', { ascending: true })
          .limit(3);

        setStats({
          enrolled: enrollRes.count || 0,
          completed: completedRes.count || 0,
          assignments: assignRes.count || 0,
          upcomingClasses: liveCount || 0,
        });

        setUpcomingClasses(liveData || []);

        const { data: courses } = await supabase
          .from('enrollments')
          .select('*, courses!enrollments_course_id_fkey(id, title, thumbnail, progress_percentage)')
          .eq('user_id', user!.id)
          .eq('status', 'active')
          .order('enrolled_at', { ascending: false })
          .limit(4);
        setEnrolledCourses(courses || []);
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
        <h2 className="text-xl font-bold text-gray-800">Welcome back, {user?.first_name}! 🎓</h2>
        <p className="text-gray-500 text-sm mt-1">Continue your learning journey today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Enrolled Courses', value: stats.enrolled, icon: <BookOpen size={22} />, variant: 'primary' },
          { label: 'Completed', value: stats.completed, icon: <Award size={22} />, variant: 'success' },
          { label: 'Assignments', value: stats.assignments, icon: <ClipboardList size={22} />, variant: 'secondary' },
          { label: 'Upcoming Classes', value: stats.upcomingClasses, icon: <Video size={22} />, variant: 'info' },
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

      <div className="grid lg:grid-cols-3 gap-6">
        {/* My Courses */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Continue Learning</h3>
            <Link href="/student/my-courses" className="text-xs text-primary font-medium flex items-center gap-1">View All <ChevronRight size={12} /></Link>
          </div>
          <div className="p-4">
            {enrolledCourses.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <Inbox size={32} className="mx-auto mb-2" />
                <p className="text-sm mb-3">No courses yet</p>
                <Link href="/student/browse-courses" className="btn-primary text-sm py-2 px-4">Browse Courses</Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {enrolledCourses.map((e: Record<string, unknown>) => {
                  const course = e.courses as Record<string, unknown> | null;
                  const progress = Number(e.progress_percentage) || 0;
                  return (
                    <Link key={e.id as number} href={`/student/learn/${course?.id}`} className="block rounded-xl border border-gray-100 p-4 hover:border-primary/30 hover:shadow-sm transition-all group">
                      <h4 className="font-medium text-sm text-gray-700 group-hover:text-primary truncate mb-2">{course?.title as string}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{progress}%</span>
                      </div>
                      <span className="text-xs text-primary font-medium flex items-center gap-1">
                        <Play size={12} /> Continue
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2"><Calendar size={16} className="text-blue-500" /> Upcoming Classes</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {upcomingClasses.length === 0 ? (
              <div className="p-8 text-center text-gray-400"><Video size={32} className="mx-auto mb-2" /><p className="text-sm">No upcoming classes</p></div>
            ) : (
              upcomingClasses.map((lc: Record<string, unknown>) => (
                <div key={lc.id as number} className="px-6 py-3">
                  <p className="text-sm font-medium text-gray-700">{lc.title as string}</p>
                  <p className="text-xs text-gray-400 mt-1">{formatDateTime(lc.scheduled_at as string)}</p>
                  {typeof lc.meeting_link === 'string' && lc.meeting_link ? (
                    <a href={lc.meeting_link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary font-medium mt-1 inline-block">
                      Join →
                    </a>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Browse Courses', href: '/student/browse-courses', icon: <BookOpen size={20} /> },
            { label: 'My Assignments', href: '/student/assignments', icon: <ClipboardList size={20} /> },
            { label: 'Take Quiz', href: '/student/quizzes', icon: <TrendingUp size={20} /> },
            { label: 'My Results', href: '/student/results', icon: <Award size={20} /> },
          ].map((a) => (
            <Link key={a.label} href={a.href} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all text-gray-500 hover:text-primary">
              {a.icon}
              <span className="text-xs font-medium">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
