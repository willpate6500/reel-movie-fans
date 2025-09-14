'use client';

import { useMemo, useState } from 'react';

export default function UserMenu({ username }: { username: string }) {
  const [open, setOpen] = useState(false);

  const channel = useMemo(() => {
    try {
      return new BroadcastChannel('rf-auth');
    } catch {
      return null;
    }
  }, []);

  async function onLogout() {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        channel?.postMessage('logout');
        // Either refresh components or force reload; start with refresh:
        location.reload();
      }
    } catch {
      // ignore
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="btn-ghost inline-flex items-center gap-1"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="User menu"
      >
        <span className="text-zinc-200">{username}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 min-w-[8rem] rounded-md border border-white/10 bg-[color:var(--color-bg)]/95 backdrop-blur-md shadow-lg"
        >
          <button
            role="menuitem"
            onClick={onLogout}
            className="w-full text-left px-3 py-2 hover:bg-white/5"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
