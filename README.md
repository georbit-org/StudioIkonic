# Studio Ikonic — Luxury Interior Design Client Demo

A lightweight, zero-backend interactive client demonstration build for **Iconic Design**, a premier luxury interior design studio based in Gurgaon.

This repository is optimized as a **100% Static Web Application (Next.js 16 SSG)** ready for free, instant deployment on Render, Vercel, or Netlify with zero cold starts, zero database maintenance, and fast CDN response times.

---

## ✨ Client Test Drive & Interactive Demo Features

1. **Admin Portal Button**
   - Visible on both desktop navbar and mobile slide-out menu.
   - Takes the client directly to the `/admin/login` portal.

2. **Simulated Authentication (`/admin/login`)**
   - Entering any username or password realistically verifies and displays:
     > *"Wrong credentials. Direct authentication is disabled in this preview version."*
   - Prominent **"Preview as Admin"** button allows immediate test-drive access into the administrative dashboard.

3. **Complete Admin Dashboard Suite (`/admin`)**
   - **Overview (`/admin`):** Live portfolio metrics, active leads counter, 5-star review tally, and real-time recent client inquiries.
   - **Portfolio Management (`/admin/projects`):** Search by project, filter by Residential / Commercial / Retail, toggle featured status on homepage, inspect details.
   - **Reviews & Testimonials (`/admin/testimonials`):** Review luxury homeowner feedback, toggle visibility, and explore review creation.
   - **Inquiries & Leads (`/admin/leads`):** View inquiries with real-time browser session sync (`sessionStorage`). Includes a "Simulate Lead" trigger.
   - **Studio Settings (`/admin/settings`):** Contact numbers, official address, inquiry email routing, and security password reset mockups.
   - **Interactive Preview Modals:** Every administrative write operation (Add, Edit, Delete, Toggle, Upload, Save) triggers a luxury styled dialog explaining what happens in the production build with real databases.

4. **Realistic Contact & Consultation Submission**
   - The "Schedule a Consultation" form validates inputs, simulates realistic transmission time, triggers an inquiry confirmation popup, and dynamically pushes the new lead into `/admin/leads` for that browser session.

---

## 🚀 Local Development

### 1. Prerequisites
- Node.js 18+ (Node.js 20 recommended)
- npm or pnpm

### 2. Setup & Run
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build & Test Static Export
```bash
cd frontend
npm run build
```
This generates the static site in `frontend/out/`.

---

## 🌐 Deployment to Render (Free Static Site)

Deploying as a **Static Site** on Render provides zero cold-start delay, global CDN caching, and 100% uptime with zero server cost.

### Option A: Automatic via Blueprint (`render.yaml`)
1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "Convert to lightweight client demo with interactive admin preview"
   git push origin main
   ```
2. Log in to your [Render Dashboard](https://dashboard.render.com).
3. Click **New +** → **Blueprint**.
4. Select your `StudioIkonic` repository. Render will automatically detect `render.yaml` and configure the static service.
5. Click **Apply**.

---

### Option B: Manual Static Site Setup on Render
1. In the [Render Dashboard](https://dashboard.render.com), click **New +** → **Static Site**.
2. Connect your GitHub repository.
3. Configure the following settings:
   - **Name:** `studio-ikonic` (or your choice)
   - **Branch:** `main`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `out`
4. Click **Create Static Site**.
5. Once deployment completes, your site will be live at `https://studio-ikonic.onrender.com`.

---

## 🔒 Security Notice: Key Rotation
> **Important:** The original repository contained legacy credentials (`ADMIN_MASTER_KEY` and Supabase keys) in old server configuration files. Although the backend and database dependencies have been removed in this static demo, please ensure you **rotate the Supabase service role key** and database passwords in your Supabase console to prevent unintended access from git history.
