import { NextRequest } from 'next/server';
import { getSandboxIdFromCookies, isRequestAdminAuthorized } from '@/lib/server/session';
import { getSandbox } from '@/lib/server/sandbox';
import { jsonOk, jsonFail } from '@/lib/server/http';
import { Testimonial } from '@/lib/server/types';

export async function GET() {
  if (!(await isRequestAdminAuthorized())) {
    return jsonFail('Unauthorized', 401, 'UNAUTHORIZED');
  }

  const { sandboxId } = await getSandboxIdFromCookies();
  const store = getSandbox(sandboxId);

  return jsonOk(store.testimonials);
}

export async function POST(req: NextRequest) {
  if (!(await isRequestAdminAuthorized())) {
    return jsonFail('Unauthorized', 401, 'UNAUTHORIZED');
  }

  const { sandboxId } = await getSandboxIdFromCookies();
  const store = getSandbox(sandboxId);

  const body = await req.json();
  const name = body.name?.trim();
  const text = body.text?.trim();

  if (!name || !text) {
    return jsonFail('Client name and review text are required.', 400, 'VALIDATION_ERROR');
  }

  const nextId = Math.max(...store.testimonials.map((t) => t.id), 0) + 1;
  const initials = name
    .split(' ')
    .map((w: string) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const newTestimonial: Testimonial = {
    id: nextId,
    stars: body.stars || 5,
    name,
    role: body.role?.trim() || 'Villa Owner, Gurgaon',
    text,
    initials,
    published: true,
  };

  store.testimonials.unshift(newTestimonial);

  return jsonOk(newTestimonial, 'Testimonial added successfully!', { status: 201 });
}

