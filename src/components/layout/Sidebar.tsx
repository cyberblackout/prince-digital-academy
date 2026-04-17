'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { ROLES, ADMIN_NAV, TEACHER_NAV, STUDENT_NAV, SITE_NAME } from '@/lib/constants';
import { getAvatarUrl } from '@/lib/utils';
import {
  LayoutDashboard, Users, BookOpen, FolderOpen, UserPlus, CreditCard,
  FileText, HelpCircle, ClipboardList, Video, Library, Bell, Megaphone,
  Shield, Briefcase, MessageSquare, Mail, BarChart3, TrendingUp, Settings,
  Search, Award, GraduationCap, X, LogOut,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  LayoutDashboard, Users, BookOpen, FolderOpen, UserPlus, CreditCard,
  FileText, HelpCircle, ClipboardList, Video, Library, Bell, Megaphone,
  Shield, Briefcase, MessageSquare, Mail, BarChart3, TrendingUp, Settings,
  Search, Award, GraduationCap,
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const roleId = user?.role_id || ROLES.STUDENT;
  let navItems = STUDENT_NAV;
  let roleLabel = 'Student';

  if (roleId === ROLES.SUPERADMIN || roleId === ROLES.ADMIN) {
    navItems = ADMIN_NAV;
    roleLabel = roleId === ROLES.SUPERADMIN ? 'Super Admin' : 'Admin';
  } else if (roleId === ROLES.TEACHER) {
    navItems = TEACHER_NAV;
    roleLabel = 'Teacher';
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`sidebar ${isOpen ? 'open' : ''} flex flex-col`}
      >
        {/* Brand */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-white no-underline">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <GraduationCap size={22} className="text-primary-dark" />
            </div>
            <div>
              <h3 className="text-sm font-bold leading-tight">{SITE_NAME}</h3>
              <span className="text-xs text-white/50">{roleLabel}</span>
            </div>
          </Link>
          <button className="lg:hidden text-white/60 hover:text-white" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src={getAvatarUrl(user?.avatar, `${user?.first_name} ${user?.last_name}`)}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-xs text-white/50 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={signOut}
            className="sidebar-nav-item w-full text-red-300 hover:text-red-100 hover:bg-red-500/20"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
