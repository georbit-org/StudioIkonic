import { NextResponse } from 'next/server';
import { clearAdminSessionCookie } from '@/lib/server/session';
import { jsonOk } from '@/lib/server/http';

export async function POST() {
  const res = jsonOk({ loggedOut: true }, 'Successfully logged out of Admin Portal');
  clearAdminSessionCookie(res);
  return res;
}

