import { NextRequest } from 'next/server';
import { getSandboxIdFromCookies, isRequestAdminAuthorized } from '@/lib/server/session';
import { getSandbox } from '@/lib/server/sandbox';
import { jsonOk, jsonFail } from '@/lib/server/http';

const LEADS_PER_PAGE = 10;

export async function GET(req: NextRequest) {
  if (!(await isRequestAdminAuthorized())) {
    return jsonFail('Unauthorized', 401, 'UNAUTHORIZED');
  }

  const { sandboxId } = await getSandboxIdFromCookies();
  const store = getSandbox(sandboxId);

  const searchParams = req.nextUrl.searchParams;
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const query = searchParams.get('q')?.toLowerCase() || '';
  const status = searchParams.get('status') || 'All';

  let filtered = store.leads;
  if (status !== 'All') {
    filtered = filtered.filter((l) => l.status === status.toLowerCase());
  }
  if (query) {
    filtered = filtered.filter(
      (l) =>
        l.name.toLowerCase().includes(query) ||
        l.phone.includes(query) ||
        l.email.toLowerCase().includes(query) ||
        l.message.toLowerCase().includes(query)
    );
  }

  const totalLeads = filtered.length;
  const totalPages = Math.ceil(totalLeads / LEADS_PER_PAGE) || 1;
  const offset = (page - 1) * LEADS_PER_PAGE;
  const paginated = filtered.slice(offset, offset + LEADS_PER_PAGE);

  return jsonOk({
    leads: paginated,
    pagination: {
      page,
      perPage: LEADS_PER_PAGE,
      totalLeads,
      totalPages,
    },
  });
}
