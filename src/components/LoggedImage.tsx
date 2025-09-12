'use client';

type LoggedImageProps = {
  path: string;                           // e.g., "dog.png"
  params?: Record<string, string>;        // e.g., { version: '3', campaign: 'fall' }
  width: number;
  height: number;
  alt: string;
  className?: string;
};

export default function LoggedImage({ path, params = {}, width, height, alt, className }: LoggedImageProps) {
  const qs = new URLSearchParams(params).toString();
  const raw = `/img/${path}${qs ? `?${qs}` : ''}`;

  const copy = async () => {
    const absolute = new URL(raw, window.location.origin).toString();
    await navigator.clipboard.writeText(absolute);
  };

  return (
    <div className="grid gap-2">
      {/* Plain <img> ensures right-click → Copy image address is the RAW URL */}
      <img
        src={raw}
        alt={alt}
        width={width}
        height={height}
        className={className ?? 'w-full h-auto object-cover rounded-xl border border-white/10'}
        loading="eager"
      />
      <div className="flex gap-2 text-sm">
        <a href={raw} target="_blank" rel="noopener" className="btn-ghost">Open original</a>
        <button className="btn-ghost" onClick={copy}>Copy image URL</button>
      </div>
    </div>
  );
}
