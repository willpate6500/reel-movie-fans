// src/components/Header.tsx
import Link from 'next/link';
import { getLoggedInUsername } from '@/lib/auth';

export default function Header() {
  const username = getLoggedInUsername();

  return (
    <header className="w-full border-b border-white/10 bg-black/30 backdrop-blur-sm">
      <div className="container mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-white font-semibold tracking-tight">
          ReelMovieFans
        </Link>

        <nav className="flex items-center gap-3">
          <Link href="/discussions" className="text-zinc-300 hover:text-white">
            Discussions
          </Link>

          {/* Removed Subscribe from the header to make room for auth links */}

          {username ? (
            <form action="/api/auth/logout" method="post" className="flex items-center gap-3">
              <span className="text-zinc-300">Hello, <strong className="text-white">{username}</strong></span>
              <button
                type="submit"
                className="rounded-md border border-white/10 px-3 py-1 text-sm hover:bg-white/5"
              >
                Logout
              </button>
            </form>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md border border-white/10 px-3 py-1 text-sm text-zinc-200 hover:bg-white/5"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-md border border-white/10 px-3 py-1 text-sm text-zinc-200 hover:bg-white/5"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
