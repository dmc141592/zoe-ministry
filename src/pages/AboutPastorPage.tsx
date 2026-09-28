import { AnimatePresence, motion } from 'framer-motion'
import { ImageIcon } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'

// PLACEHOLDER — Bilder und Texte dieser Seite vom Kunden einholen und hier ersetzen.
const PLACEHOLDER_SHORT =
  'Hier steht eine kurze Einleitung — wer der Pastor ist, wie seine Reise begann und wofür sein Herz schlägt.'
const PLACEHOLDER_LONG =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

// PLACEHOLDER — echte Bilder ergänzen (Reihenfolge = Reihenfolge in der Galerie).
const JOURNEY_GALLERY = ['Journey 1', 'Journey 2', 'Journey 3', 'Journey 4', 'Journey 5']
const FAMILY_GALLERY = ['Familienbild 1', 'Familienbild 2', 'Familienbild 3', 'Familienbild 4']

// Deckender Platzhalter-Hintergrund — die Farbflächen hinter den Bildern dürfen nicht durchscheinen.
const PLACEHOLDER_BG = 'bg-[#e4dccb]'

function ImagePlaceholder({ className, label = 'Bild folgt' }: { className?: string; label?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 text-ink/35',
        PLACEHOLDER_BG,
        className,
      )}
    >
      <ImageIcon className="h-8 w-8" strokeWidth={1.2} />
      <span className="text-[0.65rem] uppercase tracking-[0.25em]">{label}</span>
    </div>
  )
}

/**
 * Galerie: wechselt automatisch nach `interval` ms, ein Klick zeigt sofort das nächste Bild.
 * Die Grösse kommt vom Eltern-Element bzw. `className`.
 */
function Gallery({ items, interval, className }: { items: string[]; interval: number; className?: string }) {
  const [index, setIndex] = useState(0)

  // Timer bei jedem Wechsel neu starten, damit nach einem Klick wieder die volle Zeit bleibt.
  useEffect(() => {
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % items.length), interval)
    return () => window.clearTimeout(id)
  }, [index, interval, items.length])

  return (
    <button
      type="button"
      onClick={() => setIndex((i) => (i + 1) % items.length)}
      aria-label="Nächstes Bild anzeigen"
      className={cn('relative block cursor-pointer overflow-hidden', PLACEHOLDER_BG, className)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Sobald echte Bilder da sind: <img src={items[index]} alt="" className="h-full w-full object-cover" /> */}
          <ImagePlaceholder className="h-full w-full" label={items[index]} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5">
        {items.map((item, i) => (
          <span
            key={item}
            className={cn('h-1.5 w-1.5 rounded-full transition-colors', i === index ? 'bg-ink/70' : 'bg-ink/20')}
          />
        ))}
      </div>
    </button>
  )
}

type Tone = 'beige' | 'black'

/**
 * Bild mit einer grossen Farbfläche dahinter (gleich gross wie das Bild), leicht nach oben bzw.
 * unten und zur Aussenseite versetzt. Die Farbe wechselt von Bild zu Bild: Beige, Schwarz, Beige, …
 */
function FramedMedia({ side, tone, children }: { side: 'left' | 'right'; tone: Tone; children: ReactNode }) {
  return (
    // isolate: eigener Stapelkontext, damit -z-10 die Fläche nur hinter das Bild legt, nicht hinter die Seite.
    <div className="relative isolate">
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 -z-10',
          // Abwechselnd versetzt: Beige nach oben, Schwarz nach unten (folgt dem Farbwechsel von Bild zu Bild).
          tone === 'beige' ? '-translate-y-8' : 'translate-y-8',
          // Auf dem Handy weniger Versatz, damit die Fläche nicht über den Seitenrand (px-6) ragt.
          side === 'left' ? '-translate-x-4 sm:-translate-x-8' : 'translate-x-4 sm:translate-x-8',
          tone === 'beige' ? 'bg-ivory-deep' : 'bg-ink',
        )}
      />
      {children}
    </div>
  )
}

/** Titelblock im Stil des Referenz-Layouts: grosse Serifen-Caps + kurze feine Linie. */
function BlockTitle({ children }: { children: string }) {
  return (
    <>
      <h2 className="font-display text-3xl uppercase tracking-[0.06em] text-ink sm:text-4xl lg:text-5xl">
        {children}
      </h2>
      <div className="mt-5 h-px w-28 bg-ink/40" />
    </>
  )
}

/**
 * Beiger Farbband-Block: Text auf der einen Seite, hohes Bild (oder Galerie) auf der anderen,
 * das unten über das Farbband hinausragt.
 */
function BandBlock({
  id,
  navLabel,
  title,
  cta,
  media,
  tone,
  reverse = false,
  first = false,
}: {
  id: string
  navLabel: string
  title: string
  cta?: { label: string; to: string }
  media?: ReactNode
  tone: Tone
  reverse?: boolean
  first?: boolean
}) {
  return (
    <section
      id={id}
      data-nav-label={navLabel}
      className={cn(
        'relative isolate scroll-target px-6 lg:px-10',
        first ? 'pt-32 lg:pt-40' : 'pt-24',
        // Mit Button: das Farbband hängt am Textblock (s. unten) und wird seitlich/oben hier abgeschnitten.
        cta && 'overflow-hidden',
      )}
    >
      {!cta && <div aria-hidden className="absolute inset-x-0 bottom-0 top-0 -z-10 bg-ivory-dim lg:bottom-24" />}
      <div className="relative mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div className={cn('pb-4 pt-6 lg:pb-24 lg:pt-10', reverse && 'lg:order-2')}>
          <div className="relative">
            {cta && (
              // Farbband endet 2.5rem unter dem Text, also oberhalb des Buttons (der 1cm weiter unten sitzt).
              // Seitlich/oben bewusst übergross — die Section schneidet es auf volle Breite bzw. ihre Oberkante zu.
              <div
                aria-hidden
                className="absolute -bottom-10 -left-[100vw] -right-[100vw] -top-[100vh] -z-10 bg-ivory-dim"
              />
            )}
            <Reveal>
              <BlockTitle>{title}</BlockTitle>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-ink">{PLACEHOLDER_SHORT}</p>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft">{PLACEHOLDER_LONG}</p>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft">{PLACEHOLDER_LONG}</p>
            </Reveal>
          </div>
          {cta && (
            <Reveal className="mt-[calc(2.5rem_+_1cm)]">
              <Link
                to={cta.to}
                className="inline-flex items-center bg-gold-500 px-7 py-3 text-[0.65rem] uppercase tracking-[0.25em] text-ivory transition-colors hover:bg-ink"
              >
                {cta.label}
              </Link>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.15} className={cn('pb-12 lg:pb-0', reverse && 'lg:order-1')}>
          <div className={cn('w-full max-w-md', !reverse && 'lg:ml-auto')}>
            <FramedMedia side={reverse ? 'left' : 'right'} tone={tone}>
              {media ?? <ImagePlaceholder className="aspect-[4/5] w-full shadow-soft" />}
            </FramedMedia>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/**
 * "Meet …"-Block: Portrait mit überlappendem Zweitbild auf der einen Seite, gerahmter
 * Namensblock + versetzter Text auf der anderen. `reverse` spiegelt: Bild rechts, Text links.
 */
function MeetBlock({
  id,
  navLabel,
  title,
  role,
  tagline,
  intro,
  main,
  secondaryLabel = 'Bild folgt',
  showSecondary = true,
  tone,
  cta,
  reverse = false,
}: {
  id?: string
  navLabel?: string
  title: string
  role: string
  tagline: string
  intro: string
  main?: ReactNode
  secondaryLabel?: string
  showSecondary?: boolean
  tone: Tone
  cta?: { label: string; to: string }
  reverse?: boolean
}) {
  return (
    <section id={id} data-nav-label={navLabel} className="scroll-target px-6 py-28 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-0">
        {/* z-10: Bildspalte liegt über dem gerahmten Namenskasten — dessen Rahmen läuft hinter dem Bild durch. */}
        <Reveal className={cn('relative isolate z-10 mb-16 lg:col-span-5 lg:mb-0', reverse && 'lg:order-2')}>
          <div className={cn('relative w-full max-w-sm', reverse && 'lg:ml-auto')}>
            <FramedMedia side={reverse ? 'right' : 'left'} tone={tone}>
              {main ?? <ImagePlaceholder className="aspect-[3/4] w-full" label="Portrait" />}
            </FramedMedia>
            {showSecondary && (
              <>
                {/* feiner Rahmen — dekorativ, liegt hinter den Bildern */}
                <div
                  aria-hidden
                  className={cn(
                    'absolute -bottom-10 -z-20 hidden h-2/5 w-3/5 border border-ink/15 sm:block',
                    reverse ? '-left-6' : 'left-6',
                  )}
                />
                <ImagePlaceholder
                  label={secondaryLabel}
                  className={cn(
                    'absolute -bottom-16 aspect-square w-1/2 max-w-[13rem] border-4 border-ivory',
                    reverse ? 'left-6 lg:-left-12' : 'left-1/3',
                  )}
                />
              </>
            )}
          </div>
        </Reveal>

        <div className={cn('lg:col-span-7 lg:mt-8', reverse ? 'lg:order-1 lg:-mr-16' : 'lg:-ml-16')}>
          <Reveal
            delay={0.1}
            className={cn(
              'relative border border-ink/15 bg-ivory px-8 py-10 sm:px-12',
              // Innenabstand zur Bildseite um die Überlappung (4rem) vergrössern, damit kein Text verdeckt wird.
              reverse ? 'lg:pr-28' : 'lg:pl-28',
            )}
          >
            <h2 className="font-display text-3xl uppercase tracking-[0.08em] text-gold-500 sm:text-4xl">{title}</h2>
            <p className="mt-4 text-[0.7rem] uppercase tracking-[0.25em] text-ink">{role}</p>
            <p className="mt-6 max-w-sm font-display text-lg leading-snug text-ink">{tagline}</p>
          </Reveal>

          <Reveal delay={0.2} className={cn('mt-12 max-w-md sm:mt-16', reverse ? 'lg:ml-8' : 'sm:ml-auto lg:mr-8')}>
            <p className="text-sm leading-relaxed text-ink">{intro}</p>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">{PLACEHOLDER_LONG}</p>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">{PLACEHOLDER_LONG}</p>
            {cta && (
              <Link
                to={cta.to}
                className="mt-8 inline-flex items-center bg-gold-500 px-7 py-3 text-[0.65rem] uppercase tracking-[0.25em] text-ivory transition-colors hover:bg-ink"
              >
                {cta.label}
              </Link>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function AboutPastorPage() {
  return (
    <div className="bg-ivory">
      <BandBlock
        id="pastor-journey"
        navLabel="Journey"
        title="Pastor Journey"
        cta={{ label: 'Pastor einladen', to: '/about-pastor#pastor-invite' }}
        media={<Gallery items={JOURNEY_GALLERY} interval={7000} className="aspect-[4/5] w-full shadow-soft" />}
        tone="beige"
        first
      />

      <MeetBlock
        id="pastor-invite"
        navLabel="Invite"
        title="Meet Pastor Name"
        role="Pastor | Gründer"
        tagline="Eine kurze Zeile, die beschreibt, wofür der Pastor steht."
        intro="Hier steht die persönliche Geschichte — und wie man den Pastor für einen Dienst, eine Konferenz oder einen Gottesdienst einladen kann."
        cta={{ label: 'Einladung senden', to: '/connect#einladung' }}
        tone="black"
      />

      <BandBlock id="family-story" navLabel="Family Story" title="Family Story" tone="beige" reverse />

      <MeetBlock
        title="Familie Name"
        role="Ehepaar | Kinder"
        tagline="Eine kurze Zeile über die Familie und was sie verbindet."
        intro="Hier steht, wie die Familie gemeinsam unterwegs ist — Alltag, Berufung und Momente, die sie prägen."
        main={<Gallery items={FAMILY_GALLERY} interval={4000} className="aspect-[3/4] w-full" />}
        showSecondary={false}
        tone="black"
        reverse
      />
    </div>
  )
}
