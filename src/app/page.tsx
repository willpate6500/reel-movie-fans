import Link from 'next/link';
import ContactForm from './components/ContactForm';
import Image from 'next/image';

export default function Page() {
  const features = [
    { title: 'Curated Picks', body: 'A short list every week—arthouse, blockbuster, foreign, docs.' },
    { title: 'No Spoilers', body: 'We focus on mood, craft, and where to watch.' },
    { title: 'Community Voice', body: 'Reader recs and occasional polls make the cut.' },
  ];

  return (
    <div className="grid gap-12">
      <section className="text-center py-10">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
          For movie fans who{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
            watch everything
          </span>
        </h1>
        <p className="mt-4 text-zinc-300 max-w-2xl mx-auto">
          Hidden gems, bold picks, no spoilers. A weekly list worth your time.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Link href="/subscribe" className="btn-primary">Subscribe</Link>
          <a href="#features" className="btn-ghost">Learn more</a>
        </div>
      </section>

      <section id="features" className="grid md:grid-cols-3 gap-6">
        {features.map((f) => (
          <div key={f.title} className="card p-6">
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="mt-2 text-sm text-zinc-300">{f.body}</p>
          </div>
        ))}
      </section>

      <section className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <ContactForm />
        </div>

        <div className="card overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div>
              <h2 className="text-2xl font-semibold">Why another movie site?</h2>
              <p className="mt-3 text-zinc-300">
                Algorithms are fine—but friends with taste are better. We surface what’s worth watching and why it sticks.
              </p>
              <p className="mt-3 text-sm text-zinc-400">
                Meet our mascot on the <Link href="/dog" className="underline underline-offset-4">Dog page</Link>.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10">
              <Image
                src="/photos/dog.png?home=1"
                alt="Dog"
                width={720}
                height={405}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
