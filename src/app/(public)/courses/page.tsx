'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { formatMoney } from '@/lib/utils';
import { Search, BookOpen, Users, Loader2, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Record<string, unknown>[]>([]);
  const [categories, setCategories] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      setLoading(true);
      let query = supabase.from('courses').select('*, users!courses_teacher_id_fkey(first_name, last_name), course_categories!courses_category_id_fkey(name)').eq('is_published', true);
      if (search) query = query.ilike('title', `%${search}%`);
      if (catFilter) query = query.eq('category_id', parseInt(catFilter));
      if (levelFilter) query = query.eq('level', levelFilter);
      const { data } = await query.order('created_at', { ascending: false });
      setCourses(data || []);
      setLoading(false);
    })();
  }, [search, catFilter, levelFilter]); // eslint-disable-line

  useEffect(() => { supabase.from('course_categories').select('*').eq('is_active', true).then(({ data }) => setCategories(data || [])); }, []); // eslint-disable-line

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Explore Our <span className="gradient-text">Courses</span></h1>
        <p className="text-gray-500 max-w-xl mx-auto">Master any subject with our expertly designed courses</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-4 mb-8 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input type="text" placeholder="Search courses..." value={search} onChange={(e)=>setSearch(e.target.value)} className="form-input pl-10"/></div>
        <select value={catFilter} onChange={(e)=>setCatFilter(e.target.value)} className="form-input w-auto"><option value="">All Categories</option>{categories.map((c)=><option key={c.id as number} value={c.id as number}>{c.name as string}</option>)}</select>
        <select value={levelFilter} onChange={(e)=>setLevelFilter(e.target.value)} className="form-input w-auto"><option value="">All Levels</option><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option></select>
      </div>

      {loading ? <div className="flex justify-center py-20"><Loader2 size={40} className="animate-spin text-primary"/></div> :
      courses.length === 0 ? <div className="text-center py-20 text-gray-400"><BookOpen size={48} className="mx-auto mb-3"/><p>No courses found</p></div> :
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((c) => {
          const teacher = c.users as Record<string,string>|null;
          const cat = c.course_categories as Record<string,string>|null;
          return (
            <Link key={c.id as number} href={`/courses/${c.slug}`} className="course-card block no-underline">
              <div className="course-card-image">
                <img src={(c.thumbnail as string) || `https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop`} alt={c.title as string}/>
                {Boolean(c.is_free) && <span className="course-card-badge">FREE</span>}
                {Boolean(c.is_featured) && !c.is_free && <span className="course-card-badge">⭐ Featured</span>}
              </div>
              <div className="course-card-body">
                {cat ? <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">{cat.name}</span> : null}
                <h5 className="font-semibold text-gray-800 mt-2 mb-2 text-sm leading-snug">{String(c.title)}</h5>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3"><BookOpen size={12}/> {String(c.level || '').charAt(0).toUpperCase() + String(c.level || '').slice(1)}</div>
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-2">
                    <img src={`https://ui-avatars.com/api/?name=${teacher?.first_name}+${teacher?.last_name}&background=7B2D3B&color=fff&size=24`} className="w-6 h-6 rounded-full" alt=""/>
                    <span className="text-xs text-gray-400">{teacher?.first_name} {teacher?.last_name}</span>
                  </div>
                  <span className={`font-bold text-sm ${c.is_free ? 'text-green-600' : 'text-primary'}`}>{c.is_free ? 'Free' : formatMoney(Number(c.price))}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>}
    </div>
  );
}
