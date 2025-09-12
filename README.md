# Reel Movie Fans 🎬

A Next.js 15 + Prisma + Tailwind app for discovering and sharing movies, built with Vercel + Neon.

---

## 🚀 Quick Start (Local Dev)

### Prerequisites
- Node.js 18+ (20 LTS recommended)
- PostgreSQL database (Neon works great)
- npm or pnpm

### Install & setup
```bash
git clone https://github.com/willpate6500/reel-movie-fans.git
cd reel-movie-fans
npm install
```

### Environment variables
Create `.env` in the project root:

```bash
# Prisma uses these
DATABASE_URL="postgres://<user>:<pass>@<host>/<db>?sslmode=require"
DIRECT_URL="postgres://<user>:<pass>@<unpooled-host>/<db>?sslmode=require"
```

### Migrate & generate
```bash
npx prisma generate
npx prisma migrate dev
```

(Optional) Inspect your DB:
```bash
npx prisma studio
```

### Run locally
```bash
npm run dev
# open http://localhost:3000
```

---

## 📦 Deploying to Vercel

### One-time setup
```bash
npm i -g vercel
vercel login
vercel link
```

### Configure environment variables
In Vercel project settings → **Environment Variables**:

- `DATABASE_URL` (pooled Neon connection)
- `DIRECT_URL` (unpooled Neon connection)

Add in **Production**, **Preview**, and **Development**.

### Deploy
```bash
vercel          # preview
vercel --prod   # production
```

### Monitor runtime logs
```bash
vercel logs <your-app>.vercel.app
```

---

## 🔍 Monitoring Requests

This app logs incoming requests into the `RequestLog` table.

- **Log writer**: `src/lib/logger.ts`
- **Endpoints that log**: `/api/echo` and others
- **Viewer**: `/api/logs` (returns latest 20)

### Example
```bash
curl -s https://<your-app>.vercel.app/api/logs | jq
```

Or locally:
```bash
npx prisma studio   # view RequestLog table
```

---

## 🖼️ Image API

Route: `GET /img/[...path]`

- Serves files from `/public`
- Supports query params (logged for observability)

### Examples
```bash
# open in browser
http://localhost:3000/img/dog.png

# with query params
http://localhost:3000/img/dog.png?version=3&campaign=fall

# curl
curl -i http://localhost:3000/img/dog.png -o dog.png
```

---

## 🔁 Echo API

Route: `/api/echo` (GET & POST)

### GET
```bash
curl -s "http://localhost:3000/api/echo?hello=world&n=42" | jq
```

### POST
```bash
curl -s -X POST http://localhost:3000/api/echo   -H "Content-Type: application/json"   -d '{"who":"tester","numbers":[1,2,3]}' | jq
```

Each call is logged and visible at `/api/logs`.

---

## ✉️ Subscription API

Route: `/api/subscribe`

- `POST { email }` → adds a subscriber
- `GET` → returns `{ ok: true, count }`

### Example
```bash
curl -s -X POST http://localhost:3000/api/subscribe   -H "Content-Type: application/json"   -d '{"email":"alice@example.com"}' | jq

curl -s http://localhost:3000/api/subscribe | jq
```

---

## 📨 Submissions API

Route: `/api/submissions`

- `POST { name, email, message }` → saves a contact submission
- `GET` → returns all submissions

### Example
```bash
curl -s -X POST http://localhost:3000/api/submissions   -H "Content-Type: application/json"   -d '{"name":"Alice","email":"alice@example.com","message":"Hello!"}' | jq

curl -s http://localhost:3000/api/submissions | jq
```

---

## 📄 Adding New Pages

This project uses the **App Router** (`src/app`).

### Static page
Create `src/app/about/page.tsx`:

```tsx
export default function AboutPage() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">About ReelFans</h1>
      <p className="text-base/7 text-zinc-300">
        Movies, together. No spoilers, great picks, and a friendly community.
      </p>
    </main>
  );
}
```
→ Now available at `/about`.

### Dynamic page
`src/app/movies/[id]/page.tsx`:

```tsx
type PageProps = { params: Promise<{ id: string }> };

export default async function MoviePage({ params }: PageProps) {
  const { id } = await params;
  return <h1>Movie #{id}</h1>;
}
```
→ Visit `/movies/123`.

### New API route
`src/app/api/hello/route.ts`:

```ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ ok: true, msg: 'Hello from /api/hello' });
}
```
→ Visit `/api/hello`.

---

## ✅ Checklist

- [ ] Create `.env` with `DATABASE_URL`, `DIRECT_URL`
- [ ] `npm install`
- [ ] `npx prisma generate && npx prisma migrate dev`
- [ ] `npm run dev` (http://localhost:3000)
- [ ] Test `/img/dog.png`
- [ ] `curl` `/api/echo` (GET/POST)
- [ ] Submit contact form → check `/api/submissions`
- [ ] POST `/api/subscribe` → check count
- [ ] GET `/api/logs` → confirm requests logged
- [ ] Deploy with `vercel` + set env vars
- [ ] Monitor with `vercel logs` or Neon dashboard

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **Database**: [PostgreSQL](https://neon.tech/) via Prisma
- **UI**: [Tailwind CSS](https://tailwindcss.com/)
- **Deploy**: [Vercel](https://vercel.com/)
