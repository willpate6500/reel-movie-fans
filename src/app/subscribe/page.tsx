'use client'

import { useState } from 'react'

type FormState = { name: string; email: string; favoriteGenre?: string; consent: boolean }
const initial: FormState = { name: '', email: '', favoriteGenre: '', consent: false }

export default function SubscribePage() {
  const [form, setForm] = useState<FormState>(initial)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string>('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? 'Something went wrong')
      setStatus('success'); setMessage('Thanks! Check your inbox soon for our next issue.')
      setForm(initial)
    } catch (err: any) {
      setStatus('error'); setMessage(err?.message || 'Failed to subscribe.')
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold">Subscribe</h1>
      <p className="mt-2 text-gray-300">Join the list for weekly recommendations. We don’t spam.</p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-5">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input required value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/30"
            placeholder="Ava DuVernay" />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input required type="email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/30"
            placeholder="you@example.com" />
        </div>

        <div>
          <label className="block text-sm mb-1">Favorite genre (optional)</label>
          <input value={form.favoriteGenre}
            onChange={(e) => setForm({ ...form, favoriteGenre: e.target.value })}
            className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/30"
            placeholder="Noir, Sci-Fi, Documentary…" />
        </div>

        <label className="flex items-start gap-3 text-sm">
          <input required type="checkbox" checked={form.consent}
            onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1" />
          I agree to receive the newsletter and understand I can unsubscribe anytime.
        </label>

        <button disabled={status === 'loading'}
          className="rounded-md bg-white text-black font-medium px-5 py-2.5 hover:opacity-90 disabled:opacity-60">
          {status === 'loading' ? 'Submitting…' : 'Subscribe'}
        </button>

        {message && <p className={`text-sm ${status === 'error' ? 'text-red-300' : 'text-green-300'}`}>{message}</p>}
      </form>
    </div>
  )
}
