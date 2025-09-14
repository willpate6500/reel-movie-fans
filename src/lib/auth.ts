// src/lib/auth.ts
import { cookies } from 'next/headers';

const COOKIE_NAME = 'rf_user'; // stores username (plaintext by request)

export async function getLoggedInUsername(): Promise<string | null> {
  try {
    const c = await cookies(); // Next.js 15 dynamic API is async
    const v = c.get(COOKIE_NAME)?.value;
    return v ? String(v) : null;
  } catch {
    return null;
  }
}

function isProd() {
  return process.env.NODE_ENV === 'production';
}

export function cookieHeadersSet(username: string) {
  // 7 days; Lax; HttpOnly
  const maxAge = 60 * 60 * 24 * 7;

  // In development over http://localhost, a Secure cookie will be ignored by the browser.
  const secure = isProd() ? '; Secure' : '';

  return {
    'Set-Cookie': `${COOKIE_NAME}=${encodeURIComponent(
      username
    )}; Path=/; Max-Age=${maxAge}; SameSite=Lax; HttpOnly${secure}`,
  };
}

export function cookieHeadersClear() {
  const secure = isProd() ? '; Secure' : '';
  return {
    'Set-Cookie': `${COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax; HttpOnly${secure}`,
  };
}
