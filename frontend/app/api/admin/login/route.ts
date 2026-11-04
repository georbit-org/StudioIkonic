import { NextRequest } from 'next/server';
import { jsonFail } from '@/lib/server/http';

export async function POST(req: NextRequest) {
  // Simulate realistic authentication hashing latency
  await new Promise((resolve) => setTimeout(resolve, 550));

  // As requested: all credentials intentionally throw Wrong credentials
  return jsonFail('Wrong credentials. Please try again.', 401, 'INVALID_CREDENTIALS');
}
