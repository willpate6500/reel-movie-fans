// middleware.ts (at project root)
import { NextResponse } from 'next/server';

export function middleware(req: Request) {
  const url = new URL(req.url);
  console.log('MW HIT', { path: url.pathname, qs: Object.fromEntries(url.searchParams.entries()) });
  return NextResponse.next();
}

// TEMP: run on EVERYTHING to prove it runs
export const config = { matcher: ['/:path*'] };
