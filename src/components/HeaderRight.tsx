// src/components/HeaderRight.tsx
'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import UserMenu from '@/components/UserMenu';

type MeResponse = { ok: boolean; username?: string | null };

async function fetchMe(): Promise<string | null> {
  try {
    const res = await fetch('/api/auth/me', { cache: 'no-store' });
    if (!res.ok) return null;
    const data = (await res.json()) as MeResponse;
    return typeof data.username === 'string' ? data.username : null;
  } catch {
    return null;
  }
}

export default function HeaderRight({ initialUsername }: { initialUsername: string | null }) {
  const [username, setUsername] = useState<string | null>(initialUsername);

  // BroadcastChannel to react to login/logout across tabs
  const channel = useMemo(() => {
    if (typeof window === 'undefined') return null;
    try {
      return new BroadcastChannel('rf-auth');
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const u = await fetchMe();
      if (mounted) setUsername(u);
    })();

    if (channel) {
      const onMsg = async (ev: MessageEvent) => {
        if (ev?.data === 'login' || ev?.data === 'logout') {
          const u = await fetchMe();
          if (mounted) setUsername(u);
        }
      };
      channel.addEventListener('message', onMsg);
      return () => {
        mounted = false;
        channel.removeEventListener('message', onMsg);
        channel.close();
      };
    }

    return () => {
      mounted = false;
    };
  }, [channel]);

  if (username) {
    return <UserMenu username={username} />;
  }

  return (
    <>
      <Link href="/login" className="btn-ghost">Login</Link>
      <Link href="/signup" className="btn-ghost">Sign Up</Link>
    </>
  );
}
