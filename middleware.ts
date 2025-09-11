import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

function isAdmin(req: NextRequest) {
  const header = req.headers.get('authorization') || ''
  if (!header.startsWith('Basic ')) return false
  try {
    const [user, pass] = atob(header.split(' ')[1]).split(':')
    return user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS
  } catch { return false }
}

export function middleware(req: NextRequest) {
  // Log every request to Vercel Edge logs (see “Functions → Logs”)
  console.log('PING', req.method, req.nextUrl.pathname, req.headers.get('user-agent') || 'UA?')

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!isAdmin(req)) {
      return new NextResponse('Auth required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="ReelFans Admin"' },
      })
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
