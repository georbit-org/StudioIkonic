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
  const testimonialId = parseInt(id, 10);
  const { sandboxId } = await getSandboxIdFromCookies();
  const store = getSandbox(sandboxId);

  const item = store.testimonials.find((t) => t.id === testimonialId);
  if (!item) {
    return jsonFail('Testimonial not found', 404, 'NOT_FOUND');
  }

  return jsonOk(item);
}

export async function PUT(req: NextRequest, ctx: RouteContext) {
  if (!(await isRequestAdminAuthorized())) {
    return jsonFail('Unauthorized', 401, 'UNAUTHORIZED');
  }

  const { id } = await ctx.params;
  const testimonialId = parseInt(id, 10);
  const { sandboxId } = await getSandboxIdFromCookies();
  const store = getSandbox(sandboxId);

  const itemIndex = store.testimonials.findIndex((t) => t.id === testimonialId);
  if (itemIndex === -1) {
    return jsonFail('Testimonial not found', 404, 'NOT_FOUND');
  }

  const body = await req.json();
  const existing = store.testimonials[itemIndex];

  const updated = {
    ...existing,
    ...body,
    id: testimonialId,
  };

  store.testimonials[itemIndex] = updated;

  return jsonOk(updated, 'Testimonial updated successfully!');
}

export async function DELETE(req: NextRequest, ctx: RouteContext) {
  if (!(await isRequestAdminAuthorized())) {
    return jsonFail('Unauthorized', 401, 'UNAUTHORIZED');
  }

  const { id } = await ctx.params;
  const testimonialId = parseInt(id, 10);
  const { sandboxId } = await getSandboxIdFromCookies();
  const store = getSandbox(sandboxId);

  const index = store.testimonials.findIndex((t) => t.id === testimonialId);
  if (index === -1) {
    return jsonFail('Testimonial not found', 404, 'NOT_FOUND');
  }

  store.testimonials.splice(index, 1);

  return jsonOk({ id: testimonialId }, 'Testimonial deleted successfully.');
}
