import { NextRequest } from 'next/server';
import { getSandboxIdFromCookies, isRequestAdminAuthorized } from '@/lib/server/session';
import { getSandbox } from '@/lib/server/sandbox';
import { jsonOk, jsonFail } from '@/lib/server/http';

export async function GET() {
  if (!(await isRequestAdminAuthorized())) {
    return jsonFail('Unauthorized', 401, 'UNAUTHORIZED');
  }

  const { sandboxId } = await getSandboxIdFromCookies();
  const store = getSandbox(sandboxId);

  return jsonOk(store.settings);
}

export async function PUT(req: NextRequest) {
  if (!(await isRequestAdminAuthorized())) {
    return jsonFail('Unauthorized', 401, 'UNAUTHORIZED');
  }

  const { sandboxId } = await getSandboxIdFromCookies();
  const store = getSandbox(sandboxId);

  try {
    const updates = await req.json();
    store.settings = {
      ...store.settings,
      ...updates,
    };

    return jsonOk(store.settings, 'Studio settings updated successfully!');
  } catch (err) {
    return jsonFail('Failed to parse settings update', 400);
  }
}

