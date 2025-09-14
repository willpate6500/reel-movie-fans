// src/app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logRequest } from '@/lib/logger';
import type { Prisma } from '@prisma/client';

type SignupPayload = {
  username: string;
  password: string; // stored as-is per your request (NOT secure)
  email?: string;
  details?: Record<string, unknown>;
};

function isPayload(x: unknown): x is SignupPayload {
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

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: body.password,
        email: body.email ?? null,
        // Omit the field entirely if it's undefined, otherwise cast to InputJsonValue
        ...(body.details !== undefined
          ? { details: body.details as Prisma.InputJsonValue }
          : {}),
      },
    });

    await logRequest({
      method: 'POST',
      path: '/api/auth/signup',
      query: Object.fromEntries(url.searchParams.entries()),
      headers: Object.fromEntries(req.headers.entries()),
      body: { event: 'signup_success', username, userId: user.id },
    });

    return NextResponse.json(
      { ok: true, user: { id: user.id, username: user.username } },
      { status: 201 }
    );
  } catch {
    await logRequest({
      method: 'POST',
      path: '/api/auth/signup',
      query: Object.fromEntries(url.searchParams.entries()),
      headers: Object.fromEntries(req.headers.entries()),
      body: { event: 'signup_failure', username },
    });
    return NextResponse.json({ ok: false, error: 'username already exists?' }, { status: 409 });
  }
}
