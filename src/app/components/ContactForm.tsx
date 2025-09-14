'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const form = e.currentTarget
    const payload = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }
    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setSubmitting(false)
    setStatus(res.ok ? 'Thanks — got it!' : 'Failed, try again.')
    if (res.ok) form.reset()
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <input name="name" placeholder="Your name" className="input" required />
      <input type="email" name="email" placeholder="you@email.com" className="input" required />
      <textarea name="message" placeholder="Message" rows={4} className="input" required />
      <div className="flex gap-3">
        <button className="btn-primary" disabled={submitting}>
          {submitting ? 'Sending…' : 'Send'}
        </button>
        <a href="/api/submissions" className="btn-ghost">View API</a>
      </div>
      {status && <p className="text-sm">{status}</p>}
    </form>
  )
}
