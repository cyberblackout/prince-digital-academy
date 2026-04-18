'use client';

import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { SITE_NAME } from '@/lib/constants';
import { GraduationCap, Menu, X, Headset } from 'lucide-react';
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
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 no-underline">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl gradient-primary flex items-center justify-center">
                <GraduationCap size={20} className="text-white" />
              </div>
              <span className="font-bold text-base sm:text-lg text-gray-800 hidden xs:block">{SITE_NAME}</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Home</Link>
              <Link href="/courses" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Courses</Link>
              <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">About</Link>
              <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Contact</Link>
            </div>

            {/* Right Side - Support Icon + Auth */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Support Icon with Text - Shows on all devices */}
              <a
                href="https://wa.me/233599822088"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-200 group"
                title="Contact Support"
              >
                <Headset size={16} className="text-primary group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-primary hidden xs:hidden sm:block">Support</span>
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
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
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
              <Link href="/" className="block py-2.5 px-4 rounded-lg hover:bg-gray-50 text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link href="/courses" className="block py-2.5 px-4 rounded-lg hover:bg-gray-50 text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>Courses</Link>
              <Link href="/about" className="block py-2.5 px-4 rounded-lg hover:bg-gray-50 text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>About</Link>
              <Link href="/contact" className="block py-2.5 px-4 rounded-lg hover:bg-gray-50 text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>Contact</Link>
              <hr className="my-3 border-gray-100" />
              {user ? (
                <Link href={getDashboardLink()} className="block btn-primary text-center text-sm py-2.5" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              ) : (
                <>
                  <Link href="/login" className="block py-2.5 px-4 rounded-lg hover:bg-gray-50 text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>Sign In</Link>
                  <Link href="/register" className="block btn-secondary text-center text-sm py-2.5 mt-2" onClick={() => setMobileOpen(false)}>Get Started</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
