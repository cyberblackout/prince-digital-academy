"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PublicNavbar from '@/components/layout/PublicNavbar';
import Footer from '@/components/layout/Footer';
import { BookOpen, Video, HelpCircle, Smartphone, GraduationCap, FlaskConical, Briefcase, Palette, Sprout, School, ChevronRight, Star, Play, Users, Award, ArrowRight, Sparkles, BookMarked, Trophy, Target } from 'lucide-react';

const features = [
  { icon: <Users size={28} />, title: 'Expert Teachers', desc: 'Learn from experienced educators who are passionate about teaching' },
  { icon: <Video size={28} />, title: 'Live Classes', desc: 'Interactive live sessions with Google Meet and Zoom integration' },
  { icon: <HelpCircle size={28} />, title: 'Quizzes & Exams', desc: 'Test your knowledge with engaging quizzes and track your progress' },
  { icon: <Smartphone size={28} />, title: 'Learn Anywhere', desc: 'Access courses on any device — mobile, tablet, or desktop' },
];

const categories = [
  { icon: <School size={32} />, title: 'JHS Students', desc: 'Mathematics, Integrated Science, Social Studies', slug: 'jhs', color: 'from-orange-400 to-orange-600' },
  { icon: <FlaskConical size={32} />, title: 'Science Students', desc: 'Chemistry, Biology, Physics, Mathematics', slug: 'science', color: 'from-emerald-400 to-emerald-600' },
  { icon: <Briefcase size={32} />, title: 'Business Students', desc: 'Accounting, Economics, Business Management', slug: 'business', color: 'from-blue-400 to-blue-600' },
  { icon: <Palette size={32} />, title: 'Visual Art Students', desc: 'Art & Design Foundation, Art Studies', slug: 'arts', color: 'from-pink-400 to-pink-600' },
  { icon: <Sprout size={32} />, title: 'Agricultural Students', desc: 'Chemistry, Physics, Agricultural Science', slug: 'agriculture', color: 'from-green-400 to-green-600' },
  { icon: <GraduationCap size={32} />, title: 'SHS General', desc: 'Core subjects and electives for all streams', slug: 'general', color: 'from-purple-400 to-purple-600' },
];

const courses = [
  { title: 'Core Mathematics for SHS', category: 'Science', teacher: 'Mr. Kofi Asante', price: 50, image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop', lessons: 24, students: 120 },
  { title: 'English Language Mastery', category: 'General', teacher: 'Mrs. Ama Mensah', price: 45, image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop', lessons: 18, students: 89 },
  { title: 'Integrated Science JHS', category: 'JHS', teacher: 'Mr. Yaw Boateng', price: 0, image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop', lessons: 30, students: 156 },
  { title: 'Financial Accounting SHS', category: 'Business', teacher: 'Mr. Daniel Osei', price: 60, image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop', lessons: 22, students: 67 },
];

const testimonials = [
  { name: 'Kofi Mensah', role: 'SHS 3 Science Student', quote: 'Prince Digital Academy helped me improve my grades significantly. The teachers explain complex topics in simple ways!', avatar: 'KM' },
  { name: 'Ama Serwaa', role: 'JHS 3 Student', quote: 'The live classes feature is amazing! I can ask questions and get instant feedback from my teachers.', avatar: 'AS' },
  { name: 'Daniel Ofosu', role: 'WASSCE Candidate', quote: 'Affordable and high-quality education. The quizzes helped me prepare well for my WASSCE exams.', avatar: 'DO' },
];

const stats = [
  { value: '500+', label: 'Active Students', icon: <Users size={20} /> },
  { value: '50+', label: 'Online Courses', icon: <BookOpen size={20} /> },
  { value: '20+', label: 'Expert Teachers', icon: <GraduationCap size={20} /> },
  { value: '95%', label: 'Success Rate', icon: <Trophy size={20} /> },
];

const steps = [
  { num: '1', title: 'Create Account', desc: 'Sign up for free and set up your student profile in minutes', icon: <Sparkles size={24} /> },
  { num: '2', title: 'Choose Course', desc: 'Browse our catalog and enroll in courses that match your goals', icon: <BookMarked size={24} /> },
  { num: '3', title: 'Start Learning', desc: 'Access lessons, take quizzes, and join live classes from anywhere', icon: <Target size={24} /> },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <PublicNavbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="hero-section relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-secondary/5 to-transparent rounded-full" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-[10%] floating-element">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <BookOpen size={24} className="text-white/60" />
            </div>
          </div>
          <div className="absolute top-48 right-[15%] floating-element" style={{ animationDelay: '0.5s' }}>
            <div className="w-12 h-12 rounded-xl bg-secondary/20 backdrop-blur-sm flex items-center justify-center">
              <Video size={20} className="text-secondary" />
            </div>
          </div>
          <div className="absolute bottom-32 left-[20%] floating-element" style={{ animationDelay: '1s' }}>
            <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Award size={22} className="text-white/60" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-sm border border-white/20">
                <Star size={14} className="text-secondary fill-secondary" />
                <span className="text-white/90">Smart Learning, Real Results</span>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-white">Unlock Your</span>
                <br />
                <span className="gradient-text-secondary">Potential</span>
                <br />
                <span className="text-white">With Quality Education</span>
              </h1>

              <p className="text-lg text-white/70 max-w-xl leading-relaxed">
                Join thousands of students learning from expert teachers. Master JHS, SHS, and professional courses from anywhere in Ghana.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/courses" className="btn-hero group">
                  <Play size={18} />
                  <span>Explore Courses</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/register" className="btn-hero-outline">
                  <span>Get Started Free</span>
                  <ChevronRight size={18} />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4">
                {stats.map((s, i) => (
                  <div key={s.label} className={`text-center ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.1}s` }}>
                    <p className="text-3xl md:text-4xl font-bold text-white">{s.value}</p>
                    <p className="text-sm text-white/50">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`hidden lg:block relative ${mounted ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                {/* Main Visual */}
                <div className="w-full aspect-square max-w-md mx-auto relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary/30 to-primary/30 blur-2xl" />
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-2xl p-6 text-center hover:bg-white/20 transition-colors cursor-pointer">
                        <GraduationCap size={40} className="text-secondary mx-auto mb-2" />
                        <p className="text-white font-semibold">JHS</p>
                      </div>
                      <div className="bg-white/10 rounded-2xl p-6 text-center hover:bg-white/20 transition-colors cursor-pointer">
                        <FlaskConical size={40} className="text-emerald-400 mx-auto mb-2" />
                        <p className="text-white font-semibold">Science</p>
                      </div>
                      <div className="bg-white/10 rounded-2xl p-6 text-center hover:bg-white/20 transition-colors cursor-pointer">
                        <Briefcase size={40} className="text-blue-400 mx-auto mb-2" />
                        <p className="text-white font-semibold">Business</p>
                      </div>
                      <div className="bg-white/10 rounded-2xl p-6 text-center hover:bg-white/20 transition-colors cursor-pointer">
                        <Palette size={40} className="text-pink-400 mx-auto mb-2" />
                        <p className="text-white font-semibold">Arts</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-2xl p-4 floating-card">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Trophy size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">95% Success</p>
                      <p className="text-xs text-gray-500">Pass Rate</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-2xl p-4 floating-card" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Video size={20} className="text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">Live Classes</p>
                      <p className="text-xs text-gray-500">Interactive</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles size={16} />
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Why Choose <span className="gradient-text-primary">Prince Digital</span> Academy?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">We provide everything you need to succeed in your academic journey</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`feature-card group ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="feature-icon">
                  {f.icon}
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{f.title}</h4>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CATEGORIES ═══════════ */}
      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary-dark px-4 py-2 rounded-full text-sm font-medium mb-4">
              <School size={16} />
              Browse Categories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Find Your <span className="gradient-text-primary">Perfect Course</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">Explore courses designed for every level and aspiration</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/courses?category=${cat.slug}`}
                className={`category-card group ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`category-icon bg-gradient-to-br ${cat.color}`}>
                  {cat.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors">{cat.title}</h4>
                  <p className="text-sm text-gray-500">{cat.desc}</p>
                </div>
                <div className="category-arrow">
                  <ArrowRight size={20} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section className="gradient-hero py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`text-center ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm mb-4">
                  {s.icon}
                </div>
                <p className="text-4xl md:text-5xl font-bold text-white mb-1">{s.value}</p>
                <p className="text-white/60 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURED COURSES ═══════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BookOpen size={16} />
              Featured Courses
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Start Learning <span className="gradient-text-primary">Today</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">Start learning from our most popular courses</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((c, i) => (
              <div
                key={c.title}
                className={`course-card-2 group ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="course-card-image-2">
                  <img src={c.image} alt={c.title} />
                  {c.price === 0 && <span className="course-badge-free">FREE</span>}
                  <div className="course-card-overlay">
                    <Link href={`/courses/${c.title.toLowerCase().replace(/ /g, '-')}`} className="btn-preview">
                      View Course
                    </Link>
                  </div>
                </div>
                <div className="course-card-body-2">
                  <span className="course-category">{c.category}</span>
                  <h5 className="course-title">{c.title}</h5>
                  <div className="course-meta">
                    <span><BookOpen size={14} /> {c.lessons} Lessons</span>
                    <span><Users size={14} /> {c.students}</span>
                  </div>
                  <div className="course-footer">
                    <div className="flex items-center gap-2">
                      <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.teacher)}&background=7B2D3B&color=fff&size=32`} alt={c.teacher} className="w-8 h-8 rounded-full" />
                      <span className="text-sm text-gray-500">{c.teacher}</span>
                    </div>
                    <span className={`course-price ${c.price === 0 ? 'text-green-600' : 'text-primary'}`}>
                      {c.price === 0 ? 'Free' : `₵${c.price}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/courses" className="btn-primary-lg">
              View All Courses
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path d="M0,100 Q300,50 600,100 T1200,100" fill="none" stroke="rgba(123,45,59,0.05)" strokeWidth="2" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary-dark px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Target size={16} />
              Get Started
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              How It <span className="gradient-text-primary">Works</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">Start your learning journey in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-secondary/40 to-primary/20 -translate-y-1/2 z-0" />

            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`step-card relative z-10 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="step-number">{step.num}</div>
                <div className="step-icon">
                  {step.icon}
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{step.title}</h4>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star size={16} />
              Testimonials
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              What <span className="gradient-text-primary">Students Say</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">Hear from students who have transformed their learning with us</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`testimonial-card ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} className="fill-secondary text-secondary" />)}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="gradient-hero py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-secondary/20 rounded-full animate-float" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <div className={`${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-8">
              <Award size={40} className="text-secondary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Start Your Learning Journey?</h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of students across Ghana who are achieving their academic goals with Prince Digital Academy
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register" className="btn-hero group">
                <span>🚀 Get Started Now</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/courses" className="btn-hero-outline">
                <span>Browse Courses</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .gradient-text-primary {
          background: linear-gradient(135deg, #7B2D3B 0%, #D4A12A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gradient-text-secondary {
          background: linear-gradient(135deg, #D4A12A 0%, #E4B84A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .floating-element {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .floating-card {
          animation: float 4s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .btn-hero {
          background: linear-gradient(135deg, #D4A12A 0%, #B4810A 100%);
          color: #5C1F2A;
          padding: 1rem 1.5rem;
          border-radius: 1rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .btn-hero:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(212, 161, 42, 0.4);
        }

        .btn-hero-outline {
          background: transparent;
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 1rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          border: 2px solid rgba(255,255,255,0.3);
          cursor: pointer;
        }

        .btn-hero-outline:hover {
          background: rgba(255,255,255,0.1);
          border-color: white;
        }

        .feature-card {
          background: white;
          border-radius: 1.5rem;
          padding: 2rem;
          text-align: center;
          border: 1px solid rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(123, 45, 59, 0.1);
        }

        .feature-icon {
          width: 70px;
          height: 70px;
          border-radius: 1.5rem;
          background: linear-gradient(135deg, #7B2D3B 0%, #9B4D5B 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          transition: all 0.3s ease;
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .category-card {
          background: white;
          border-radius: 1.5rem;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          border: 1px solid rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .category-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.08);
        }

        .category-icon {
          width: 60px;
          height: 60px;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .category-arrow {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f8f5f2;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7B2D3B;
          transition: all 0.3s ease;
        }

        .category-card:hover .category-arrow {
          background: #7B2D3B;
          color: white;
          transform: translateX(4px);
        }

        .course-card-2 {
          background: white;
          border-radius: 1.5rem;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }

        .course-card-2:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .course-card-image-2 {
          position: relative;
          height: 180px;
          overflow: hidden;
        }

        .course-card-image-2 img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .course-card-2:hover .course-card-image-2 img {
          transform: scale(1.1);
        }

        .course-badge-free {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: #D4A12A;
          color: #5C1F2A;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .course-card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(123, 45, 59, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .course-card-2:hover .course-card-overlay {
          opacity: 1;
        }

        .btn-preview {
          background: white;
          color: #7B2D3B;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 600;
          text-decoration: none;
        }

        .course-card-body-2 {
          padding: 1.5rem;
        }

        .course-category {
          font-size: 0.75rem;
          font-weight: 600;
          color: #7B2D3B;
          background: rgba(123, 45, 59, 0.1);
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
        }

        .course-title {
          font-size: 1rem;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0.75rem 0;
          line-height: 1.4;
        }

        .course-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.875rem;
          color: #718096;
          margin-bottom: 1rem;
        }

        .course-meta span {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .course-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }

        .course-price {
          font-weight: 700;
          font-size: 1.125rem;
        }

        .step-card {
          background: white;
          border-radius: 1.5rem;
          padding: 2rem;
          text-align: center;
          border: 1px solid rgba(0,0,0,0.05);
        }

        .step-number {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #7B2D3B 0%, #D4A12A 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .step-icon {
          width: 70px;
          height: 70px;
          border-radius: 1.5rem;
          background: linear-gradient(135deg, #D4A12A 0%, #E4B84A 100%);
          color: #5C1F2A;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 1rem auto 1.5rem;
        }

        .testimonial-card {
          background: white;
          border-radius: 1.5rem;
          padding: 2rem;
          border: 1px solid rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.08);
        }

        .btn-primary-lg {
          background: linear-gradient(135deg, #7B2D3B 0%, #9B4D5B 100%);
          color: white;
          padding: 1rem 2rem;
          border-radius: 1rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .btn-primary-lg:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(123, 45, 59, 0.3);
        }
      `}</style>
    </>
  );
}