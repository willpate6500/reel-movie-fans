'use client';

import { useState } from 'react';

type SubscribeResponse = { ok: boolean; email?: string; error?: string };

export default function SubscribePage() {
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    setSubmitting(true);
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value.trim();

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = (await res.json()) as SubscribeResponse;
    setSubmitting(false);
    setStatus(data.ok ? `Subscribed: ${data.email}` : data.error ?? 'Failed');
    if (data.ok) form.reset();
  }

  return (
    <div className="max-w-2xl mx-auto grid gap-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Subscribe</h1>
        <p className="mt-2 text-zinc-300">Weekly picks. No spam. Unsubscribe anytime.</p>
      </div>

      <div className="card p-6">
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
          <input type="email" name="email" placeholder="you@email.com" className="input" required />
          <button className="btn-primary min-w-[140px]" disabled={submitting}>
            {submitting ? 'Sending…' : 'Subscribe'}
          </button>
        </form>
        {status && <p className="mt-3 text-sm">{status}</p>}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="card p-4 text-sm">Curated lists</div>
        <div className="card p-4 text-sm">No spoilers</div>
        <div className="card p-4 text-sm">Where to watch</div>
      </div>
    </div>
  );
}
