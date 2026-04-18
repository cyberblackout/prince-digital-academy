'use client';

import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { SITE_NAME } from '@/lib/constants';
import { GraduationCap, Menu, X, Headphones } from 'lucide-react';
import { useState } from 'react';

export default function PublicNavbar() {
  const { user, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role_id === 1 || user.role_id === 2) return '/admin';
    if (user.role_id === 3) return '/teacher';
    return '/student';
  };

  return (
    <>
      {/* Main Nav */}
      <nav className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 no-underline">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <GraduationCap size={22} className="text-white" />
              </div>
              <span className="font-bold text-lg text-gray-800 hidden sm:block">{SITE_NAME}</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Home</Link>
              <Link href="/courses" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Courses</Link>
              <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">About</Link>
              <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Contact</Link>
            </div>

            {/* Right Side - Support Icon + Auth */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Support Icon - Hidden on small mobile, visible on larger screens */}
              <a
                href="https://wa.me/233599822088"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                title="Contact Support"
              >
                <Headphones size={20} className="text-primary" />
              </a>

              {/* Auth Buttons */}
              <div className="hidden lg:flex items-center gap-3">
                {loading ? (
                  <div className="w-20 h-9 bg-gray-100 rounded-lg animate-pulse" />
                ) : user ? (
                  <Link href={getDashboardLink()} className="btn-primary text-sm py-2 px-4">
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                      Sign In
                    </Link>
                    <Link href="/register" className="btn-secondary text-sm py-2 px-4">
                      Get Started
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Toggle */}
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white animate-slide-up">
            <div className="p-4 space-y-2">
              <Link href="/" className="block py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-700" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link href="/courses" className="block py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-700" onClick={() => setMobileOpen(false)}>Courses</Link>
              <Link href="/about" className="block py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-700" onClick={() => setMobileOpen(false)}>About</Link>
              <Link href="/contact" className="block py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-700" onClick={() => setMobileOpen(false)}>Contact</Link>
              <hr className="my-2" />
              {user ? (
                <Link href={getDashboardLink()} className="block btn-primary text-center text-sm" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              ) : (
                <>
                  <Link href="/login" className="block py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-700" onClick={() => setMobileOpen(false)}>Sign In</Link>
                  <Link href="/register" className="block btn-secondary text-center text-sm" onClick={() => setMobileOpen(false)}>Get Started</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
