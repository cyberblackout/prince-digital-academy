import Link from 'next/link';
import { SITE_NAME, SITE_PHONE, SITE_EMAIL, WHATSAPP_NUMBER } from '@/lib/constants';
import { GraduationCap, Phone, Mail, MapPin, Wifi } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <GraduationCap size={22} className="text-primary-dark" />
              </div>
              <span className="font-bold text-lg text-white">{SITE_NAME}</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 text-center md:text-left">
              Smart Learning, Real Results. Quality online education for JHS, SHS, and beyond.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4 text-center md:text-left">Quick Links</h4>
            <ul className="space-y-2.5 text-center md:text-left">
              <li><Link href="/courses" className="text-sm hover:text-secondary transition-colors">Browse Courses</Link></li>
              <li><Link href="/about" className="text-sm hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-secondary transition-colors">Contact</Link></li>
              <li><Link href="/register" className="text-sm hover:text-secondary transition-colors">Register</Link></li>
              <li><Link href="/login" className="text-sm hover:text-secondary transition-colors">Login</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4 text-center md:text-left">Categories</h4>
            <ul className="space-y-2.5 text-center md:text-left">
              <li><Link href="/courses?category=jhs" className="text-sm hover:text-secondary transition-colors">JHS Courses</Link></li>
              <li><Link href="/courses?category=science" className="text-sm hover:text-secondary transition-colors">Science</Link></li>
              <li><Link href="/courses?category=business" className="text-sm hover:text-secondary transition-colors">Business</Link></li>
              <li><Link href="/courses?category=arts" className="text-sm hover:text-secondary transition-colors">Arts</Link></li>
              <li><Link href="/courses?category=general" className="text-sm hover:text-secondary transition-colors">General</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4 text-center md:text-left">Contact Us</h4>
            <ul className="space-y-3 text-center md:text-left">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Phone size={16} className="text-secondary flex-shrink-0" />
                <a href={`tel:${SITE_PHONE}`} className="text-sm hover:text-secondary transition-colors">{SITE_PHONE}</a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Mail size={16} className="text-secondary flex-shrink-0" />
                <a href={`mailto:${SITE_EMAIL}`} className="text-sm hover:text-secondary transition-colors">Email Us</a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <MapPin size={16} className="text-secondary flex-shrink-0" />
                <span className="text-sm">Accra, Ghana</span>
              </li>
            </ul>
            <div className="mt-4 flex justify-center md:justify-start">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2">
          <p className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 text-center flex items-center gap-1">
            Built by <span className="font-semibold text-white">CyberBlackou</span>
            <Wifi size={10} className="text-secondary" />
            <span className="font-semibold text-secondary">DevX</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
