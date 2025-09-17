// src/app/layout.tsx
import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { getLoggedInUsername } from '@/lib/auth';
import HeaderRight from '@/components/HeaderRight';

export const metadata = {
  title: 'ReelMovieFans — Movies, Together',
  description: 'A tiny community for people who love films.',
};

// Optional: ensure the header re-renders freshly on each request
export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: { children: ReactNode }) {
  // First-paint username from the server (cookie)
  const initialUsername = await getLoggedInUsername();

  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[color:var(--color-bg)]/60 backdrop-blur-md">
          <nav className="mx-auto max-w-6xl px-4 lg:px-6 h-16 flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-300">
                ReelMovieFans
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <Link href="/discussions" className="btn-ghost">Discussions</Link>
              <Link href="/research" className="btn-ghost">Research</Link>
              <Link href="/dog" className="btn-ghost">Dog</Link>
              {/* Client side hydrates and reacts to login/logout without manual refresh */}
              <HeaderRight initialUsername={initialUsername} />
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-4 lg:px-6 py-10">
          {children}
        </main>

        <footer className="mx-auto max-w-6xl px-4 lg:px-6 py-10 text-xs text-zinc-400 border-t border-white/10">
          © {new Date().getFullYear()} ReelMovieFans
        </footer>
      </body>
    </html>
  );
}
