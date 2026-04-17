// ===========================================
// Role Constants
// ===========================================
export const ROLES = {
  SUPERADMIN: 1,
  ADMIN: 2,
  TEACHER: 3,
  STUDENT: 4,
  GUEST: 5,
} as const;

export type RoleId = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_NAMES: Record<RoleId, string> = {
  [ROLES.SUPERADMIN]: 'Super Admin',
  [ROLES.ADMIN]: 'Admin',
  [ROLES.TEACHER]: 'Teacher',
  [ROLES.STUDENT]: 'Student',
  [ROLES.GUEST]: 'Guest',
};

export const ROLE_SLUGS: Record<RoleId, string> = {
  [ROLES.SUPERADMIN]: 'superadmin',
  [ROLES.ADMIN]: 'admin',
  [ROLES.TEACHER]: 'teacher',
  [ROLES.STUDENT]: 'student',
  [ROLES.GUEST]: 'guest',
};

// ===========================================
// App Configuration
// ===========================================
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Prince Digital Academy';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export const SITE_TAGLINE = process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Smart Learning, Real Results';
export const SITE_EMAIL = process.env.NEXT_PUBLIC_SITE_EMAIL || 'info@princedigitalacademy.com';
export const SITE_PHONE = process.env.NEXT_PUBLIC_SITE_PHONE || '0599822088';
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '233599822088';
export const CURRENCY_CODE = process.env.NEXT_PUBLIC_CURRENCY_CODE || 'GHS';
export const CURRENCY_SYMBOL = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₵';

// ===========================================
// Brand Colors
// ===========================================
export const BRAND = {
  primary: '#7B2D3B',
  secondary: '#D4A12A',
  accent: '#5C1F2A',
  background: '#f8f5f2',
  text: '#2d3748',
} as const;

// ===========================================
// Navigation
// ===========================================
export const ADMIN_NAV = [
  { label: 'Dashboard', href: '/admin', icon: 'LayoutDashboard' },
  { label: 'Users', href: '/admin/users', icon: 'Users' },
  { label: 'Courses', href: '/admin/courses', icon: 'BookOpen' },
  { label: 'Categories', href: '/admin/categories', icon: 'FolderOpen' },
  { label: 'Enrollments', href: '/admin/enrollments', icon: 'UserPlus' },
  { label: 'Payments', href: '/admin/payments', icon: 'CreditCard' },
  { label: 'Exams', href: '/admin/exams', icon: 'FileText' },
  { label: 'Quizzes', href: '/admin/quizzes', icon: 'HelpCircle' },
  { label: 'Assignments', href: '/admin/assignments', icon: 'ClipboardList' },
  { label: 'Live Classes', href: '/admin/live-classes', icon: 'Video' },
  { label: 'Library', href: '/admin/library', icon: 'Library' },
  { label: 'Notices', href: '/admin/notices', icon: 'Bell' },
  { label: 'Announcements', href: '/admin/announcements', icon: 'Megaphone' },
  { label: 'Behaviour', href: '/admin/behaviour', icon: 'Shield' },
  { label: 'HR', href: '/admin/hr', icon: 'Briefcase' },
  { label: 'SMS', href: '/admin/sms', icon: 'MessageSquare' },
  { label: 'Email', href: '/admin/email', icon: 'Mail' },
  { label: 'Reports', href: '/admin/reports', icon: 'BarChart3' },
  { label: 'Analytics', href: '/admin/analytics', icon: 'TrendingUp' },
  { label: 'Settings', href: '/admin/settings', icon: 'Settings' },
];

export const TEACHER_NAV = [
  { label: 'Dashboard', href: '/teacher', icon: 'LayoutDashboard' },
  { label: 'My Courses', href: '/teacher/courses', icon: 'BookOpen' },
  { label: 'Assignments', href: '/teacher/assignments', icon: 'ClipboardList' },
  { label: 'Exams', href: '/teacher/exams', icon: 'FileText' },
  { label: 'Quizzes', href: '/teacher/quizzes', icon: 'HelpCircle' },
  { label: 'Live Classes', href: '/teacher/live-classes', icon: 'Video' },
  { label: 'Students', href: '/teacher/students', icon: 'Users' },
  { label: 'Results', href: '/teacher/results', icon: 'Award' },
  { label: 'Performance', href: '/teacher/student-performance', icon: 'TrendingUp' },
  { label: 'Certificates', href: '/teacher/certificates', icon: 'GraduationCap' },
  { label: 'Reports', href: '/teacher/reports', icon: 'BarChart3' },
];

export const STUDENT_NAV = [
  { label: 'Dashboard', href: '/student', icon: 'LayoutDashboard' },
  { label: 'My Courses', href: '/student/my-courses', icon: 'BookOpen' },
  { label: 'Browse Courses', href: '/student/browse-courses', icon: 'Search' },
  { label: 'Assignments', href: '/student/assignments', icon: 'ClipboardList' },
  { label: 'Exams', href: '/student/examinations', icon: 'FileText' },
  { label: 'Quizzes', href: '/student/quizzes', icon: 'HelpCircle' },
  { label: 'Live Classes', href: '/student/live-classes', icon: 'Video' },
  { label: 'Library', href: '/student/library', icon: 'Library' },
  { label: 'Results', href: '/student/results', icon: 'Award' },
  { label: 'Performance', href: '/student/performance', icon: 'TrendingUp' },
  { label: 'Certificates', href: '/student/certificates', icon: 'GraduationCap' },
  { label: 'Payments', href: '/student/payments', icon: 'CreditCard' },
];

// ===========================================
// File Upload Limits
// ===========================================
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2MB
export const ALLOWED_IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
export const ALLOWED_VIDEO_TYPES = ['mp4', 'webm', 'mov'];
export const ALLOWED_DOC_TYPES = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'];

// ===========================================
// Pagination
// ===========================================
export const DEFAULT_PAGE_SIZE = 10;
