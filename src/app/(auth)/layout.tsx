import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Authentication' };

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/10 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-secondary/8 translate-y-1/3 -translate-x-1/3" />
        <div className="relative z-10 text-center text-white max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-secondary/20 backdrop-blur flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl">🎓</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Prince Digital Academy</h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Smart Learning, Real Results. Quality online education for JHS, SHS, and beyond.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-10">
            <div><p className="text-2xl font-bold">500+</p><p className="text-xs text-white/50">Students</p></div>
            <div><p className="text-2xl font-bold">50+</p><p className="text-xs text-white/50">Courses</p></div>
            <div><p className="text-2xl font-bold">20+</p><p className="text-xs text-white/50">Teachers</p></div>
          </div>
        </div>
      </div>
      {/* Right content panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
