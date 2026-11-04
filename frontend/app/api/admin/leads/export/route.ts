import { getSandboxIdFromCookies, isRequestAdminAuthorized } from '@/lib/server/session';
import { getSandbox } from '@/lib/server/sandbox';
import { jsonFail } from '@/lib/server/http';

function escapeCsvCell(val: unknown): string {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET() {
  if (!(await isRequestAdminAuthorized())) {
    return jsonFail('Unauthorized', 401, 'UNAUTHORIZED');
  }

  const { sandboxId } = await getSandboxIdFromCookies();
  const store = getSandbox(sandboxId);

  const headers = ['ID', 'Date', 'Client Name', 'Phone', 'Email', 'Service', 'Budget', 'Status', 'Message'];
  const rows = store.leads.map((lead) => [
    escapeCsvCell(lead.id),
    escapeCsvCell(lead.created_at),
    escapeCsvCell(lead.name),
    escapeCsvCell(lead.phone),
    escapeCsvCell(lead.email),
    escapeCsvCell(lead.service || ''),
    escapeCsvCell(lead.budget || ''),
    escapeCsvCell(lead.status),
    escapeCsvCell(lead.message),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

  return new Response(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="studioikonic_leads_export.csv"',
    },
  });
}

