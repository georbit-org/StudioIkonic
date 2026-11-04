import { NextRequest } from 'next/server';
import { getSandboxIdFromCookies, isRequestAdminAuthorized, setSandboxCookie } from '@/lib/server/session';
import { getSandbox } from '@/lib/server/sandbox';
import { jsonOk, jsonFail } from '@/lib/server/http';
import { Project } from '@/lib/server/types';

const PROJECTS_PER_PAGE = 9;

export async function GET(req: NextRequest) {
  if (!(await isRequestAdminAuthorized())) {
    return jsonFail('Unauthorized. Please log in as administrator.', 401, 'UNAUTHORIZED');
  }

  const { sandboxId, isNew } = await getSandboxIdFromCookies();
  const store = getSandbox(sandboxId);

  const searchParams = req.nextUrl.searchParams;
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const category = searchParams.get('category') || 'All';
  const query = searchParams.get('q')?.toLowerCase() || '';

  let filtered = store.projects;
  if (category !== 'All') {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }
  if (query) {
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.desc.toLowerCase().includes(query)
    );
  }

  const totalProjects = filtered.length;
  const totalPages = Math.ceil(totalProjects / PROJECTS_PER_PAGE) || 1;
  const offset = (page - 1) * PROJECTS_PER_PAGE;
  const paginated = filtered.slice(offset, offset + PROJECTS_PER_PAGE);
  const featuredCount = store.projects.filter((p) => p.is_featured).length;

  const res = jsonOk({
    projects: paginated,
    pagination: {
      page,
      perPage: PROJECTS_PER_PAGE,
      totalProjects,
      totalPages,
    },
    featuredCount,
  });

  if (isNew) {
    setSandboxCookie(res, sandboxId);
  }

  return res;
}

export async function POST(req: NextRequest) {
  if (!(await isRequestAdminAuthorized())) {
    return jsonFail('Unauthorized. Please log in as administrator.', 401, 'UNAUTHORIZED');
  }

  const { sandboxId } = await getSandboxIdFromCookies();
  const store = getSandbox(sandboxId);

  const body = await req.json();
  const title = body.title?.trim();
  if (!title) {
    return jsonFail('Project title is required.', 400, 'VALIDATION_ERROR');
  }

  const nextId = Math.max(...store.projects.map((p) => p.id), 0) + 1;
  const newProject: Project = {
    id: nextId,
    title,
    location: body.location?.trim() || 'Sector 56, Gurgaon',
    date: body.date?.trim() || String(new Date().getFullYear()),
    category: body.category?.trim() || 'Residential',
    status: body.status?.trim() || 'Completed',
    budget: body.budget?.trim() || '₹75L',
    area: body.area?.trim() || '3,500 sq ft',
    desc: body.desc?.trim() || 'Custom luxury interior transformation crafted by Iconic Design.',
    cover_image: body.cover_image?.trim() || '/uploads/interior3.jpg',
    gallery: Array.isArray(body.gallery)
      ? body.gallery.map((g: any, i: number) => ({
          id: i + 1,
          url: typeof g === 'string' ? g : g.url,
          caption: `${title} view ${i + 1}`,
        }))
      : [{ id: 1, url: '/uploads/interior3.jpg', caption: 'Living view' }],
    is_featured: Boolean(body.is_featured),
    highlights: Array.isArray(body.highlights)
      ? body.highlights
      : ['Bespoke Finishes', 'Custom Millwork'],
  };

  store.projects.unshift(newProject);

  return jsonOk(newProject, 'Project successfully added!', { status: 201 });
}
