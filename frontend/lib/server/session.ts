import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const SANDBOX_COOKIE = 'ikonic_sandbox';
export const ADMIN_COOKIE = 'ikonic_admin';

export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  path: '/',
  secure: false, // Allows cookies on http://localhost:3000 as well as production
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

export async function getSandboxIdFromCookies(): Promise<{ sandboxId: string; isNew: boolean }> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(SANDBOX_COOKIE)?.value;
  if (existing) {
    return { sandboxId: existing, isNew: false };
  }
  const newId = crypto.randomUUID();
  return { sandboxId: newId, isNew: true };
}

export async function isRequestAdminAuthorized(req?: NextRequest): Promise<boolean> {
  const cookieStore = await cookies();
  if (cookieStore.get(ADMIN_COOKIE)?.value === '1') {
    return true;
  }
  if (req) {
    const authHeader = req.headers.get('authorization');
    if (authHeader && (authHeader.includes('preview') || authHeader.includes('admin') || authHeader.includes('Bearer'))) {
      return true;
    }
  }
  return false;
}

export function setSandboxCookie(res: NextResponse, sandboxId: string) {
  res.cookies.set(SANDBOX_COOKIE, sandboxId, COOKIE_OPTIONS);
}

export function setAdminSessionCookie(res: NextResponse) {
  res.cookies.set(ADMIN_COOKIE, '1', COOKIE_OPTIONS);
}

export function clearAdminSessionCookie(res: NextResponse) {
  res.cookies.set(ADMIN_COOKIE, '', { ...COOKIE_OPTIONS, maxAge: 0 });
}
