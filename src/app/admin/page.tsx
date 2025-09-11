import { sql } from '@vercel/postgres'
export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const { rows } = await sql/*sql*/`
    SELECT id, name, email, favorite_genre, created_at
    FROM subscribers
    ORDER BY created_at DESC
    LIMIT 500;
  `
  return (
    <div>
      <h1 className="text-2xl font-semibold">Subscribers</h1>
      <p className="text-sm text-gray-400 mt-1">Showing latest {rows.length}</p>
      <div className="mt-6 overflow-x-auto rounded-lg border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              {['ID','Name','Email','Favorite','Created'].map((h)=>(
                <th key={h} className="px-3 py-2 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id} className="border-t border-white/10">
                <td className="px-3 py-2">{r.id}</td>
                <td className="px-3 py-2">{r.name}</td>
                <td className="px-3 py-2">{r.email}</td>
                <td className="px-3 py-2">{r.favorite_genre ?? '—'}</td>
                <td className="px-3 py-2">{new Date(r.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
