import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { z } from 'zod'

const Schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  favoriteGenre: z.string().optional().or(z.literal('')),
  consent: z.literal(true),
})

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const parsed = Schema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid form', issues: parsed.error.issues }, { status: 400 })
    }
    const { name, email, favoriteGenre } = parsed.data

    await sql/*sql*/`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        favorite_genre TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `
    await sql/*sql*/`
      INSERT INTO subscribers (name, email, favorite_genre)
      VALUES (${name}, ${email}, ${favoriteGenre || null})
      ON CONFLICT (email) DO UPDATE
      SET name = EXCLUDED.name,
          favorite_genre = EXCLUDED.favorite_genre;
    `
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('Subscribe POST error', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  const { rows } = await sql/*sql*/`
    SELECT id, name, email, favorite_genre, created_at
    FROM subscribers
    ORDER BY created_at DESC
    LIMIT 500;
  `
  return NextResponse.json({ subscribers: rows })
}
