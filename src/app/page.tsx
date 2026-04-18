"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PublicNavbar from '@/components/layout/PublicNavbar';
import Footer from '@/components/layout/Footer';
import { BookOpen, Video, HelpCircle, Smartphone, GraduationCap, FlaskConical, Briefcase, Palette, Sprout, School, ChevronRight, Star, Play, Users, Award, Sparkles, ArrowRight } from 'lucide-react';

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
  { title: 'Core Mathematics for SHS', category: 'Science', teacher: 'Mr. Kofi Asante', price: 50, image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop', lessons: 24, students: 120 },
  { title: 'English Language Mastery', category: 'General', teacher: 'Mrs. Ama Mensah', price: 45, image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop', lessons: 18, students: 89 },
  { title: 'Integrated Science JHS', category: 'JHS', teacher: 'Mr. Yaw Boateng', price: 0, image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop', lessons: 30, students: 156 },
  { title: 'Financial Accounting SHS', category: 'Business', teacher: 'Mr. Daniel Osei', price: 60, image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop', lessons: 22, students: 67 },
];

const testimonials = [
  { name: 'Kofi Mensah', role: 'SHS 3 Science Student', quote: 'Prince Digital Academy helped me improve my grades significantly. The teachers explain complex topics in simple ways!' },
  { name: 'Ama Serwaa', role: 'JHS 3 Student', quote: 'The live classes feature is amazing! I can ask questions and get instant feedback from my teachers.' },
  { name: 'Daniel Ofosu', role: 'WASSCE Candidate', quote: 'Affordable and high-quality education. The quizzes helped me prepare well for my WASSCE exams.' },
];

const stats = [
  { value: '500+', label: 'Active Students', suffix: '' },
  { value: '50+', label: 'Online Courses', suffix: '' },
  { value: '20+', label: 'Expert Teachers', suffix: '' },
  { value: '95%', label: 'Success Rate', suffix: '%' },
];

const steps = [
  { num: '1', title: 'Create Account', desc: 'Sign up for free and set up your student profile in minutes' },
  { num: '2', title: 'Choose Course', desc: 'Browse our catalog and enroll in courses that match your goals' },
  { num: '3', title: 'Start Learning', desc: 'Access lessons, take quizzes, and join live classes from anywhere' },
];

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`anim-section-${delay}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [hasAnimated, delay]);

  return (
    <div
      id={`anim-section-${delay}`}
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay * 100}ms` }}
    >
      {children}
    </div>
  );
}

function AnimatedCard({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`anim-card-${delay}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [hasAnimated, delay]);

  return (
    <div
      id={`anim-card-${delay}`}
      className={`transition-all duration-500 ease-out hover:-translate-y-2 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      style={{ transitionDelay: `${delay * 80}ms` }}
    >
      {children}
    </div>
  );
}

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
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="position-absolute top-0 end-0 w-75 h-75 bg-secondary opacity-25 rounded-circle blur-5" />
          <div className="position-absolute bottom-0 start-0 w-75 h-75 bg-primary opacity-25 rounded-circle blur-5" />
        </div>

        <div className="container py-5 py-md-5 py-lg-5 position-relative z-1">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <div className={`${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
                {/* Badge */}
                <div className="d-inline-flex align-items-center gap-2 bg-white bg-opacity-25 backdrop-filter rounded-pill px-4 py-2 mb-4">
                  <Sparkles size={16} className="text-warning" />
                  <span className="text-white small fw-medium">Smart Learning, Real Results</span>
                  <span className="badge bg-success rounded-circle p-1">
                    <span className="visually-hidden">New</span>
                  </span>
                </div>

                {/* Heading */}
                <h1 className="display-4 display-md-3 fw-bold text-white mb-4 lh-base">
                  Unlock Your <span className="text-warning">Potential</span> <br />
                  <span className="fw-normal text-white-50">With Quality Education</span>
                </h1>

                {/* Description */}
                <p className="lead text-white-50 mb-4 pe-lg-5">
                  Join thousands of students learning from expert teachers. Master JHS, SHS, and professional courses from anywhere in Ghana.
                </p>

                {/* Buttons */}
                <div className="d-flex flex-wrap gap-3 mb-5">
                  <Link href="/courses" className="btn btn-warning btn-lg fw-semibold shadow-lg hover-scale">
                    <Play size={20} /> Explore Courses
                  </Link>
                  <Link href="/register" className="btn btn-outline-light btn-lg fw-semibold hover-scale">
                    Get Started Free <ChevronRight size={20} />
                  </Link>
                </div>

                {/* Stats */}
                <div className="row text-center g-3 g-md-4">
                  <div className="col-4">
                    <div className="p-3">
                      <h3 className="h2 fw-bold text-white mb-1">500+</h3>
                      <p className="text-white-50 small mb-0">Students</p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-3">
                      <h3 className="h2 fw-bold text-white mb-1">50+</h3>
                      <p className="text-white-50 small mb-0">Courses</p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-3">
                      <h3 className="h2 fw-bold text-white mb-1">20+</h3>
                      <p className="text-white-50 small mb-0">Teachers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Visual */}
            <div className="col-12 col-lg-6 d-none d-lg-block">
              <div className={`${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                <div className="position-relative text-center">
                  <div className="position-relative d-inline-block">
                    <div className="bg-white bg-opacity-10 rounded-circle p-5 backdrop-filter" style={{ width: '280px', height: '280px' }}>
                      <GraduationCap size={120} className="text-white opacity-25" />
                    </div>
                    {/* Floating Badge */}
                    <div className="position-absolute top-0 end-0 bg-warning rounded-pill px-3 py-2 shadow-lg animate-pulse">
                      <span className="fw-bold text-dark">95% Pass Rate</span>
                    </div>
                    {/* Floating Card */}
                    <div className="position-absolute bottom-0 start-0 bg-white rounded-3 shadow-lg p-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-success bg-opacity-25 rounded-circle p-2">
                          <Users size={20} className="text-success" />
                        </div>
                        <div>
                          <p className="fw-bold text-dark mb-0 small">Active Students</p>
                          <p className="text-success mb-0 small fw-bold">500+ Online</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection delay={0}>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                Why Choose <span className="text-secondary">Prince Digital</span> Academy?
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">We provide everything you need to succeed in your academic journey</p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <AnimatedCard key={f.title} delay={i}>
                <div className="bg-surface rounded-2xl p-6 text-center card-hover group h-full">
                  <div className="w-16 h-16 rounded-2xl gradient-primary text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    {f.icon}
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-primary transition-colors">{f.title}</h4>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CATEGORIES ═══════════ */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection delay={0}>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                Browse by <span className="text-secondary">Category</span>
              </h2>
              <p className="text-gray-500">Find the perfect course for your academic needs</p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <AnimatedCard key={cat.slug} delay={i}>
                <Link
                  href={`/courses?category=${cat.slug}`}
                  className="bg-white rounded-2xl p-6 text-center card-hover group block no-underline h-full"
                >
                  <div className="text-primary mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 inline-block">{cat.icon}</div>
                  <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-primary transition-colors">{cat.title}</h4>
                  <p className="text-sm text-gray-500 mb-3">{cat.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                    Explore <ChevronRight size={14} />
                  </span>
                </Link>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section className="gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <AnimatedCard key={s.label} delay={i}>
                <div className="text-center hover:scale-110 transition-transform duration-300">
                  <p className="text-3xl md:text-4xl font-bold text-white mb-1">{s.value}</p>
                  <p className="text-white/60 text-sm">{s.label}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURED COURSES ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection delay={0}>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                Featured <span className="text-secondary">Courses</span>
              </h2>
              <p className="text-gray-500">Start learning from our most popular courses</p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((c, i) => (
              <AnimatedCard key={c.title} delay={i}>
                <div className="course-card group">
                  <div className="course-card-image overflow-hidden">
                    <img src={c.image} alt={c.title} className="group-hover:scale-110 transition-transform duration-500" />
                    {c.price === 0 && <span className="course-card-badge">FREE</span>}
                  </div>
                  <div className="course-card-body">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">{c.category}</span>
                    <h5 className="font-semibold text-gray-800 mt-2 mb-2 text-sm leading-snug group-hover:text-primary transition-colors">{c.title}</h5>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <BookOpen size={12} /> {c.lessons} hrs
                      <span className="mx-1">•</span>
                      <Users size={12} /> {c.students}
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
              </AnimatedCard>
            ))}
          </div>
          <AnimatedSection delay={2}>
            <div className="text-center mt-10">
              <Link href="/courses" className="btn-primary py-3 px-8 text-base hover:scale-105 hover:shadow-lg transition-all">
                View All Courses <ChevronRight size={18} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection delay={0}>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                How It <span className="text-secondary">Works</span>
              </h2>
              <p className="text-gray-500">Start your learning journey in 3 simple steps</p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <AnimatedCard key={step.num} delay={i}>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full gradient-secondary flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-primary-dark">{step.num}</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-primary transition-colors">{step.title}</h4>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection delay={0}>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                What Our <span className="text-secondary">Students</span> Say
              </h2>
              <p className="text-gray-500">Hear from students who have transformed their learning with us</p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedCard key={t.name} delay={i}>
                <div className="bg-surface rounded-2xl p-6 card-hover group h-full">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map((s) => <Star key={s} size={16} className="fill-secondary text-secondary group-hover:scale-110 transition-transform" style={{ animationDelay: `${s * 0.1}s` }} />)}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=D4A12A&color=7B2D3B&size=40`}
                      alt={t.name}
                      className="w-10 h-10 rounded-full group-hover:scale-110 transition-transform"
                    />
                    <div>
                      <p className="font-semibold text-sm text-gray-800">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="gradient-hero py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-secondary animate-pulse" />
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-secondary animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <AnimatedSection delay={0}>
          <div className="max-w-3xl mx-auto px-4 relative z-10">
            <Award size={48} className="text-secondary mx-auto mb-6 animate-bounce" style={{ animationDuration: '2s' }} />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Learning Journey?</h2>
            <p className="text-white/70 mb-8 text-lg">
              Join thousands of students across Ghana who are achieving their academic goals with Prince Digital Academy
            </p>
            <Link href="/register" className="btn-secondary py-3 px-8 text-lg hover:scale-105 transition-transform inline-flex items-center gap-2">
              <span>🚀 Get Started Now — It&apos;s Free!</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </AnimatedSection>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 30px rgba(212, 161, 42, 0.3); }
          50% { box-shadow: 0 0 60px rgba(212, 161, 42, 0.5); }
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}