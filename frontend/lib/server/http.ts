import { NextResponse } from 'next/server';

export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export function jsonOk<T>(data: T, message?: string, init?: ResponseInit): NextResponse {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(message ? { message } : {}),
    },
    init
  );
}

export function jsonFail(message: string, status = 400, code = 'BAD_REQUEST'): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
      },
    },
    { status }
  );
}
