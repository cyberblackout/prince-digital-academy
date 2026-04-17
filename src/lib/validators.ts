import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  first_name: z.string().min(1, 'First name is required').max(100),
  last_name: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const changePasswordSchema = z.object({
  current_password: z.string().min(1, 'Current password is required'),
  new_password: z.string().min(6, 'New password must be at least 6 characters'),
  confirm_password: z.string(),
}).refine((data) => data.new_password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
});

export const courseSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().optional(),
  short_description: z.string().max(500).optional(),
  category_id: z.number().optional().nullable(),
  class_id: z.number().optional().nullable(),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'all']).default('all'),
  language: z.string().default('English'),
  price: z.number().min(0).default(0),
  discount_price: z.number().min(0).optional().nullable(),
  is_free: z.boolean().default(false),
  is_published: z.boolean().default(false),
  is_featured: z.boolean().default(false),
  requirements: z.string().optional(),
  outcomes: z.string().optional(),
});

export const assignmentSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().optional(),
  course_id: z.number().min(1, 'Course is required'),
  due_date: z.string().min(1, 'Due date is required'),
  max_score: z.number().min(1).default(100),
  google_form_url: z.string().url().optional().or(z.literal('')),
  is_published: z.boolean().default(true),
});

export const examSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().optional(),
  course_id: z.number().optional().nullable(),
  exam_type: z.enum(['midterm', 'final', 'quiz', 'assignment', 'practical']).default('quiz'),
  total_marks: z.number().min(1).default(100),
  pass_marks: z.number().min(0).default(40),
  duration_minutes: z.number().optional().nullable(),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  google_form_url: z.string().url().optional().or(z.literal('')),
  instructions: z.string().optional(),
  is_published: z.boolean().default(false),
});

export const quizSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().optional(),
  course_id: z.number().optional().nullable(),
  lesson_id: z.number().optional().nullable(),
  time_limit: z.number().optional().nullable(),
  passing_score: z.number().min(0).max(100).default(60),
  max_attempts: z.number().optional().nullable(),
  shuffle_questions: z.boolean().default(false),
  show_correct_answers: z.boolean().default(true),
});

export const noticeSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  content: z.string().min(1, 'Content is required'),
  target_roles: z.string().default('all'),
  is_pinned: z.boolean().default(false),
  is_active: z.boolean().default(true),
  published_at: z.string().optional(),
  expires_at: z.string().optional(),
});

export const liveClassSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().optional(),
  course_id: z.number().optional().nullable(),
  platform: z.enum(['zoom', 'google_meet', 'teams', 'other']).default('zoom'),
  scheduled_at: z.string().min(1, 'Schedule time is required'),
  duration: z.number().min(1).default(60),
  meeting_link: z.string().url('Invalid meeting link').optional().or(z.literal('')),
  meeting_id: z.string().optional(),
  meeting_password: z.string().optional(),
  max_participants: z.number().optional().nullable(),
});

export const bookSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  author: z.string().optional(),
  isbn: z.string().max(20).optional(),
  publisher: z.string().optional(),
  category: z.string().optional(),
  quantity: z.number().min(1).default(1),
  shelf_location: z.string().optional(),
  description: z.string().optional(),
});

export const profileSchema = z.object({
  first_name: z.string().min(1, 'First name is required').max(100),
  last_name: z.string().min(1, 'Last name is required').max(100),
  phone: z.string().optional(),
  bio: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().default('Ghana'),
  date_of_birth: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CourseInput = z.infer<typeof courseSchema>;
export type AssignmentInput = z.infer<typeof assignmentSchema>;
export type ExamInput = z.infer<typeof examSchema>;
export type QuizInput = z.infer<typeof quizSchema>;
export type NoticeInput = z.infer<typeof noticeSchema>;
export type LiveClassInput = z.infer<typeof liveClassSchema>;
export type BookInput = z.infer<typeof bookSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
