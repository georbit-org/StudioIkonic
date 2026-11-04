import { NextRequest } from 'next/server';
import { getSandboxIdFromCookies, setSandboxCookie } from '@/lib/server/session';
import { getSandbox } from '@/lib/server/sandbox';
import { jsonOk, jsonFail } from '@/lib/server/http';
import { Lead } from '@/lib/server/types';

export async function POST(req: NextRequest) {
  try {
    let name = '';
    let phone = '';
    let email = '';
    let service = '';
    let message = '';

    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = await req.json();
      name = body.name?.trim() || '';
      phone = body.phone?.trim() || '';
      email = body.email?.trim() || '';
      service = body.service?.trim() || 'Residential';
      message = body.message?.trim() || '';
    } else {
      const formData = await req.formData();
      name = (formData.get('name') as string)?.trim() || '';
      phone = (formData.get('phone') as string)?.trim() || '';
      email = (formData.get('email') as string)?.trim() || '';
      service = (formData.get('service') as string)?.trim() || 'Residential';
      message = (formData.get('message') as string)?.trim() || '';
    }

    if (!name) {
      return jsonFail('Your name is required.', 400, 'VALIDATION_ERROR');
    }
    if (!phone) {
      return jsonFail('Your phone number is required.', 400, 'VALIDATION_ERROR');
    }

    const { sandboxId, isNew } = await getSandboxIdFromCookies();
    const store = getSandbox(sandboxId);

    const newLead: Lead = {
      id: Date.now(),
      name,
      phone,
      email,
      service,
      budget: 'Flexible',
      message,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'new',
    };

    store.leads.unshift(newLead);

    const res = jsonOk(
      { lead: newLead, emailNotified: true },
      'Thank you! Your enquiry has been received. Shakir Ali will contact you shortly.'
    );

    if (isNew) {
      setSandboxCookie(res, sandboxId);
    }

    return res;
  } catch (error) {
    return jsonFail('Failed to process enquiry. Please try again.', 500, 'SERVER_ERROR');
  }
}

