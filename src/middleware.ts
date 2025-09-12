import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = new URL(req.url);

  // hard proof: respond here
  if (url.pathname === '/mw-ping') {
    return NextResponse.json(
      {
        ok: true,
        path: url.pathname,
        qs: Object.fromEntries(url.searchParams.entries()),
        proof: 'middleware responded (src/middleware.ts)'
      },
      {
        headers: { 'x-middleware': 'hit' }
      }
    );
  }

  // image logging
  if (url.pathname.startsWith('/photos/')) {
    console.log('IMG REQUEST', url.pathname, Object.fromEntries(url.searchParams.entries()));
  }
  if (url.pathname === '/_next/image') {
    console.log('NEXT/IMAGE REQ', Object.fromEntries(url.searchParams.entries()));
  }

  return NextResponse.next();
}

// match ping + images while debugging
export const config = { matcher: ['/mw-ping', '/photos/:path*', '/_next/image', '/:path*'] };
