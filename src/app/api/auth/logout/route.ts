// src/app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { cookieHeadersClear } from '@/lib/auth';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  const headers = cookieHeadersClear();
  Object.entries(headers).forEach(([k, v]) => res.headers.set(k, v));
  return res;
}
