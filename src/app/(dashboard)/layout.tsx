'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TopHeader from '@/components/layout/TopHeader';
import { useAuth } from '@/providers/AuthProvider';
import { Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // Derive page title from pathname
  const segments = pathname.split('/').filter(Boolean);
  const pageTitle = segments.length > 1
    ? segments[segments.length - 1].replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Dashboard';

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    ...segments.map((seg, i) => ({
      label: seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      href: i < segments.length - 1 ? '/' + segments.slice(0, i + 1).join('/') : undefined,
    })),
  ];

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={`main-content ${sidebarOpen ? '' : ''}`}>
        <TopHeader
          title={pageTitle}
          breadcrumbs={breadcrumbs}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="dashboard-content animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
