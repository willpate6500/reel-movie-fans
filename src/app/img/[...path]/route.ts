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

    // If the route is /img/[...path], the first segment might be "img"
    const cleaned = segs[0] === 'img' ? segs.slice(1) : segs;
    const relPath = cleaned.join('/');

    // Serve only from /public/photos; prevent traversal
    const baseDir = path.join(process.cwd(), 'public', 'photos');
    const filePath = path.join(baseDir, relPath);
    const rel = path.relative(baseDir, filePath);
    if (rel.startsWith('..') || path.isAbsolute(rel)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] ?? 'application/octet-stream';

    const buf = await readFile(filePath);
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;

    return new NextResponse(ab, {
      status: 200,
      headers: {
        'Content-Type': type,
        // No "Content-Disposition: attachment" → will render inline
        'Cache-Control': 'public, max-age=0',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
