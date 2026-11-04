import { NextResponse } from 'next/server';
import { setAdminSessionCookie, getSandboxIdFromCookies, setSandboxCookie } from '@/lib/server/session';
import { jsonOk } from '@/lib/server/http';

export async function POST() {
  const { sandboxId, isNew } = await getSandboxIdFromCookies();

  const res = jsonOk(
    {
      user: {
        id: 1,
        name: 'Administrator (Preview Mode)',
        email: 'admin@iconicdesign.in',
        role: 'admin',
      },
    },
    'Authenticated as Administrator'
  );

  setAdminSessionCookie(res);
  if (isNew) {
    setSandboxCookie(res, sandboxId);
  }

  return res;
}

