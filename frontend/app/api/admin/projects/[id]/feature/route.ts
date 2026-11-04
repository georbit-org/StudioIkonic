import { NextRequest } from 'next/server';
import { getSandboxIdFromCookies, isRequestAdminAuthorized } from '@/lib/server/session';
import { getSandbox } from '@/lib/server/sandbox';
import { jsonOk, jsonFail } from '@/lib/server/http';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, ctx: RouteContext) {
  if (!(await isRequestAdminAuthorized())) {
    return jsonFail('Unauthorized', 401, 'UNAUTHORIZED');
  }

  const { id } = await ctx.params;
  const projectId = parseInt(id, 10);
  const { sandboxId } = await getSandboxIdFromCookies();
  const store = getSandbox(sandboxId);

  const project = store.projects.find((p) => p.id === projectId);
  if (!project) {
    return jsonFail('Project not found', 404, 'NOT_FOUND');
  }

  const currentFeatured = store.projects.filter((p) => p.is_featured);
  if (!project.is_featured && currentFeatured.length >= 6) {
    return jsonFail(
      'Maximum 6 projects can be featured on homepage. Please unfeature another project first.',
      409,
      'FEATURED_LIMIT'
    );
  }

  project.is_featured = !project.is_featured;

  const msg = project.is_featured
    ? `"${project.title}" is now featured on homepage.`
    : `"${project.title}" has been unfeatured.`;

  return jsonOk(project, msg);
}

