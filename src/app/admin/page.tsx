import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const items = await prisma.submission.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Submissions</h1>
      <ul className="space-y-2">
        {items.map(i => (
          <li key={i.id} className="border p-3 rounded">
            <div className="font-medium">{i.name} &lt;{i.email}&gt;</div>
            <div className="text-sm">{i.message}</div>
            <div className="text-xs opacity-70">{i.createdAt.toISOString()}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
