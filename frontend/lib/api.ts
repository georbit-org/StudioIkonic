// API layer — all calls to the Flask backend
// The Flask backend runs on a separate port/domain and is NOT modified.

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';

// Fetch with error handling
async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    next: { revalidate: 60 }, // Cache for 60 seconds
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// Home page data
export async function fetchHomeData() {
  return fetchJSON<import('../types').HomePageData>(`${BACKEND_URL}/api/home`);
}

// All projects with pagination
export async function fetchAllProjects(page: number = 1) {
  return fetchJSON<import('../types').AllProjectsData>(
    `${BACKEND_URL}/api/projects?page=${page}`
  );
}

// Single project detail
export async function fetchProject(id: number) {
  return fetchJSON<import('../types').ProjectDetailData>(
    `${BACKEND_URL}/api/project/${id}`
  );
}

// Site settings
export async function fetchSiteSettings(): Promise<import('../types').SiteSettings> {
  return fetchJSON(`${BACKEND_URL}/api/settings`);
}

// Submit contact form — POST to Flask /api/contact
export async function submitContactForm(data: import('../types').ContactFormData) {
  const formData = new URLSearchParams();
  Object.entries(data).forEach(([k, v]) => {
    if (v !== undefined) formData.append(k, v);
  });

  const res = await fetch(`${BACKEND_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString(),
  });
  return res;
}
