import './globals.css'
import Link from 'next/link'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ReelFans — Movies, Together',
  description: 'A tiny community for people who love films.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-gray-100 antialiased">
        <header className="sticky top-0 z-20 backdrop-blur border-b border-white/10">
          <nav className="mx-auto max-w-6xl px-4 lg:px-6 h-14 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">ReelFans</span>
            </Link>
            <div className="flex gap-6 text-sm">
              <Link href="/subscribe" className="hover:opacity-80">Subscribe</Link>
              <a href="https://vercel.com" target="_blank" rel="noreferrer" className="hover:opacity-80">Powered by Vercel</a>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-4 lg:px-6 py-12">{children}</main>

        <footer className="mx-auto max-w-6xl px-4 lg:px-6 py-10 text-xs text-gray-400 border-t border-white/10">
          © {new Date().getFullYear()} ReelFans
        </footer>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
