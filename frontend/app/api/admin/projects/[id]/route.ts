import { NextRequest } from 'next/server';
import { getSandboxIdFromCookies, isRequestAdminAuthorized } from '@/lib/server/session';
import { getSandbox } from '@/lib/server/sandbox';
import { jsonOk, jsonFail } from '@/lib/server/http';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, ctx: RouteContext) {
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

  return jsonOk(project);
}

export async function PUT(req: NextRequest, ctx: RouteContext) {
  if (!(await isRequestAdminAuthorized())) {
    return jsonFail('Unauthorized', 401, 'UNAUTHORIZED');
  }

  const { id } = await ctx.params;
  const projectId = parseInt(id, 10);
  const { sandboxId } = await getSandboxIdFromCookies();
  const store = getSandbox(sandboxId);

  const projectIndex = store.projects.findIndex((p) => p.id === projectId);
  if (projectIndex === -1) {
    return jsonFail('Project not found', 404, 'NOT_FOUND');
  }

  const body = await req.json();
  const existing = store.projects[projectIndex];

  const updated = {
    ...existing,
    ...body,
    id: projectId, // preserve ID
  };

  store.projects[projectIndex] = updated;

  return jsonOk(updated, 'Project updated successfully!');
}

export async function DELETE(req: NextRequest, ctx: RouteContext) {
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

  store.projects = store.projects.filter((p) => p.id !== projectId);

  return jsonOk({ id: projectId }, 'Project deleted successfully.');
}
