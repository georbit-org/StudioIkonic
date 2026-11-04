import { NextRequest } from 'next/server';
import { getSandboxIdFromCookies, isRequestAdminAuthorized } from '@/lib/server/session';
import { getSandbox } from '@/lib/server/sandbox';
import { jsonOk, jsonFail } from '@/lib/server/http';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function DELETE(req: NextRequest, ctx: RouteContext) {
  if (!(await isRequestAdminAuthorized())) {
    return jsonFail('Unauthorized', 401, 'UNAUTHORIZED');
  }

  const { id } = await ctx.params;
  const leadId = parseInt(id, 10);
  const { sandboxId } = await getSandboxIdFromCookies();
  const store = getSandbox(sandboxId);

  const index = store.leads.findIndex((l) => l.id === leadId);
  if (index === -1) {
    return jsonFail('Inquiry not found', 404, 'NOT_FOUND');
  }

  store.leads.splice(index, 1);

  return jsonOk({ id: leadId }, 'Inquiry successfully deleted.');
}
