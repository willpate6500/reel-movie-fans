import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const ORIGIN_IMAGE_URL = 'https://raw.githubusercontent.com/willpate6500/reel-movie-fans/936484165ae5f7755008ed20f91dc48c9dbfbfbe/public/photos/dog.png';
const LOG_ENDPOINT_PATH = '/api/request-logs/dog';

async function logRequest(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const query = Object.fromEntries(requestUrl.searchParams.entries());

  const headers: Record<string, string> = {};
  const headerWhitelist = ['user-agent', 'referer', 'x-forwarded-for', 'x-vercel-ip-country'];
  headerWhitelist.forEach((key) => {
    const value = request.headers.get(key);
    if (value) headers[key] = value;
  });

  const logUrl = new URL(LOG_ENDPOINT_PATH, request.url);

  try {
    await fetch(logUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        method: request.method,
        path: requestUrl.pathname,
        query,
        headers,
      }),
      cache: 'no-store',
      keepalive: true,
    });
  } catch (error) {
    console.error('[dog-edge-route] Failed to send log payload', error);
  }
}

export async function GET(request: NextRequest) {
  await logRequest(request);

  const imageResponse = await fetch(ORIGIN_IMAGE_URL);

  if (!imageResponse.ok || !imageResponse.body) {
    return new Response('Unable to fetch dog image', { status: 502 });
  }

  const headers = new Headers(imageResponse.headers);
  headers.set('Content-Type', 'image/png');
  headers.set('Content-Disposition', 'inline');
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');

  return new Response(imageResponse.body, {
    status: 200,
    headers,
  });
}
