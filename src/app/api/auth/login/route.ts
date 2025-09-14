// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookieHeadersSet } from '@/lib/auth';
import { logRequest } from '@/lib/logger';

type LoginPayload = {
  username: string;
  password: string; // required input; we still don't verify it (per request)
};

function isPayload(x: unknown): x is LoginPayload {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return typeof o.username === 'string' && typeof o.password === 'string';
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const body: unknown = await req.json().catch(() => null);

  if (!isPayload(body)) {
    return NextResponse.json({ ok: false, error: 'username and password required' }, { status: 400 });
  }

  const username = body.username.trim();
  if (!username) {
    return NextResponse.json({ ok: false, error: 'invalid username' }, { status: 400 });
  }

  // optional: require that user exists first
  const exists = await prisma.user.findUnique({ where: { username } });
  if (!exists) {
    await logRequest({
      method: 'POST',
      path: '/api/auth/login',
      query: Object.fromEntries(url.searchParams.entries()),
      headers: Object.fromEntries(req.headers.entries()),
      body: { event: 'login_failed_user_missing', username },
    });
    return NextResponse.json({ ok: false, error: 'user not found, please sign up first' }, { status: 404 });
  }

  // Log successful login attempt (no secrets)
  await logRequest({
    method: 'POST',
    path: '/api/auth/login',
    query: Object.fromEntries(url.searchParams.entries()),
    headers: Object.fromEntries(req.headers.entries()),
    body: { event: 'login_success', username },
  });

  const res = NextResponse.json({ ok: true, username });
  const headers = cookieHeadersSet(username);
  Object.entries(headers).forEach(([k, v]) => res.headers.set(k, v));
  return res;
}
