import Link from 'next/link';
import PublicNavbar from '@/components/layout/PublicNavbar';
import Footer from '@/components/layout/Footer';
import { BookOpen, Video, HelpCircle, Smartphone, GraduationCap, FlaskConical, Briefcase, Palette, Sprout, School, ChevronRight, Star, Play, Users, Award } from 'lucide-react';

const features = [
  { icon: <Users size={28} />, title: 'Expert Teachers', desc: 'Learn from experienced educators who are passionate about teaching' },
  { icon: <Video size={28} />, title: 'Live Classes', desc: 'Interactive live sessions with Google Meet and Zoom integration' },
  { icon: <HelpCircle size={28} />, title: 'Quizzes & Exams', desc: 'Test your knowledge with engaging quizzes and track your progress' },
  { icon: <Smartphone size={28} />, title: 'Learn Anywhere', desc: 'Access courses on any device — mobile, tablet, or desktop' },
];

const categories = [
  { icon: <School size={32} />, title: 'JHS Students', desc: 'Mathematics, Integrated Science, Social Studies', slug: 'jhs' },
  { icon: <FlaskConical size={32} />, title: 'Science Students', desc: 'Chemistry, Biology, Physics, Mathematics', slug: 'science' },
  { icon: <Briefcase size={32} />, title: 'Business Students', desc: 'Accounting, Economics, Business Management', slug: 'business' },
  { icon: <Palette size={32} />, title: 'Visual Art Students', desc: 'Art & Design Foundation, Art Studies', slug: 'arts' },
  { icon: <Sprout size={32} />, title: 'Agricultural Students', desc: 'Chemistry, Physics, Agricultural Science', slug: 'agriculture' },
  { icon: <GraduationCap size={32} />, title: 'SHS General', desc: 'Core subjects and electives for all streams', slug: 'general' },
];

const courses = [
  { title: 'Core Mathematics for SHS', category: 'Science', teacher: 'Mr. Kofi Asante', price: 50, image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop' },
  { title: 'English Language Mastery', category: 'General', teacher: 'Mrs. Ama Mensah', price: 45, image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop' },
  { title: 'Integrated Science JHS', category: 'JHS', teacher: 'Mr. Yaw Boateng', price: 0, image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop' },
  { title: 'Financial Accounting SHS', category: 'Business', teacher: 'Mr. Daniel Osei', price: 60, image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop' },
];

const testimonials = [
  { name: 'Kofi Mensah', role: 'SHS 3 Science Student', quote: 'Prince Digital Academy helped me improve my grades significantly. The teachers explain complex topics in simple ways!' },
  { name: 'Ama Serwaa', role: 'JHS 3 Student', quote: 'The live classes feature is amazing! I can ask questions and get instant feedback from my teachers.' },
  { name: 'Daniel Ofosu', role: 'WASSCE Candidate', quote: 'Affordable and high-quality education. The quizzes helped me prepare well for my WASSCE exams.' },
];

const stats = [
  { value: '500+', label: 'Active Students' },
  { value: '50+', label: 'Online Courses' },
  { value: '20+', label: 'Expert Teachers' },
  { value: '95%', label: 'Success Rate' },
];

export default function HomePage() {
  return (
    <>
      <PublicNavbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="hero-section relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-secondary mb-6">
                <Star size={14} className="fill-secondary" />
                Smart Learning, Real Results
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Unlock Your{' '}
                <span className="text-secondary">Potential</span>{' '}
                With Quality Education
              </h1>
              <p className="text-lg text-white/70 mb-8 max-w-lg">
                Join thousands of students learning from expert teachers. Master JHS, SHS, and professional courses from anywhere in Ghana.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/courses" className="btn-secondary py-3 px-6 text-base">
                  <Play size={18} /> Explore Courses
                </Link>
                <Link href="/register" className="border-2 border-white/30 text-white py-3 px-6 rounded-xl font-semibold hover:bg-white/10 transition-all inline-flex items-center gap-2">
                  Get Started Free <ChevronRight size={18} />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12">
                {[{ v: '500+', l: 'Students' }, { v: '50+', l: 'Courses' }, { v: '20+', l: 'Teachers' }].map((s) => (
                  <div key={s.l} className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-white">{s.v}</p>
                    <p className="text-sm text-white/50">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-secondary/20 animate-pulse-glow" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <GraduationCap size={120} className="text-white/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Why Choose <span className="text-secondary">Prince Digital</span> Academy?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">We provide everything you need to succeed in your academic journey</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-surface rounded-2xl p-6 text-center card-hover group">
                <div className="w-16 h-16 rounded-2xl gradient-primary text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{f.title}</h4>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CATEGORIES ═══════════ */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Browse by <span className="text-secondary">Category</span>
            </h2>
            <p className="text-gray-500">Find the perfect course for your academic needs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/courses?category=${cat.slug}`}
                className="bg-white rounded-2xl p-6 text-center card-hover group block no-underline"
              >
                <div className="text-primary mb-3 group-hover:scale-110 transition-transform inline-block">{cat.icon}</div>
                <h4 className="font-semibold text-gray-800 mb-2">{cat.title}</h4>
                <p className="text-sm text-gray-500 mb-3">{cat.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Explore <ChevronRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section className="gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">{s.value}</p>
                <p className="text-white/60 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURED COURSES ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Featured <span className="text-secondary">Courses</span>
            </h2>
            <p className="text-gray-500">Start learning from our most popular courses</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((c) => (
              <div key={c.title} className="course-card">
                <div className="course-card-image">
                  <img src={c.image} alt={c.title} />
                  {c.price === 0 && <span className="course-card-badge">FREE</span>}
                </div>
                <div className="course-card-body">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">{c.category}</span>
                  <h5 className="font-semibold text-gray-800 mt-2 mb-2 text-sm leading-snug">{c.title}</h5>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <BookOpen size={12} /> 10 hrs
                    <span className="mx-1">•</span>
                    <Users size={12} /> 120
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.teacher)}&background=7B2D3B&color=fff&size=24`}
                        alt={c.teacher}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-xs text-gray-400">{c.teacher}</span>
                    </div>
                    <span className={`font-bold text-sm ${c.price === 0 ? 'text-green-600' : 'text-primary'}`}>
                      {c.price === 0 ? 'Free' : `₵${c.price.toFixed(2)}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/courses" className="btn-primary py-3 px-8 text-base">
              View All Courses <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              How It <span className="text-secondary">Works</span>
            </h2>
            <p className="text-gray-500">Start your learning journey in 3 simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Create Account', desc: 'Sign up for free and set up your student profile in minutes' },
              { num: '2', title: 'Choose Course', desc: 'Browse our catalog and enroll in courses that match your goals' },
              { num: '3', title: 'Start Learning', desc: 'Access lessons, take quizzes, and join live classes from anywhere' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-20 h-20 rounded-full gradient-secondary flex items-center justify-center mx-auto mb-5">
                  <span className="text-2xl font-bold text-primary-dark">{step.num}</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              What Our <span className="text-secondary">Students</span> Say
            </h2>
            <p className="text-gray-500">Hear from students who have transformed their learning with us</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-surface rounded-2xl p-6 card-hover">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map((s) => <Star key={s} size={16} className="fill-secondary text-secondary" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=D4A12A&color=7B2D3B&size=40`}
                    alt={t.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="gradient-hero py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-secondary" />
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-secondary" />
        </div>
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <Award size={48} className="text-secondary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-white/70 mb-8 text-lg">
            Join thousands of students across Ghana who are achieving their academic goals with Prince Digital Academy
          </p>
          <Link href="/register" className="btn-secondary py-3 px-8 text-lg">
            🚀 Get Started Now — It&apos;s Free!
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
