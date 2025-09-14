// src/components/SubscribeForm.tsx
'use client';

import { useState } from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        // try read error, but type safely
        let msg = 'Failed to subscribe';
        try {
          const data = (await res.json()) as { error?: string };
          if (data?.error) msg = data.error;
        } catch {}
        setStatus(msg);
        return;
      }
      setStatus('Subscribed! Check your inbox (if applicable).');
      setEmail('');
    } catch {
      setStatus('Network error. Please try again.');
    }
  }

  return (
    <div className="rounded-xl border border-white/10 p-4">
      <h2 className="text-lg font-semibold mb-2">Subscribe to the Movie Discussions Club</h2>
      <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-2">
        <label className="sr-only" htmlFor="subscribe-email">
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="subscribe-email"
          type="email"
          required
          aria-required="true"
          placeholder="you@example.com"
          className="flex-1 rounded-md border border-white/10 bg-black/20 p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-md border border-white/10 px-3 py-2 hover:bg-white/5"
        >
          Subscribe
        </button>
      </form>
      {status && <p className="text-sm mt-2 text-zinc-300">{status}</p>}
    </div>
  );
}
