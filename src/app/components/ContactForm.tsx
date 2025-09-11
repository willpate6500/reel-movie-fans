'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };
    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setStatus(res.ok ? 'Saved!' : 'Failed');
    if (res.ok) form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input name="name" placeholder="Your name" className="border p-2 w-full" required />
      <input name="email" placeholder="you@email.com" className="border p-2 w-full" required />
      <textarea name="message" placeholder="Message" className="border p-2 w-full" required />
      <button className="border px-4 py-2">Send</button>
      {status && <p>{status}</p>}
    </form>
  );
}
