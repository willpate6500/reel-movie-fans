import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type SubscribePayload = { email: string };

function isPayload(x: unknown): x is SubscribePayload {
  return !!x && typeof x === 'object' && 'email' in (x as Record<string, unknown>);
}

export async function POST(req: Request) {
  const body: unknown = await req.json().catch(() => null);
  if (!isPayload(body)) {
    return NextResponse.json({ ok: false, error: 'email required' }, { status: 400 });
  }
  const email = String(body.email).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid email' }, { status: 400 });
    }

  try {
    await prisma.subscription.create({ data: { email } });
  } catch (e) {
    // ignore duplicate signups
  }

  return NextResponse.json({ ok: true, email });
}

export async function GET() {
  // small health/readiness ping
  const count = await prisma.subscription.count();
  return NextResponse.json({ ok: true, count });
}
