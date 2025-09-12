import LoggedImage from '@/components/LoggedImage';

export const metadata = { title: 'Dog — ReelMovieFans' };

export default function DogPage() {
  return (
    <div className="max-w-4xl mx-auto grid gap-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Dog</h1>
        <p className="mt-2 text-zinc-300">Our cinematic good boy.</p>
      </div>

      <div className="card p-4">
        <LoggedImage
          path="dog.png"
          params={{ version: '3', campaign: 'fall' }}
          width={1200}
          height={800}
          alt="Dog"
        />
      </div>
    </div>
  );
}
