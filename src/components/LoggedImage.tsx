// src/components/LoggedImage.tsx
'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

export type LoggedImageProps = {
  /** Path under public/photos, e.g. "dog.png" or "gallery/dog.png" */
  path: string;
  /** Optional query params appended to /img URL */
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
  // Relative URL served by our /img route
  const qs = new URLSearchParams(params).toString();
  const relativeUrl = `/img/${path}${qs ? `?${qs}` : ''}`;

  // Absolute URL for copy/open actions
  const absoluteUrl = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    try {
      return new URL(relativeUrl, origin).toString();
    } catch {
      return relativeUrl;
    }
  }, [relativeUrl]);

  const [copied, setCopied] = useState(false);

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
      // keep this log; no eslint-disable needed if rule allows console (default)
      console.log('LoggedImage', { action: 'copy', url: absoluteUrl });
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Show the image; unoptimized = use our direct URL, no Next optimizer */}
      <Image
        src={relativeUrl}
        alt={alt}
        width={width}
        height={height}
        className={className}
        unoptimized
        onClick={() => console.log('LoggedImage', { action: 'click', url: absoluteUrl })}
      />

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <a
          href={absoluteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-white/10 px-2 py-1 hover:bg-white/5"
          onClick={() => console.log('LoggedImage', { action: 'open', url: absoluteUrl })}
        >
          Open image in new tab
        </a>

        <button
          type="button"
          onClick={copyUrl}
          className="rounded-md border border-white/10 px-2 py-1 hover:bg-white/5"
        >
          {copied ? 'Copied!' : 'Copy image URL'}
        </button>

        <span className="break-all text-zinc-400">{absoluteUrl}</span>
      </div>
    </div>
  );
}
