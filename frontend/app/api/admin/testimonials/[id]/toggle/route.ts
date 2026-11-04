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
  const testimonialId = parseInt(id, 10);
  const { sandboxId } = await getSandboxIdFromCookies();
  const store = getSandbox(sandboxId);

  const item = store.testimonials.find((t) => t.id === testimonialId);
  if (!item) {
    return jsonFail('Testimonial not found', 404, 'NOT_FOUND');
  }

  item.published = !item.published;

  return jsonOk(
    item,
    `Review by "${item.name}" is now ${item.published ? 'published' : 'hidden'}.`
  );
}

