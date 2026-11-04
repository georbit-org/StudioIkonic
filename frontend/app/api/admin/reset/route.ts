import { getSandboxIdFromCookies, isRequestAdminAuthorized } from '@/lib/server/session';
import { resetSandbox } from '@/lib/server/sandbox';
import { jsonOk, jsonFail } from '@/lib/server/http';

export async function POST() {
  if (!(await isRequestAdminAuthorized())) {
    return jsonFail('Unauthorized', 401, 'UNAUTHORIZED');
  }

  const { sandboxId } = await getSandboxIdFromCookies();
  const fresh = resetSandbox(sandboxId);

  return jsonOk(
    { reset: true, projectsCount: fresh.projects.length, leadsCount: fresh.leads.length },
    'Demo sandbox has been reset to its pristine factory state!'
  );
}

