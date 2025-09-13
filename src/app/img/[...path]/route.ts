// src/app/img/[...path]/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { logRequest } from '@/lib/logger';

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
};

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: segs } = await context.params;

    // Normalize: if first segment is "img", drop it (so /img/dog.png -> dog.png)
    const cleaned = segs[0] === 'img' ? segs.slice(1) : segs;
    const relPath = cleaned.join('/');

    // Serve only from /public/photos; prevent traversal
    const baseDir = path.join(process.cwd(), 'public', 'photos');
    const filePath = path.join(baseDir, relPath);
    const rel = path.relative(baseDir, filePath);
    if (rel.startsWith('..') || path.isAbsolute(rel)) {
      await logRequest({
        method: 'GET',
        path: `/img/${relPath}`,
        query: Object.fromEntries(new URL(req.url).searchParams.entries()),
        headers: Object.fromEntries(req.headers.entries()),
        body: undefined,
      });
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] ?? 'application/octet-stream';

    const buf = await readFile(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;

    // Log the request (including arbitrary query params)
    await logRequest({
      method: 'GET',
      path: `/img/${relPath}`,
      query: Object.fromEntries(new URL(req.url).searchParams.entries()),
      headers: Object.fromEntries(req.headers.entries()),
      body: undefined,
    });

    return new NextResponse(ab, {
      status: 200,
      headers: {
        'Content-Type': type,
        // Inline render; no attachment
        'Cache-Control': 'public, max-age=0',
      },
    });
  } catch {
    // Log 404 as well so you can see bad paths
    await logRequest({
      method: 'GET',
      path: '/img/404',
      query: Object.fromEntries(new URL(req.url).searchParams.entries()),
      headers: Object.fromEntries(req.headers.entries()),
      body: undefined,
    });
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
