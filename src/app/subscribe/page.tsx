// src/app/subscribe/page.tsx
'use client';
import { useState } from 'react';

type SubscribeResponse = { ok: boolean; email?: string; error?: string };

export default function SubscribePage() {
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = (await res.json()) as SubscribeResponse;
    setStatus(data.ok ? `Subscribed ${data.email ?? ''}`.trim() : data.error ?? 'Failed');
    if (data.ok) form.reset();
  }

  return (
    <form onSubmit={onSubmit}>
      {/* ... your form fields ... */}
    </form>
  );
}
