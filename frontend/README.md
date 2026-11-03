# Iconic Design — Next.js Frontend

This is the Next.js 14 (App Router) + TypeScript frontend for the Iconic Design portfolio site. It runs **alongside** the existing Flask backend — the Flask backend is never modified except for the additive JSON API endpoints.

## Architecture

```
Browser (:3000)
    │
    ├── Next.js (this app)     — Public-facing pages: /, /projects, /projects/[id]
    │       │
    │       └── Proxies /api/* → Flask (:5001)
    │
    └── Flask (:5001)          — Admin panel, JSON APIs, static files, uploads
```

## Prerequisites

- Node.js 18+
- Flask backend running (see root `README.md` for Flask setup)

## Setup

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Create environment file

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5001
```

### 3. Start Flask backend

From the project root:

```bash
# Windows (with Anaconda Python that has all packages)
C:\Users\Rehan\anaconda3\python.exe app.py
```

> **Important:** Flask needs a `.env` file in the project root with `DATABASE_URL` set to your Supabase PostgreSQL connection string. Copy `.env.example` to `.env` and fill in your credentials.

### 4. Start Next.js dev server

```bash
npm run dev
```

Visit **http://localhost:3000**

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, stats, about, featured projects, services, testimonials, CTA |
| `/projects` | Full project gallery with pagination |
| `/projects/[id]` | Project detail with gallery and related projects |
| `/_not-found` | Custom 404 page |

## Key Files

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout — Bootstrap, Font Awesome, Google Fonts CDN
│   ├── globals.css         # Design tokens + component CSS (migrated from Flask templates)
│   ├── page.tsx            # Homepage
│   ├── not-found.tsx       # 404 page
│   └── projects/
│       ├── page.tsx        # All projects grid
│       └── [id]/page.tsx   # Project detail
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky nav with scroll effect + back button
│   │   └── Footer.tsx      # Footer with contact info
│   ├── home/               # Hero, Stats, About, Projects, Services, Testimonials, CTA
│   ├── projects/           # ProjectCard, Pagination
│   └── shared/             # AosInit, ContactModal
├── lib/api.ts              # Typed fetch helpers for Flask JSON API
├── types/index.ts          # TypeScript interfaces
└── next.config.ts          # Rewrites: /api/* → Flask, /uploads/* → Flask
```

## Production Build

```bash
npm run build
npm start
```

## Admin Panel

The admin panel (`/admin/*`) is served directly by Flask on port 5001. Access it at **http://localhost:5001/admin**.
