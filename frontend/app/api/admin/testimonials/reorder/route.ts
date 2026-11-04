import { NextRequest } from 'next/server';
import { getSandboxIdFromCookies, isRequestAdminAuthorized } from '@/lib/server/session';
import { getSandbox } from '@/lib/server/sandbox';
import { jsonOk, jsonFail } from '@/lib/server/http';

export async function POST(req: NextRequest) {
  if (!(await isRequestAdminAuthorized())) {
    return jsonFail('Unauthorized', 401, 'UNAUTHORIZED');
  }

  const { sandboxId } = await getSandboxIdFromCookies();
  const store = getSandbox(sandboxId);

  try {
    const body = await req.json();

    if (Array.isArray(body.orderedIds)) {
      const orderMap = new Map<number, number>(
        body.orderedIds.map((id: number, idx: number) => [Number(id), idx])
      );
      store.testimonials.sort((a, b) => {
        const orderA = orderMap.get(a.id) ?? 9999;
        const orderB = orderMap.get(b.id) ?? 9999;
        return orderA - orderB;
      });
      return jsonOk(store.testimonials, 'Order updated successfully');
    }

    const { id, direction } = body;
    if (typeof id !== 'number' || (direction !== 'up' && direction !== 'down')) {
      return jsonFail('Invalid reorder request. Expected { id: number, direction: "up" | "down" }', 400);
    }

    const idx = store.testimonials.findIndex((t) => t.id === id);
    if (idx === -1) {
      return jsonFail('Testimonial not found', 404, 'NOT_FOUND');
    }

    if (direction === 'up' && idx > 0) {
      const temp = store.testimonials[idx];
      store.testimonials[idx] = store.testimonials[idx - 1];
      store.testimonials[idx - 1] = temp;
    } else if (direction === 'down' && idx < store.testimonials.length - 1) {
      const temp = store.testimonials[idx];
      store.testimonials[idx] = store.testimonials[idx + 1];
      store.testimonials[idx + 1] = temp;
    }

    return jsonOk(store.testimonials, 'Order updated successfully');
  } catch (err) {
    return jsonFail('Failed to reorder testimonials', 500);
  }
}

