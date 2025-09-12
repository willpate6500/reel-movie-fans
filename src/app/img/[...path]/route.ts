import { NextResponse } from 'next/server';
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
  req: Request,
  ctx: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await ctx.params;
  const relPath = segments.join('/');
  const filePath = path.join(process.cwd(), 'public', 'photos', relPath);

  try {
    const buf = await readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';

    // Log query params for visibility
    const url = new URL(req.url);
    console.log('IMG PROXY', { path: relPath, qs: Object.fromEntries(url.searchParams.entries()) });

    return new NextResponse(buf, {
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
