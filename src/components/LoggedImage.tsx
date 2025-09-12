'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

export type LoggedImageProps = {
  /** Path relative to /public, served via /img/[...path] route (e.g., "dog.png" or "gallery/dog.png") */
  path: string;
  /** Optional query parameters appended to the /img URL (e.g., { version: '3', campaign: 'fall' }) */
  params?: Record<string, string>;
  width: number;
  height: number;
  alt: string;
  className?: string;
};

export default function LoggedImage({
  path,
  params = {},
  width,
  height,
  alt,
  className,
}: LoggedImageProps) {
  const [copied, setCopied] = useState(false);
  const urlRef = useRef<HTMLSpanElement | null>(null);

  // Build the proxied URL that hits your /img/[...path] handler
  const qs = new URLSearchParams(params).toString();
  const src = `/img/${path}${qs ? `?${qs}` : ''}`;

  function log(action: string) {
    // eslint-disable-next-line no-console
    console.log('LoggedImage', { action, path, params });
  }

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(src);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
      log('copy');
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative" onClick={() => log('click')}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          // You can tweak priority or sizes as needed:
          // priority
          // sizes="(max-width: 768px) 100vw, 1200px"
        />
      </div>

      <div className="flex items-center gap-2">
        <span ref={urlRef} className="text-sm break-all">
          {src}
        </span>
        <button
          type="button"
          onClick={copyUrl}
          className="rounded-md border px-2 py-1 text-sm"
        >
          {copied ? 'Copied!' : 'Copy image URL'}
        </button>
      </div>
    </div>
  );
}
