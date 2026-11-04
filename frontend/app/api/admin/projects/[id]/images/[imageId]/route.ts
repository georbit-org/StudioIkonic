import { NextRequest } from 'next/server';
import { getSandboxIdFromCookies, isRequestAdminAuthorized } from '@/lib/server/session';
import { getSandbox } from '@/lib/server/sandbox';
import { jsonOk, jsonFail } from '@/lib/server/http';

interface RouteContext {
  params: Promise<{ id: string; imageId: string }>;
}

export async function DELETE(req: NextRequest, ctx: RouteContext) {
  if (!(await isRequestAdminAuthorized())) {
    return jsonFail('Unauthorized', 401, 'UNAUTHORIZED');
  }

  const { id, imageId } = await ctx.params;
  const projectId = parseInt(id, 10);
  const imgId = parseInt(imageId, 10);
  const { sandboxId } = await getSandboxIdFromCookies();
  const store = getSandbox(sandboxId);

  const project = store.projects.find((p) => p.id === projectId);
  if (!project) {
    return jsonFail('Project not found', 404, 'NOT_FOUND');
  }

  project.gallery = project.gallery.filter((g) => g.id !== imgId);

  return jsonOk({ imageId: imgId }, 'Gallery image deleted successfully.');
}

