import { NextResponse, NextRequest } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

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
    const relPath = segs?.join('/') ?? '';

    // Serve only from /public; prevent path traversal
    const publicDir = path.join(process.cwd(), 'public');
    const filePath = path.join(publicDir, relPath);
    const rel = path.relative(publicDir, filePath);
    if (rel.startsWith('..') || path.isAbsolute(rel)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] ?? 'application/octet-stream';

    const buf = await readFile(filePath);

    // Log request (optional)
    const url = new URL(req.url);
    // eslint-disable-next-line no-console
    console.log('IMG PROXY', {
      path: relPath,
      qs: Object.fromEntries(url.searchParams.entries()),
    });

    // Convert Node Buffer -> ArrayBuffer that satisfies BodyInit
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;

    return new NextResponse(ab, {
      status: 200,
      headers: {
        'Content-Type': type,
        // No Content-Disposition header → browser will render inline
        'Cache-Control': 'public, max-age=0',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
