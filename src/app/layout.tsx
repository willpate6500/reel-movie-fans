import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'ReelFans — Movies, Together',
  description: 'A tiny community for people who love films.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[color:var(--color-bg)]/60 backdrop-blur-md">
          <nav className="mx-auto max-w-6xl px-4 lg:px-6 h-16 flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-300">
                ReelFans
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <Link href="/subscribe" className="btn-ghost">Subscribe</Link>
              <Link href="/dog" className="btn-ghost">Dog</Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-4 lg:px-6 py-10">
          {children}
        </main>

        <footer className="mx-auto max-w-6xl px-4 lg:px-6 py-10 text-xs text-zinc-400 border-t border-white/10">
          © {new Date().getFullYear()} ReelFans
        </footer>
      </body>
    </html>
  );
}
