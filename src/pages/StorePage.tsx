import { ShoppingBag, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { ButtonAnchor } from '@/components/ui/Button'
import { GoldRule } from '@/components/ui/GoldRule'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { book, merchItems } from '@/data/store'

export function StorePage() {
  return (
    <div className="bg-ivory">
      <section id="store-intro" data-nav-label="Store" className="scroll-mt-28 px-6 pb-16 pt-40 text-center lg:pt-48">
        <Reveal className="mx-auto max-w-2xl">
          <SectionLabel>Store</SectionLabel>
          <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">Worte zum Mitnehmen.</h1>
        </Reveal>
      </section>

      <section id="buch" data-nav-label="Buch" className="scroll-mt-28 px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <img src={book.cover} alt={book.title} className="mx-auto w-72 shadow-2xl lg:w-full" />
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">{book.title}</h2>
            <p className="mt-1 font-accent text-lg italic text-gold-dim">{book.subtitle}</p>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">{book.description}</p>
            <ul className="mt-6 space-y-2">
              {book.themes.map((theme) => (
                <li key={theme} className="flex items-center gap-2 text-sm text-ink-soft">
                  <Sparkles className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                  {theme}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonAnchor href={book.shopifyUrl} variant="gold">
                <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                Buch bestellen
              </ButtonAnchor>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="autor" data-nav-label="Autor" className="scroll-mt-28 bg-ivory-dim px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[auto_1fr] lg:items-center">
          <Reveal>
            <img src={book.author.image} alt={book.author.name} className="mx-auto h-40 w-40 rounded-full object-cover shadow-lg" />
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="font-display text-xl text-ink">{book.author.name}</h3>
            <p className="text-xs uppercase tracking-[0.2em] text-gold-dim">{book.author.role}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">{book.author.bio}</p>
          </Reveal>
        </div>
      </section>

      <section id="merch" data-nav-label="Merch" className="scroll-mt-28 px-6 py-28 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Merch</SectionLabel>
          <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">Bald verfügbar</h2>
          <GoldRule className="mt-8" />
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
          {merchItems.map((item) => (
            <Reveal key={item.name}>
              <div className="relative overflow-hidden border border-ivory-deep bg-white/50 p-8 text-center">
                <span className="absolute right-3 top-3 text-[0.6rem] uppercase tracking-[0.2em] text-gold-dim">
                  Coming Soon
                </span>
                <h3 className="mt-6 font-display text-lg text-ink">{item.name}</h3>
                <p className="mt-2 text-xs text-ink-soft">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
