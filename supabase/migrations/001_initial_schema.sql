-- =========================================================
-- Prince Digital Academy - PostgreSQL Schema
-- Migrated from MySQL (idatahu1_Danny.sql)
-- For Supabase PostgreSQL
-- =========================================================

-- =====================
-- TYPES
-- =====================
CREATE TYPE course_level AS ENUM ('beginner', 'intermediate', 'advanced', 'all');
CREATE TYPE course_status AS ENUM ('draft', 'pending', 'approved', 'rejected');
CREATE TYPE enrollment_status AS ENUM ('active', 'completed', 'expired', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'successful', 'failed', 'refunded');
CREATE TYPE assignment_status AS ENUM ('pending', 'submitted', 'graded', 'late');
CREATE TYPE exam_type AS ENUM ('midterm', 'final', 'quiz', 'assignment', 'practical');
CREATE TYPE quiz_type AS ENUM ('multiple_choice', 'true_false', 'multiple_answer');
CREATE TYPE meeting_platform AS ENUM ('zoom', 'google_meet', 'teams', 'other');
CREATE TYPE meeting_status AS ENUM ('scheduled', 'live', 'completed', 'cancelled');
CREATE TYPE content_type AS ENUM ('video', 'youtube', 'pdf', 'text', 'quiz', 'assignment');
CREATE TYPE incident_severity AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE contract_type AS ENUM ('permanent', 'contract', 'part-time');
CREATE TYPE book_issue_status AS ENUM ('issued', 'returned', 'overdue', 'lost');
CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
CREATE TYPE target_audience AS ENUM ('all', 'students', 'teachers');

-- =====================
-- UPDATED_AT TRIGGER
-- =====================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================
-- ROLES
-- =====================
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  slug VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO roles (id, name, slug, description) VALUES
  (1, 'Super Admin', 'superadmin', 'Full system access'),
  (2, 'Admin', 'admin', 'Administrative access'),
  (3, 'Teacher', 'teacher', 'Teaching and course management'),
  (4, 'Student', 'student', 'Learning and course access'),
  (5, 'Guest', 'guest', 'Limited public access');

-- =====================
-- USERS
-- =====================
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id INT NOT NULL DEFAULT 4 REFERENCES roles(id),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  avatar VARCHAR(255) DEFAULT 'default-avatar.png',
  bio TEXT,
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100) DEFAULT 'Ghana',
  date_of_birth DATE,
  gender gender_type,
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMPTZ,
  must_change_password BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_role ON users(role_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active);
CREATE TRIGGER users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================
-- CLASSES (JHS 1, SHS 2, etc.)
-- =====================
CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  level VARCHAR(50),
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO classes (name, level) VALUES ('JHS 1','JHS'),('JHS 2','JHS'),('JHS 3','JHS'),('SHS 1','SHS'),('SHS 2','SHS'),('SHS 3','SHS');

-- =====================
-- COURSE CATEGORIES
-- =====================
CREATE TABLE course_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(10),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO course_categories (name, slug, icon) VALUES
  ('Science','science','🔬'),('Business','business','💼'),('Arts','arts','🎨'),
  ('General','general','📚'),('JHS','jhs','🏫'),('Agricultural','agriculture','🌱');

-- =====================
-- COURSES
-- =====================
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  teacher_id UUID NOT NULL REFERENCES users(id),
  category_id INT REFERENCES course_categories(id),
  class_id INT REFERENCES classes(id),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  short_description VARCHAR(500),
  thumbnail VARCHAR(255),
  preview_video VARCHAR(500),
  level course_level DEFAULT 'all',
  language VARCHAR(50) DEFAULT 'English',
  duration_hours NUMERIC(5,1),
  is_free BOOLEAN DEFAULT FALSE,
  price NUMERIC(10,2) DEFAULT 0,
  discount_price NUMERIC(10,2),
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  status course_status DEFAULT 'draft',
  requirements TEXT,
  outcomes TEXT,
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_courses_teacher ON courses(teacher_id);
CREATE INDEX idx_courses_category ON courses(category_id);
CREATE INDEX idx_courses_published ON courses(is_published);
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE TRIGGER courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================
-- COURSE SECTIONS
-- =====================
CREATE TABLE course_sections (
  id SERIAL PRIMARY KEY,
  course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_num INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- LESSONS
-- =====================
CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  section_id INT NOT NULL REFERENCES course_sections(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content_type content_type DEFAULT 'video',
  content TEXT,
  video_url VARCHAR(500),
  video_duration INT,
  file_path VARCHAR(255),
  is_free BOOLEAN DEFAULT FALSE,
  is_downloadable BOOLEAN DEFAULT FALSE,
  order_num INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER lessons_updated_at BEFORE UPDATE ON lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================
-- LESSON PROGRESS
-- =====================
CREATE TABLE lesson_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id INT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT FALSE,
  progress_seconds INT DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- =====================
-- ENROLLMENTS
-- =====================
CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  payment_id INT,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  progress_percentage INT DEFAULT 0,
  status enrollment_status DEFAULT 'active',
  UNIQUE(user_id, course_id)
);

CREATE INDEX idx_enrollments_user ON enrollments(user_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);

-- =====================
-- PAYMENTS
-- =====================
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  course_id INT REFERENCES courses(id),
  reference VARCHAR(100) NOT NULL UNIQUE,
  amount NUMERIC(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'GHS',
  payment_method VARCHAR(50) DEFAULT 'paystack',
  payment_channel VARCHAR(50),
  status payment_status DEFAULT 'pending',
  paystack_reference VARCHAR(100),
  metadata JSONB DEFAULT '{}',
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_reference ON payments(reference);
CREATE INDEX idx_payments_status ON payments(status);

-- =====================
-- PAYMENT ITEMS
-- =====================
CREATE TABLE payment_items (
  id SERIAL PRIMARY KEY,
  payment_id INT NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
  item_type VARCHAR(50) NOT NULL,
  item_id INT,
  description VARCHAR(255),
  amount NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- CART
-- =====================
CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- =====================
-- COUPONS
-- =====================
CREATE TABLE coupons (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  discount_type VARCHAR(20) DEFAULT 'percentage',
  discount_value NUMERIC(10,2) NOT NULL,
  max_uses INT,
  used_count INT DEFAULT 0,
  min_order_amount NUMERIC(10,2),
  valid_from TIMESTAMPTZ,
  valid_until TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- CLASS FEES
-- =====================
CREATE TABLE class_fees (
  id SERIAL PRIMARY KEY,
  class_id INT NOT NULL REFERENCES classes(id),
  fee_name VARCHAR(100) NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- FEE PAYMENTS
-- =====================
CREATE TABLE fee_payments (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  fee_id INT NOT NULL REFERENCES class_fees(id),
  amount NUMERIC(10,2) NOT NULL,
  payment_id INT REFERENCES payments(id),
  status payment_status DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- ASSIGNMENTS
-- =====================
CREATE TABLE assignments (
  id SERIAL PRIMARY KEY,
  course_id INT NOT NULL REFERENCES courses(id),
  teacher_id UUID NOT NULL REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  google_form_url VARCHAR(500),
  file_path VARCHAR(255),
  due_date TIMESTAMPTZ NOT NULL,
  max_score INT DEFAULT 100,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER assignments_updated_at BEFORE UPDATE ON assignments FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================
-- ASSIGNMENT SUBMISSIONS
-- =====================
CREATE TABLE assignment_submissions (
  id SERIAL PRIMARY KEY,
  assignment_id INT NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES users(id),
  submission_text TEXT,
  file_path VARCHAR(255),
  score INT,
  feedback TEXT,
  status assignment_status DEFAULT 'pending',
  submitted_at TIMESTAMPTZ,
  graded_at TIMESTAMPTZ,
  graded_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(assignment_id, student_id)
);

-- =====================
-- EXAM TEMPLATES
-- =====================
CREATE TABLE exam_templates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- EXAMS
-- =====================
CREATE TABLE exams (
  id SERIAL PRIMARY KEY,
  template_id INT REFERENCES exam_templates(id),
  course_id INT REFERENCES courses(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  exam_type exam_type DEFAULT 'quiz',
  total_marks INT DEFAULT 100,
  pass_marks INT DEFAULT 40,
  duration_minutes INT,
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  google_form_url VARCHAR(500),
  instructions TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER exams_updated_at BEFORE UPDATE ON exams FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================
-- EXAM RESULTS
-- =====================
CREATE TABLE exam_results (
  id SERIAL PRIMARY KEY,
  exam_id INT NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES users(id),
  marks_obtained INT,
  grade VARCHAR(5),
  remarks TEXT,
  submitted_at TIMESTAMPTZ,
  graded_by UUID REFERENCES users(id),
  graded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(exam_id, student_id)
);

-- =====================
-- QUIZZES
-- =====================
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  lesson_id INT REFERENCES lessons(id),
  course_id INT REFERENCES courses(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  time_limit INT,
  passing_score INT DEFAULT 60,
  max_attempts INT,
  shuffle_questions BOOLEAN DEFAULT FALSE,
  show_correct_answers BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER quizzes_updated_at BEFORE UPDATE ON quizzes FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================
-- QUIZ QUESTIONS
-- =====================
CREATE TABLE quiz_questions (
  id SERIAL PRIMARY KEY,
  quiz_id INT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type quiz_type DEFAULT 'multiple_choice',
  points INT DEFAULT 1,
  order_position INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- QUIZ ANSWERS
-- =====================
CREATE TABLE quiz_answers (
  id SERIAL PRIMARY KEY,
  question_id INT NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  answer_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  order_position INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- QUIZ ATTEMPTS
-- =====================
CREATE TABLE quiz_attempts (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  quiz_id INT NOT NULL REFERENCES quizzes(id),
  score INT,
  correct_answers INT DEFAULT 0,
  total_questions INT DEFAULT 0,
  passed BOOLEAN DEFAULT FALSE,
  time_taken INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- LIVE CLASSES
-- =====================
CREATE TABLE live_classes (
  id SERIAL PRIMARY KEY,
  course_id INT REFERENCES courses(id),
  instructor_id UUID NOT NULL REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  platform meeting_platform DEFAULT 'zoom',
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration INT DEFAULT 60,
  meeting_link VARCHAR(500),
  meeting_id VARCHAR(100),
  meeting_password VARCHAR(100),
  status meeting_status DEFAULT 'scheduled',
  max_participants INT,
  recording_url VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER live_classes_updated_at BEFORE UPDATE ON live_classes FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================
-- LIVE MEETING ATTENDEES
-- =====================
CREATE TABLE live_meeting_attendees (
  id SERIAL PRIMARY KEY,
  live_class_id INT NOT NULL REFERENCES live_classes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  left_at TIMESTAMPTZ,
  UNIQUE(live_class_id, user_id)
);

-- =====================
-- ANNOUNCEMENTS
-- =====================
CREATE TABLE announcements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  target_audience target_audience DEFAULT 'all',
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER announcements_updated_at BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================
-- NOTICES
-- =====================
CREATE TABLE notices (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id),
  target_roles VARCHAR(100) DEFAULT 'all',
  is_pinned BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER notices_updated_at BEFORE UPDATE ON notices FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================
-- BOOKS (Library)
-- =====================
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255),
  isbn VARCHAR(20),
  publisher VARCHAR(255),
  category VARCHAR(100),
  quantity INT DEFAULT 1,
  available INT DEFAULT 1,
  shelf_location VARCHAR(100),
  cover_image VARCHAR(255),
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER books_updated_at BEFORE UPDATE ON books FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================
-- BOOK ISSUES
-- =====================
CREATE TABLE book_issues (
  id SERIAL PRIMARY KEY,
  book_id INT NOT NULL REFERENCES books(id),
  user_id UUID NOT NULL REFERENCES users(id),
  issued_by UUID REFERENCES users(id),
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  return_date DATE,
  fine_amount NUMERIC(10,2) DEFAULT 0,
  status book_issue_status DEFAULT 'issued',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- INCIDENT TYPES
-- =====================
CREATE TABLE incident_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  severity incident_severity DEFAULT 'low',
  points INT DEFAULT 0,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO incident_types (name, severity, points) VALUES
  ('Late Submission', 'low', 1),('Absence', 'low', 2),('Misconduct', 'medium', 5),('Cheating', 'high', 10);

-- =====================
-- INCIDENTS
-- =====================
CREATE TABLE incidents (
  id SERIAL PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES users(id),
  type_id INT NOT NULL REFERENCES incident_types(id),
  reported_by UUID NOT NULL REFERENCES users(id),
  course_id INT REFERENCES courses(id),
  description TEXT,
  action_taken TEXT,
  incident_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- DEPARTMENTS
-- =====================
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  head_id UUID REFERENCES users(id),
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- STAFF DETAILS
-- =====================
CREATE TABLE staff_details (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  department_id INT REFERENCES departments(id),
  employee_id VARCHAR(50),
  designation VARCHAR(100),
  qualification TEXT,
  experience_years INT,
  joining_date DATE,
  salary NUMERIC(10,2),
  contract_type contract_type DEFAULT 'permanent',
  emergency_contact VARCHAR(100),
  emergency_phone VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER staff_details_updated_at BEFORE UPDATE ON staff_details FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================
-- SUBJECTS
-- =====================
CREATE TABLE subjects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(20),
  class_id INT REFERENCES classes(id),
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO subjects (name, code) VALUES ('Mathematics','MATH'),('English Language','ENG'),('Integrated Science','SCI'),('Social Studies','SOC'),('ICT','ICT');

-- =====================
-- SETTINGS
-- =====================
CREATE TABLE settings (
  id SERIAL PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

INSERT INTO settings (setting_key, setting_value) VALUES
  ('site_name', 'Prince Digital Academy'),
  ('site_tagline', 'Smart Learning, Real Results'),
  ('currency_code', 'GHS'),
  ('currency_symbol', '₵'),
  ('primary_color', '#7B2D3B'),
  ('secondary_color', '#D4A12A'),
  ('registration_fee', '50.00'),
  ('sms_provider', 'africastalking'),
  ('payment_gateway', 'paystack');

-- =====================
-- EMAIL LOGS
-- =====================
CREATE TABLE email_logs (
  id SERIAL PRIMARY KEY,
  recipient VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  body TEXT,
  status VARCHAR(20) DEFAULT 'queued',
  sent_at TIMESTAMPTZ,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- SMS LOGS
-- =====================
CREATE TABLE sms_logs (
  id SERIAL PRIMARY KEY,
  recipient VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'queued',
  provider VARCHAR(50) DEFAULT 'africastalking',
  sent_at TIMESTAMPTZ,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- PASSWORD RESETS
-- =====================
CREATE TABLE password_resets (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- SESSIONS
-- =====================
CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(255) NOT NULL UNIQUE,
  ip_address VARCHAR(50),
  user_agent TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================
-- ROW LEVEL SECURITY (RLS)
-- =========================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;

-- Users: everyone can read, only own profile can be updated
CREATE POLICY "users_select" ON users FOR SELECT USING (true);
CREATE POLICY "users_insert" ON users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "users_update_own" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "users_admin_all" ON users FOR ALL USING (
  EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2))
);

-- Courses: published visible to all, teachers manage own
CREATE POLICY "courses_select_published" ON courses FOR SELECT USING (is_published = true OR teacher_id = auth.uid() OR EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2)));
CREATE POLICY "courses_insert" ON courses FOR INSERT WITH CHECK (teacher_id = auth.uid() OR EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2)));
CREATE POLICY "courses_update" ON courses FOR UPDATE USING (teacher_id = auth.uid() OR EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2)));
CREATE POLICY "courses_delete" ON courses FOR DELETE USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2)));

-- Enrollments: students see own, admins see all
CREATE POLICY "enrollments_select" ON enrollments FOR SELECT USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2,3)));
CREATE POLICY "enrollments_insert" ON enrollments FOR INSERT WITH CHECK (user_id = auth.uid() OR EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2)));
CREATE POLICY "enrollments_update" ON enrollments FOR UPDATE USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2)));

-- Payments: students see own, admins see all
CREATE POLICY "payments_select" ON payments FOR SELECT USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2)));
CREATE POLICY "payments_insert" ON payments FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "payments_update" ON payments FOR UPDATE USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2)));

-- Assignments: teachers manage, students view
CREATE POLICY "assignments_select" ON assignments FOR SELECT USING (true);
CREATE POLICY "assignments_manage" ON assignments FOR ALL USING (teacher_id = auth.uid() OR EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2)));

-- Submissions: students manage own, teachers grade
CREATE POLICY "submissions_select" ON assignment_submissions FOR SELECT USING (student_id = auth.uid() OR EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2,3)));
CREATE POLICY "submissions_insert" ON assignment_submissions FOR INSERT WITH CHECK (student_id = auth.uid());
CREATE POLICY "submissions_update" ON assignment_submissions FOR UPDATE USING (student_id = auth.uid() OR EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2,3)));

-- Exams/Results: public view, admin/teacher manage
CREATE POLICY "exams_select" ON exams FOR SELECT USING (true);
CREATE POLICY "exams_manage" ON exams FOR ALL USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2,3)));
CREATE POLICY "results_select" ON exam_results FOR SELECT USING (student_id = auth.uid() OR EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2,3)));
CREATE POLICY "results_manage" ON exam_results FOR ALL USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2,3)));

-- Quizzes: public
CREATE POLICY "quizzes_select" ON quizzes FOR SELECT USING (true);
CREATE POLICY "quizzes_manage" ON quizzes FOR ALL USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2,3)));
CREATE POLICY "quiz_attempts_select" ON quiz_attempts FOR SELECT USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2,3)));
CREATE POLICY "quiz_attempts_insert" ON quiz_attempts FOR INSERT WITH CHECK (user_id = auth.uid());

-- Live classes
CREATE POLICY "live_classes_select" ON live_classes FOR SELECT USING (true);
CREATE POLICY "live_classes_manage" ON live_classes FOR ALL USING (instructor_id = auth.uid() OR EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2)));

-- Notices/Announcements
CREATE POLICY "notices_select" ON notices FOR SELECT USING (true);
CREATE POLICY "notices_manage" ON notices FOR ALL USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2)));
CREATE POLICY "announcements_select" ON announcements FOR SELECT USING (true);
CREATE POLICY "announcements_manage" ON announcements FOR ALL USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2)));

-- Books
CREATE POLICY "books_select" ON books FOR SELECT USING (true);
CREATE POLICY "books_manage" ON books FOR ALL USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2)));

-- Incidents
CREATE POLICY "incidents_select" ON incidents FOR SELECT USING (student_id = auth.uid() OR EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2,3)));
CREATE POLICY "incidents_manage" ON incidents FOR ALL USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2,3)));

-- Public read tables (no RLS needed)
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "roles_select" ON roles FOR SELECT USING (true);
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "classes_select" ON classes FOR SELECT USING (true);
ALTER TABLE course_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories_select" ON course_categories FOR SELECT USING (true);
CREATE POLICY "categories_manage" ON course_categories FOR ALL USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2)));
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "subjects_select" ON subjects FOR SELECT USING (true);
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings_select" ON settings FOR SELECT USING (true);
CREATE POLICY "settings_manage" ON settings FOR ALL USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role_id IN (1,2)));

-- =========================================================
-- STORAGE BUCKETS
-- =========================================================
-- Run these in Supabase SQL editor or via dashboard:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('course-thumbnails', 'course-thumbnails', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('assignments', 'assignments', false);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);
