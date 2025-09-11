import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  return NextResponse.json({
    method: 'GET',
    query: Object.fromEntries(url.searchParams.entries()),
    headers: Object.fromEntries(req.headers.entries()),
  });
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const json = await req.json().catch(() => null);
  return NextResponse.json({
    method: 'POST',
    query: Object.fromEntries(url.searchParams.entries()),
    headers: Object.fromEntries(req.headers.entries()),
    body: json,
  });
}
