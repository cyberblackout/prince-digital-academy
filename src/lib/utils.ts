import { CURRENCY_SYMBOL } from './constants';
import { format, formatDistanceToNow } from 'date-fns';

/**
 * Format currency amount
 */
export function formatMoney(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `${CURRENCY_SYMBOL}${num.toFixed(2)}`;
}

/**
 * Format date
 */
export function formatDate(date: string | Date, fmt: string = 'MMM dd, yyyy'): string {
  if (!date) return '';
  return format(new Date(date), fmt);
}

/**
 * Format datetime
 */
export function formatDateTime(date: string | Date, fmt: string = 'MMM dd, yyyy HH:mm'): string {
  if (!date) return '';
  return format(new Date(date), fmt);
}

/**
 * Time ago helper
 */
export function timeAgo(date: string | Date): string {
  if (!date) return '';
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

/**
 * Generate slug from string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'n-a';
}

/**
 * Generate unique reference
 */
export function generateReference(prefix: string = 'PDA'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}_${timestamp}_${random}`;
}

/**
 * Truncate text
 */
export function truncate(text: string, length: number = 100, suffix: string = '...'): string {
  if (!text || text.length <= length) return text || '';
  return text.substring(0, length).trim() + suffix;
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

/**
 * Format duration (minutes → human-readable)
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins > 0 ? `${mins}m` : ''}`.trim();
}

/**
 * Get YouTube video ID from URL
 */
export function getYouTubeId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
  const match = url.match(regex);
  return match ? match[1] : null;
}

/**
 * Get YouTube embed URL
 */
export function getYouTubeEmbed(url: string): string | null {
  const videoId = getYouTubeId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

/**
 * Calculate progress percentage
 */
export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.min(100, Math.round((completed / total) * 100));
}

/**
 * Get grade from percentage
 */
export function getGrade(percentage: number): string {
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  if (percentage >= 40) return 'E';
  return 'F';
}

/**
 * Format phone number (Ghana format)
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) return `+233${cleaned.substring(1)}`;
  if (!cleaned.startsWith('233')) return `+233${cleaned}`;
  return `+${cleaned}`;
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate phone (Ghana)
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[^0-9]/g, '');
  return cleaned.length >= 10;
}

/**
 * Get avatar URL
 */
export function getAvatarUrl(avatar?: string | null, name?: string): string {
  if (avatar && avatar !== 'default-avatar.png' && avatar !== 'default-avatar.svg') {
    return avatar;
  }
  const displayName = name || 'User';
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=7B2D3B&color=fff`;
}

/**
 * cn utility for conditional classnames
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
