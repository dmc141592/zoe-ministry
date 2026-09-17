import { ArrowDown, BookOpen, Compass, HandHeart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CrossfadeImages } from '@/components/motion/CrossfadeImages'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { GoldRule } from '@/components/ui/GoldRule'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { coreValues } from '@/data/coreValues'
import { sortedFlyerEvents } from '@/data/events'
import { site } from '@/data/site'
import { book } from '@/data/store'
import { visionStatement } from '@/data/vision'

const heroImages = [
  '/images/flyer-baptized-into-christ.jpeg',
  '/images/flyer-sunday-service.jpeg',
  '/images/flyer-members-meeting.jpeg',
]

export function HomePage() {
  return (
    <div>
      <section className="relative flex h-svh min-h-[640px] items-center justify-center overflow-hidden bg-navy-deep">
        <CrossfadeImages images={heroImages} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/50 to-navy-deep" />
        <div className="grain absolute inset-0" />

        <div className="relative z-10 flex w-full flex-col items-center px-6 text-center">
          <h1 className="mx-auto w-full max-w-[350px] sm:max-w-[640px] lg:max-w-[1200px]">
            <span className="sr-only">{site.name}</span>
            <svg viewBox="0 0 1200 200" width="1200" height="200" className="h-auto w-full" aria-hidden="true">
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                letterSpacing="4"
                className="uppercase"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800 }}
                fontSize="150"
                fill="none"
                stroke="#c9a24c"
                strokeWidth="1.8"
                vectorEffect="non-scaling-stroke"
                paintOrder="stroke"
              >
                {site.name}
              </text>
            </svg>
          </h1>
          <p className="mt-6 font-accent text-2xl italic tracking-wide text-ivory sm:text-3xl">
            Belong. <span className="text-gold">Believe.</span> Become.
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/50">
          <ArrowDown className="h-5 w-5 animate-bounce" strokeWidth={1.2} />
        </div>
      </section>

      <section id="willkommen" data-nav-label="Willkommen" className="bg-ivory px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel>Willkommen</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-3xl leading-tight text-ink sm:text-4xl">
              Ein Zuhause für alle, die glauben, dass Gott mehr will —
              <span className="italic text-gold-dim"> mitten in der Schweiz.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              Zoe Ministry ist eine Gemeinschaft, die Menschen zusammenbringt — über Generationen und
              Nationen hinweg. Wir glauben an ein Leben in Fülle, an echte Beziehung und an eine
              Berufung, die weit über den Sonntag hinausreicht.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        id="vision"
        data-nav-label="Vision"
        className="relative overflow-hidden bg-navy-deep px-6 py-28 text-ivory lg:px-10"
      >
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-gold/10 blur-[120px]" />
        <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionLabel align="left">Unsere Vision</SectionLabel>
            <p className="mt-8 font-accent text-2xl italic leading-relaxed text-ivory/90 sm:text-3xl">
              &ldquo;{visionStatement.lines[2]}&rdquo;
            </p>
            <div className="mt-10">
              <ButtonLink to="/vision" variant="outline-light">
                Die ganze Vision
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4 text-center">
              {['Regierung', 'Wirtschaft', 'Bildung', 'Familie', 'Religion', 'Kunst & Medien'].map((m) => (
                <div key={m} className="border border-gold/20 px-4 py-6 text-xs uppercase tracking-[0.2em] text-gold/80">
                  {m}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="werte" data-nav-label="Werte" className="bg-ivory px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center">
            <SectionLabel>Core Values</SectionLabel>
            <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">Was uns leitet</h2>
          </Reveal>
          <StaggerGroup className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value) => (
              <StaggerItem key={value.title}>
                <h3 className="font-display text-lg uppercase tracking-wide text-gold-dim">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{value.points[0]}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal className="mt-14 text-center">
            <ButtonLink to="/about#core-values" variant="outline-dark">
              Alle sieben Werte
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <section id="events" data-nav-label="Events" className="bg-navy px-6 py-28 text-ivory lg:px-10">
        <Reveal className="mx-auto max-w-6xl text-center">
          <SectionLabel>Events</SectionLabel>
          <h2 className="mt-6 font-display text-3xl sm:text-4xl">Komm vorbei</h2>
        </Reveal>
        <div className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-3">
          {sortedFlyerEvents.map((event, i) => (
            <Reveal key={event.id} delay={i * 0.1}>
              <Link to="/events" className="group block overflow-hidden border border-gold/15">
                <div className="aspect-[9/16] max-h-[420px] overflow-hidden sm:max-h-none">
                  <img
                    src={event.flyer}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg text-ivory">{event.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-gold/70">{event.date}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 text-center">
          <ButtonLink to="/events" variant="outline-light">
            Alle Events & Kalender
          </ButtonLink>
        </Reveal>
      </section>

      <section id="store" data-nav-label="Store" className="bg-ivory px-6 py-28 lg:px-10">
        <div className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <img src={book.cover} alt={book.title} className="mx-auto w-64 shadow-2xl lg:w-80" />
          </Reveal>
          <Reveal delay={0.15}>
            <SectionLabel align="left">Store</SectionLabel>
            <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">{book.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">{book.intro}</p>
            <div className="mt-8">
              <ButtonLink to="/store" variant="outline-dark">
                Zum Buch
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="mitmachen"
        data-nav-label="Mitmachen"
        className="relative overflow-hidden bg-navy-deep px-6 py-28 text-center text-ivory lg:px-10"
      >
        <div className="grain absolute inset-0" />
        <GoldRule className="relative mb-10" />
        <Reveal>
          <h2 className="relative font-display text-3xl sm:text-4xl">Sei ein Teil dessen, was Gott hier baut.</h2>
          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-sm text-ivory/70">
              <HandHeart className="h-4 w-4 text-gold" strokeWidth={1.4} /> Grosszügigkeit leben
            </div>
            <div className="flex items-center gap-2 text-sm text-ivory/70">
              <Compass className="h-4 w-4 text-gold" strokeWidth={1.4} /> Berufung entdecken
            </div>
            <div className="flex items-center gap-2 text-sm text-ivory/70">
              <BookOpen className="h-4 w-4 text-gold" strokeWidth={1.4} /> Im Wort wachsen
            </div>
          </div>
          <div className="relative mt-12">
            <ButtonLink to="/connect#spenden" variant="gold">
              Spenden
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
