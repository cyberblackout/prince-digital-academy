# 🎓 Prince Digital Academy

> **Smart Learning, Real Results** — A modern Learning Management System built with Next.js 16, Supabase, and Tailwind CSS v4.

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 (App Router), TypeScript, Tailwind CSS v4 |
| **Backend/DB** | Supabase (PostgreSQL, Auth, Storage, RLS) |
| **Payments** | Paystack (GHS / Mobile Money) |
| **SMS** | AfricasTalking |
| **Deployment** | Vercel |

## 📋 Prerequisites

- Node.js 18+
- npm
- A Supabase account (free tier works)
- Paystack account (for payments)

---

## 🛠️ Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **"New Project"**
3. Choose a name (e.g., `prince-digital-academy`), set a database password, and select a region close to your users (e.g., `West EU` for Ghana)
4. Wait for the project to initialize (~2 minutes)
5. Go to **Settings → API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep secret!)

### 2. Run the Database Migration

1. In your Supabase dashboard, go to **SQL Editor**
2. Open the file `supabase/migrations/001_initial_schema.sql`
3. Copy the entire contents and paste into the SQL editor
4. Click **Run** to create all 30+ tables, indexes, RLS policies, and seed data

### 3. Set Up Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or use an existing one
3. Enable the **Google+ API**
4. Go to **Credentials → Create Credentials → OAuth 2.0 Client**
5. Add authorized redirect URI: `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`
6. In Supabase dashboard: **Authentication → Providers → Google**
7. Enable Google and paste your Client ID and Client Secret

### 4. Set Up Storage Buckets

In Supabase SQL Editor, run:

```sql
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('course-thumbnails', 'course-thumbnails', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('assignments', 'assignments', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);
```

### 5. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase and Paystack credentials.

### 6. Install Dependencies & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

### 7. Create Your First Admin User

1. Register a new account via `/register`
2. In Supabase dashboard, go to **Table Editor → users**
3. Find your user and change `role_id` to `1` (Super Admin)
4. Log out and log back in — you'll be redirected to the admin dashboard

---

## 🏗️ Project Structure

```
prince-digital-academy/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Login, Register, Forgot Password
│   │   ├── (public)/           # Courses, About, Contact
│   │   ├── (dashboard)/        # Admin, Teacher, Student dashboards
│   │   └── api/                # Payment & auth API routes
│   ├── components/             # Reusable UI components
│   ├── lib/                    # Supabase clients, utilities, Paystack, SMS
│   ├── providers/              # Auth & Theme context providers
│   └── types/                  # TypeScript type definitions
├── supabase/migrations/        # PostgreSQL migration scripts
├── vercel.json                 # Vercel deployment config
└── .env.example                # Environment variable template
```

## 🎨 Design System

- **Primary**: `#7B2D3B` (Burgundy)
- **Secondary**: `#D4A12A` (Gold)
- **Fonts**: Inter (body) + Poppins (headings)
- Glassmorphism cards, smooth animations, gradient CTAs

## 💳 Payment Flow

1. Student clicks "Enroll" on a paid course
2. System creates a payment record and redirects to Paystack
3. After payment, Paystack redirects to `/api/payments/verify`
4. Upon successful verification, enrollment is auto-created
5. Paystack webhook (`/api/payments/webhook`) handles async confirmations

## 📱 Features

- ✅ Role-based dashboards (Admin / Teacher / Student)
- ✅ Course management with sections & lessons
- ✅ Paystack payment integration (GHS)
- ✅ Live classes (Zoom/Google Meet)
- ✅ Quizzes & Exams with grading
- ✅ Assignment submissions
- ✅ Library management
- ✅ Behaviour tracking & incidents
- ✅ HR & staff management
- ✅ SMS notifications (AfricasTalking)
- ✅ Notices & announcements
- ✅ Student performance tracking
- ✅ Google OAuth login
- ✅ Responsive design (mobile-first)

---

## 🚀 Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add your environment variables in Vercel dashboard
4. Deploy! 🎉

### Environment Variables for Vercel

Add these in **Settings → Environment Variables**:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `PAYSTACK_SECRET_KEY` | Paystack secret key |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Paystack public key |
| `AT_USERNAME` | AfricasTalking username |
| `AT_API_KEY` | AfricasTalking API key |
| `AT_SENDER_ID` | SMS sender ID |
| `NEXT_PUBLIC_SITE_URL` | Your production URL |

---

## 📄 License

MIT © Prince Digital Academy
