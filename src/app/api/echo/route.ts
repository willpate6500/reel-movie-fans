import { NextResponse } from 'next/server';
import { logRequest } from '@/lib/logger';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const out = {
    method: 'GET',
    query: Object.fromEntries(url.searchParams.entries()),
    headers: Object.fromEntries(req.headers.entries()),
  };
  // log it
  await logRequest({
    method: 'GET',
    path: '/api/echo',
    query: out.query,
    headers: out.headers,
  });
  return NextResponse.json(out);
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const body = await req.json().catch(() => null);
  const out = {
    method: 'POST',
    query: Object.fromEntries(url.searchParams.entries()),
    headers: Object.fromEntries(req.headers.entries()),
    body,
  };
  await logRequest({
    method: 'POST',
    path: '/api/echo',
    query: out.query,
    headers: out.headers,
    body,
  });
  return NextResponse.json(out);
}
