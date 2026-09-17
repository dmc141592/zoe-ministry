import { CoreValuesStarburst } from '@/components/about/CoreValuesStarburst'
import { FamilyBubbles } from '@/components/about/FamilyBubbles'
import { TeamWheel } from '@/components/about/TeamWheel'
import { Reveal } from '@/components/motion/Reveal'
import { GoldRule } from '@/components/ui/GoldRule'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { faithStatement } from '@/data/coreValues'
import { familyVerse } from '@/data/family'

export function AboutPage() {
  return (
    <div className="bg-ivory">
      <section
        id="ueber-uns"
        data-nav-label="Über uns"
        className="relative scroll-mt-28 overflow-hidden px-6 pb-20 pt-40 text-center lg:pt-48"
      >
        <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[140%] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
        <Reveal className="relative mx-auto max-w-3xl">
          <SectionLabel>Über uns</SectionLabel>
          <h1 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
            Eine Familie, gebaut auf Wahrheit,
            <span className="italic text-gold-dim"> Ehre und Freiheit.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ink-soft">
            Zoe Ministry ist mehr als ein Sonntagstermin. Wir sind Familie, Berufung und Bewegung —
            getragen von sieben Werten, einem gemeinsamen Bekenntnis und Menschen, die zueinander stehen.
          </p>
        </Reveal>
      </section>

      <section
        id="core-values"
        data-nav-label="Werte"
        className="scroll-mt-28 bg-[#F7F1E4] px-6 py-24 lg:px-10"
      >
        <Reveal className="mx-auto max-w-3xl text-center">
          <GoldRule />
          <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">Core Values</h2>
          <p className="mt-3 font-accent text-lg italic text-gold-dim">
            Sieben Werte, die formen, wie wir leben, lieben und leiten.
          </p>
          <GoldRule className="mt-8" />
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          <CoreValuesStarburst />
        </Reveal>
      </section>

      <section id="faith-statement" data-nav-label="Bekenntnis" className="scroll-mt-28 bg-ivory-dim px-6 py-28 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <GoldRule />
          <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">Faith Statement</h2>
          <p className="mt-3 font-accent text-lg italic text-gold-dim">{faithStatement.title}</p>
          <GoldRule className="mt-8" />
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-14 max-w-2xl">
          {faithStatement.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-6 font-accent text-lg leading-loose text-ink-soft first-letter:font-display first-letter:text-5xl first-letter:font-medium first-letter:text-gold-dim first-letter:mr-1 first-letter:float-left">
              {paragraph}
            </p>
          ))}
          <p className="text-center font-display text-xl tracking-[0.3em] text-gold-dim">{faithStatement.amen}</p>
        </Reveal>
      </section>

      <section id="family" data-nav-label="Familie" className="scroll-mt-28 px-6 py-28 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <GoldRule />
          <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">Family</h2>
          <GoldRule className="my-7" />
          <p className="font-accent text-2xl italic leading-[1.65] text-ink">„{familyVerse.text}"</p>
          <p className="mt-5 text-xs uppercase tracking-[0.18em] text-gold-500">— {familyVerse.reference}</p>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-16 max-w-4xl">
          <div className="rounded-xl bg-cream-100 px-4 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-12">
            <div className="relative mx-auto aspect-[780/825] w-full max-w-[780px]">
              <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 780 825" aria-hidden>
                <line x1={390} y1={145} x2={647} y2={438} stroke="#C9A227" strokeWidth={1} opacity={0.35} />
                <line x1={390} y1={145} x2={133} y2={438} stroke="#C9A227" strokeWidth={1} opacity={0.35} />
                <line x1={647} y1={438} x2={390} y2={695} stroke="#C9A227" strokeWidth={1} opacity={0.4} />
                <line x1={133} y1={438} x2={390} y2={695} stroke="#C9A227" strokeWidth={1} opacity={0.4} />
              </svg>

              <FamilyBubbles />
              <TeamWheel />
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
