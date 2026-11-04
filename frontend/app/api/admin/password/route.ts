import { NextRequest } from 'next/server';
import { isRequestAdminAuthorized } from '@/lib/server/session';
import { jsonOk, jsonFail } from '@/lib/server/http';

export async function POST(req: NextRequest) {
  if (!(await isRequestAdminAuthorized())) {
    return jsonFail('Unauthorized', 401, 'UNAUTHORIZED');
  }

  try {
    const { newPassword, confirmPassword } = await req.json();

    if (!newPassword || newPassword.length < 6) {
      return jsonFail('New password must be at least 6 characters long.', 400, 'VALIDATION_ERROR');
    }

    if (newPassword !== confirmPassword) {
      return jsonFail('New password and confirmation do not match.', 400, 'VALIDATION_ERROR');
    }

    return jsonOk({ updated: true }, 'Admin password updated successfully!');
  } catch (err) {
    return jsonFail('Invalid request body', 400);
  }
}
