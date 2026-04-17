'use client';
import { useAuth } from '@/providers/AuthProvider';
import { BarChart3, TrendingUp, Users, Award } from 'lucide-react';
export default function CertificatesPage() {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800">Certificates</h2>
        <p className="text-sm text-gray-500 mt-1">Manage certificates here.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><BarChart3 size={32} className="text-primary"/></div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Certificates</h3>
        <p className="text-gray-400 text-sm max-w-md mx-auto">This section provides tools to manage certificates. Connect your Supabase project to see live data.</p>
      </div>
    </div>);
}