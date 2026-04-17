export interface User {
  id: string;
  role_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  address?: string;
  city?: string;
  country: string;
  date_of_birth?: string;
  gender?: 'male' | 'female' | 'other';
  is_active: boolean;
  last_login?: string;
  must_change_password: boolean;
  created_at: string;
  updated_at: string;
  // Joined fields
  role_name?: string;
  role_slug?: string;
}

export interface Course {
  id: number;
  teacher_id: string;
  category_id?: number;
  class_id?: number;
  title: string;
  slug: string;
  description?: string;
  short_description?: string;
  thumbnail?: string;
  preview_video?: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all';
  language: string;
  duration_hours?: number;
  is_free: boolean;
  price: number;
  discount_price?: number;
  is_featured: boolean;
  is_published: boolean;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  requirements?: string;
  outcomes?: string;
  meta_title?: string;
  meta_description?: string;
  view_count: number;
  created_at: string;
  updated_at: string;
  // Joined fields
  teacher_name?: string;
  category_name?: string;
  class_name?: string;
  enrollment_count?: number;
}

export interface CourseCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  is_active: boolean;
  created_at: string;
}

export interface CourseSection {
  id: number;
  course_id: number;
  title: string;
  description?: string;
  order_num: number;
  created_at: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: number;
  section_id: number;
  title: string;
  content_type: 'video' | 'youtube' | 'pdf' | 'text' | 'quiz' | 'assignment';
  content?: string;
  video_url?: string;
  video_duration?: number;
  file_path?: string;
  is_free: boolean;
  is_downloadable: boolean;
  order_num: number;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: number;
  user_id: string;
  course_id: number;
  payment_id?: number;
  enrolled_at: string;
  completed_at?: string;
  progress_percentage: number;
  status: 'active' | 'completed' | 'expired' | 'cancelled';
  // Joined
  user_name?: string;
  user_email?: string;
  course_title?: string;
}

export interface Assignment {
  id: number;
  course_id: number;
  teacher_id: string;
  title: string;
  description?: string;
  google_form_url?: string;
  file_path?: string;
  due_date: string;
  max_score: number;
  is_published: boolean;
  created_at: string;
  // Joined
  course_title?: string;
  submission_count?: number;
}

export interface AssignmentSubmission {
  id: number;
  assignment_id: number;
  student_id: string;
  submission_text?: string;
  file_path?: string;
  score?: number;
  feedback?: string;
  status: 'pending' | 'submitted' | 'graded' | 'late';
  submitted_at?: string;
  graded_at?: string;
  graded_by?: string;
  // Joined
  student_name?: string;
  assignment_title?: string;
}

export interface Exam {
  id: number;
  template_id?: number;
  course_id?: number;
  title: string;
  description?: string;
  exam_type: 'midterm' | 'final' | 'quiz' | 'assignment' | 'practical';
  total_marks: number;
  pass_marks: number;
  duration_minutes?: number;
  start_time?: string;
  end_time?: string;
  google_form_url?: string;
  instructions?: string;
  is_published: boolean;
  created_by: string;
  created_at: string;
  // Joined
  course_title?: string;
}

export interface ExamResult {
  id: number;
  exam_id: number;
  student_id: string;
  marks_obtained?: number;
  grade?: string;
  remarks?: string;
  submitted_at?: string;
  graded_by?: string;
  graded_at?: string;
  // Joined
  student_name?: string;
  exam_title?: string;
}

export interface Quiz {
  id: number;
  lesson_id?: number;
  course_id?: number;
  title: string;
  description?: string;
  time_limit?: number;
  passing_score: number;
  max_attempts?: number;
  shuffle_questions: boolean;
  show_correct_answers: boolean;
  is_active: boolean;
  created_at: string;
  // Joined
  course_title?: string;
  question_count?: number;
}

export interface QuizQuestion {
  id: number;
  quiz_id: number;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'multiple_answer';
  points: number;
  order_position: number;
  answers?: QuizAnswer[];
}

export interface QuizAnswer {
  id: number;
  question_id: number;
  answer_text: string;
  is_correct: boolean;
  order_position: number;
}

export interface QuizAttempt {
  id: number;
  user_id: string;
  quiz_id: number;
  score?: number;
  correct_answers: number;
  total_questions: number;
  passed: boolean;
  time_taken?: number;
  created_at: string;
}

export interface LiveClass {
  id: number;
  course_id?: number;
  instructor_id: string;
  title: string;
  description?: string;
  platform: 'zoom' | 'google_meet' | 'teams' | 'other';
  scheduled_at: string;
  duration: number;
  meeting_link?: string;
  meeting_id?: string;
  meeting_password?: string;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  max_participants?: number;
  recording_url?: string;
  created_at: string;
  // Joined
  instructor_name?: string;
  course_title?: string;
}

export interface Notice {
  id: number;
  title: string;
  content: string;
  author_id: string;
  target_roles: string;
  is_pinned: boolean;
  published_at?: string;
  expires_at?: string;
  is_active: boolean;
  created_at: string;
  // Joined
  author_name?: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  target_audience: 'all' | 'students' | 'teachers';
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Book {
  id: number;
  title: string;
  author?: string;
  isbn?: string;
  publisher?: string;
  category?: string;
  quantity: number;
  available: number;
  shelf_location?: string;
  cover_image?: string;
  description?: string;
  is_active: boolean;
  created_at: string;
}

export interface BookIssue {
  id: number;
  book_id: number;
  user_id: string;
  issued_by: string;
  issue_date: string;
  due_date: string;
  return_date?: string;
  fine_amount: number;
  status: 'issued' | 'returned' | 'overdue' | 'lost';
  notes?: string;
  // Joined
  book_title?: string;
  user_name?: string;
}

export interface Payment {
  id: number;
  user_id: string;
  course_id?: number;
  reference: string;
  amount: number;
  currency: string;
  payment_method: string;
  payment_channel?: string;
  status: 'pending' | 'successful' | 'failed' | 'refunded';
  paystack_reference?: string;
  metadata?: Record<string, unknown>;
  paid_at?: string;
  created_at: string;
  // Joined
  user_name?: string;
  course_title?: string;
}

export interface Incident {
  id: number;
  student_id: string;
  type_id: number;
  reported_by: string;
  course_id?: number;
  description?: string;
  action_taken?: string;
  incident_date: string;
  created_at: string;
  // Joined
  student_name?: string;
  type_name?: string;
  reporter_name?: string;
}

export interface IncidentType {
  id: number;
  name: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  points: number;
  description?: string;
  is_active: boolean;
}

export interface Department {
  id: number;
  name: string;
  head_id?: string;
  description?: string;
  is_active: boolean;
  created_at: string;
}

export interface StaffDetail {
  id: number;
  user_id: string;
  department_id?: number;
  employee_id?: string;
  designation?: string;
  qualification?: string;
  experience_years?: number;
  joining_date?: string;
  salary?: number;
  contract_type: 'permanent' | 'contract' | 'part-time';
  emergency_contact?: string;
  emergency_phone?: string;
}

export interface Setting {
  id: number;
  setting_key: string;
  setting_value?: string;
}

export interface DashboardStats {
  total_users: number;
  total_students: number;
  total_teachers: number;
  total_courses: number;
  published_courses: number;
  total_enrollments: number;
  total_revenue: number;
  pending_payments: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
