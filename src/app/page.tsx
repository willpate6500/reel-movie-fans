import Link from 'next/link'
import ContactForm from './components/ContactForm';


export default function Page() {
  return (
    <div className="grid gap-12">
      <section className="text-center py-16">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          For movie fans who <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">watch everything</span>
        </h1>
        <h1 className="text-2xl font-semibold mb-4">Contact</h1>
      <ContactForm />
        <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
          Discover hidden gems, swap recommendations, and get a weekly newsletter with
          curated picks across genres—no spoilers, just vibes.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/subscribe" className="px-5 py-3 rounded-md bg-white text-black font-medium hover:opacity-90">
            Subscribe to the newsletter
          </Link>
          <a href="#features" className="px-5 py-3 rounded-md border border-white/20 hover:bg-white/5">Learn more</a>
        </div>
      </section>

      <section id="features" className="grid md:grid-cols-3 gap-6">
        {[
          { title: 'Curated Picks', body: 'A short list every week—arthouse, blockbuster, foreign, docs.' },
          { title: 'No Spoilers', body: 'We focus on mood, craft, and where to watch.' },
          { title: 'Community Voice', body: 'Reader recs and occasional polls make the cut.' },
        ].map((f) => (
          <div key={f.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="mt-2 text-sm text-gray-300">{f.body}</p>
          </div>
        ))}
      </section>

      <img src="/photos/dog.png?version=3&campaign=fall" alt="My Dog Pic" />

      <section className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8">
        <h2 className="text-2xl font-semibold">Why another movie site?</h2>
        <p className="mt-3 text-gray-300">
          Algorithms are fine—but friends with taste are better. ReelFans is a tiny site
          that surfaces what’s worth watching and why it sticks with you.
        </p>
      </section>
    </div>
  )
}
