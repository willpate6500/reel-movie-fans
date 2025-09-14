// src/app/api/auth/me/route.ts
import { NextResponse } from 'next/server';
import { getLoggedInUsername } from '@/lib/auth';

export async function GET() {
  const username = await getLoggedInUsername();
  return NextResponse.json({ ok: true, username });
}
