// src/app/api/subscribe/route.ts
import { NextResponse } from 'next/server';

type SubscribePayload = { email: string };

function isSubscribePayload(x: unknown): x is SubscribePayload {
  return !!x && typeof x === 'object' && 'email' in (x as Record<string, unknown>);
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const raw: unknown = await req.json().catch(() => null);

  if (!isSubscribePayload(raw) || !raw.email) {
    return NextResponse.json({ ok: false, error: 'email required' }, { status: 400 });
  }

  // TODO: add your subscription logic here (store raw.email or call provider)

  return NextResponse.json({ ok: true, email: raw.email });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  // Example read-only endpoint (typed, no any)
  return NextResponse.json({ ok: true, query: Object.fromEntries(url.searchParams) });
}
