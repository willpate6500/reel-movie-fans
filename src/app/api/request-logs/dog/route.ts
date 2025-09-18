import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const method = typeof payload?.method === 'string' ? payload.method : 'GET';
    const path = typeof payload?.path === 'string' ? payload.path : '/i/dog';
    const query = typeof payload?.query === 'object' && payload.query !== null ? payload.query : {};
    const headers = typeof payload?.headers === 'object' && payload.headers !== null ? payload.headers : {};
    const body = typeof payload?.body === 'string' ? payload.body : null;

    await prisma.requestLog.create({
      data: {
        method,
        path,
        query,
        headers,
        body,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[dog-edge-route] Failed to persist query log', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
