"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PublicNavbar from '@/components/layout/PublicNavbar';
import Footer from '@/components/layout/Footer';
import { BookOpen, Video, Users, Award, ArrowRight, BookMarked, TrendingUp, Shield, Globe, Star } from 'lucide-react';

const features = [
  { icon: <Users size={24} />, title: 'Expert Educators', desc: 'Learn from qualified teachers with years of experience' },
  { icon: <Video size={24} />, title: 'Live Classes', desc: 'Interactive sessions via Google Meet and Zoom' },
  { icon: <BookOpen size={24} />, title: 'Quality Content', desc: 'Well-structured lessons and comprehensive materials' },
  { icon: <TrendingUp size={24} />, title: 'Track Progress', desc: 'Monitor your performance with detailed analytics' },
];

const categories = [
  { icon: '📚', title: 'JHS', desc: 'Math, Science, Social', slug: 'jhs' },
  { icon: '🔬', title: 'Science', desc: 'Chem, Bio, Physics', slug: 'science' },
  { icon: '💼', title: 'Business', desc: 'Accounts, Economics', slug: 'business' },
  { icon: '🎨', title: 'Arts', desc: 'Design, Fine Art', slug: 'arts' },
  { icon: '🌾', title: 'Agriculture', desc: 'Crop, Animal Science', slug: 'agriculture' },
  { icon: '🎓', title: 'SHS General', desc: 'All Streams', slug: 'general' },
];

const courses = [
  { title: 'Core Mathematics for SHS', category: 'Science', teacher: 'Mr. Kofi Asante', price: 50, image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop', students: 120, lessons: 24 },
  { title: 'English Language Mastery', category: 'General', teacher: 'Mrs. Ama Mensah', price: 45, image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop', students: 89, lessons: 18 },
  { title: 'Integrated Science JHS', category: 'JHS', teacher: 'Mr. Yaw Boateng', price: 0, image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop', students: 156, lessons: 30 },
  { title: 'Financial Accounting SHS', category: 'Business', teacher: 'Mr. Daniel Osei', price: 60, image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop', students: 67, lessons: 22 },
];

const stats = [
  { value: '500+', label: 'Students' },
  { value: '50+', label: 'Courses' },
  { value: '20+', label: 'Teachers' },
  { value: '95%', label: 'Pass Rate' },
];

const testimonials = [
  { name: 'Kofi Mensah', role: 'SHS 3 Student', quote: 'Excellent platform! The lessons are well-structured and easy to follow.', avatar: 'KM' },
  { name: 'Ama Serwaa', title: 'JHS 3 Student', quote: 'Live classes help me understand difficult topics better. Highly recommend!', avatar: 'AS' },
  { name: 'Daniel Ofosu', title: 'WASSCE Candidate', quote: 'The practice quizzes helped me score high in my exams. Thank you!', avatar: 'DO' },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <PublicNavbar />

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={`space-y-6 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/80">Ghana&apos;s Leading Online Learning Platform</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Quality Education{' '}
                <span className="text-secondary">For Everyone</span>
              </h1>

              <p className="text-base sm:text-lg text-white/70 max-w-xl">
                Join thousands of students across Ghana learning from expert teachers. 
                Access JHS, SHS, and professional courses from any device.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/courses" className="btn-primary-professional">
                  Browse Courses
                  <ArrowRight size={18} />
                </Link>
                <Link href="/register" className="btn-outline-professional">
                  Get Started Free
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-xl sm:text-2xl font-bold">{s.value}</p>
                    <p className="text-xs text-white/50">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`hidden lg:block relative ${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
                  <div className="grid grid-cols-2 gap-4">
                    {categories.slice(0, 4).map((cat) => (
                      <div key={cat.slug} className="bg-white/5 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors cursor-pointer">
                        <span className="text-3xl mb-2 block">{cat.icon}</span>
                        <p className="font-semibold text-sm">{cat.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <TrendingUp size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">95% Pass Rate</p>
                      <p className="text-xs text-gray-500">Proven Results</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Why Students Choose Us
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We combine quality education with modern technology to deliver the best learning experience
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`professional-card ${mounted ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="professional-icon">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Browse by Category
            </h2>
            <p className="text-gray-500">Find courses tailored to your academic level and goals</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/courses?category=${cat.slug}`}
                className={`professional-category-card ${mounted ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="text-3xl">{cat.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{cat.title}</h3>
                  <p className="text-sm text-gray-500">{cat.desc}</p>
                </div>
                <ArrowRight size={20} className="text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section className="py-12 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={s.label} className={`${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.1}s` }}>
                <p className="text-3xl md:text-4xl font-bold mb-1">{s.value}</p>
                <p className="text-white/70 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Featured Courses
              </h2>
              <p className="text-gray-500 mt-1">Start learning from our most popular courses</p>
            </div>
            <Link href="/courses" className="text-primary font-medium flex items-center gap-1 hover:underline">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((c, i) => (
              <div
                key={c.title}
                className={`professional-course-card ${mounted ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                  {c.price === 0 && (
                    <span className="absolute top-3 left-3 bg-secondary text-primary-dark text-xs font-bold px-2 py-1 rounded-full">
                      FREE
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {c.category}
                  </span>
                  <h3 className="font-semibold text-gray-900 mt-2 mb-1 line-clamp-2">{c.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span>{c.lessons} lessons</span>
                    <span>{c.students} students</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.teacher)}&background=7B2D3B&color=fff&size=24`} 
                        alt={c.teacher}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-xs text-gray-500">{c.teacher}</span>
                    </div>
                    <span className={`font-bold ${c.price === 0 ? 'text-green-600' : 'text-primary'}`}>
                      {c.price === 0 ? 'Free' : `₵${c.price}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              How It Works
            </h2>
            <p className="text-gray-500">Start your learning journey in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Create Account', desc: 'Sign up for free and complete your profile', icon: <BookMarked size={28} /> },
              { num: '2', title: 'Choose Course', desc: 'Browse courses and enroll in your preferred ones', icon: <BookOpen size={28} /> },
              { num: '3', title: 'Start Learning', desc: 'Access lessons and track your progress', icon: <TrendingUp size={28} /> },
            ].map((step, i) => (
              <div
                key={step.num}
                className={`text-center ${mounted ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="relative inline-block mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                    {step.num}
                  </div>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-secondary/20 text-primary flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              What Students Say
            </h2>
            <p className="text-gray-500">Hear from our successful students</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`professional-testimonial ${mounted ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} className="fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Join thousands of students achieving their academic goals with Prince Digital Academy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-cta-primary">
              Create Free Account
              <ArrowRight size={18} />
            </Link>
            <Link href="/courses" className="btn-cta-outline">
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .btn-primary-professional {
          background: linear-gradient(135deg, #D4A12A 0%, #B4810A 100%);
          color: #5C1F2A;
          padding: 0.875rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }

        .btn-primary-professional:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(212, 161, 42, 0.3);
        }

        .btn-outline-professional {
          background: transparent;
          color: white;
          padding: 0.875rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: 2px solid rgba(255,255,255,0.3);
          transition: all 0.2s ease;
        }

        .btn-outline-professional:hover {
          background: rgba(255,255,255,0.1);
          border-color: white;
        }

        .professional-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          border: 1px solid #e5e7eb;
          transition: all 0.2s ease;
        }

        .professional-card:hover {
          border-color: #D4A12A;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }

        .professional-icon {
          width: 50px;
          height: 50px;
          border-radius: 0.75rem;
          background: linear-gradient(135deg, #7B2D3B 0%, #9B4D5B 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .professional-category-card {
          background: white;
          border-radius: 1rem;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          border: 1px solid #e5e7eb;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .professional-category-card:hover {
          border-color: #7B2D3B;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        .professional-course-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          transition: all 0.2s ease;
        }

        .professional-course-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
        }

        .professional-testimonial {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          border: 1px solid #e5e7eb;
        }

        .btn-cta-primary {
          background: white;
          color: #7B2D3B;
          padding: 1rem 2rem;
          border-radius: 0.75rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }

        .btn-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(255,255,255,0.2);
        }

        .btn-cta-outline {
          background: transparent;
          color: white;
          padding: 1rem 2rem;
          border-radius: 0.75rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: 2px solid rgba(255,255,255,0.5);
          transition: all 0.2s ease;
        }

        .btn-cta-outline:hover {
          background: rgba(255,255,255,0.1);
        }

        @media (max-width: 640px) {
          .text-3xl sm\:text-4xl {
            font-size: 1.875rem;
          }
          
          .text-4xl sm\:text-5xl {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
}