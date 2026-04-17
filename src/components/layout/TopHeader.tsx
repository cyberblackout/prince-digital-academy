'use client';

import { useAuth } from '@/providers/AuthProvider';
import { getAvatarUrl } from '@/lib/utils';
import { Menu, Bell, Search, LogOut, User, Settings } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

interface TopHeaderProps {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
  onToggleSidebar: () => void;
}

export default function TopHeader({ title, breadcrumbs, onToggleSidebar }: TopHeaderProps) {
  const { user, signOut } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="top-header">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
          {breadcrumbs && (
            <nav className="flex items-center gap-1 text-xs text-gray-400">
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <span>/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-primary transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-gray-600">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm w-40"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell size={20} className="text-gray-500" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-1.5 transition-colors"
          >
            <img
              src={getAvatarUrl(user?.avatar, `${user?.first_name} ${user?.last_name}`)}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-700 leading-tight">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-xs text-gray-400">{user?.role_name || 'User'}</p>
            </div>
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-scale-in">
              <Link
                href="/profile"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                onClick={() => setUserMenuOpen(false)}
              >
                <User size={16} />
                Profile
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                onClick={() => setUserMenuOpen(false)}
              >
                <Settings size={16} />
                Settings
              </Link>
              <hr className="my-1 border-gray-100" />
              <button
                onClick={() => { signOut(); setUserMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
