import { CalendarDays, ImageIcon, MoveHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DragGallery } from '@/components/sections/DragGallery'
import { StyledCalendar } from '@/components/events/StyledCalendar'
import { CinematicBackdrop } from '@/components/ui/Atmosphere'
import { Reveal } from '@/components/motion/Reveal'
import { SectionAnchor } from '@/components/ui/SectionAnchor'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { gatherings, sortedFlyerEvents } from '@/data/events'

const accentBorder: Record<string, string> = {
  gold: 'hover:border-gold/60',
  ember: 'hover:border-ember/60',
  navy: 'hover:border-navy-mist',
}

function RowHeading({ title }: { title: string }) {
  return (
    <Reveal className="mx-auto mb-4 flex max-w-6xl items-center justify-between gap-4">
      <h2 className="font-display text-2xl sm:text-3xl">{title}</h2>
      <span className="hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold/60 sm:flex">
        <MoveHorizontal className="h-4 w-4" strokeWidth={1.4} />
        Zum Durchblättern ziehen
      </span>
    </Reveal>
  )
}

export function EventsPage() {
  return (
    <div className="bg-navy-deep text-ivory">
      <section
        id="events-intro"
        data-nav-label="Events"
        className="relative scroll-target overflow-hidden px-6 pb-16 pt-40 text-center lg:pt-48"
      >
        <CinematicBackdrop />
        <Reveal className="relative mx-auto max-w-2xl">
          <SectionLabel>Events & Calendar</SectionLabel>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl">Komm, wie du bist.</h1>
          <p className="mt-6 text-sm leading-relaxed text-ivory/70">
            Von wöchentlichen Gottesdiensten bis zu besonderen Anlässen — hier findest du, was als
            Nächstes ansteht.
          </p>
        </Reveal>
      </section>

      <section id="anlaesse" data-nav-label="Sunday Services" className="relative scroll-target px-6 py-20 lg:px-10">
        <SectionAnchor id="anlaesse-ansicht" />
        <RowHeading title="Sunday Services" />

        <DragGallery className="mx-auto max-w-6xl px-1">
          {sortedFlyerEvents.map((event) => (
            <div
              key={event.id}
              className={`w-[240px] shrink-0 snap-start border border-gold/15 bg-navy/60 transition-colors sm:w-[280px] ${accentBorder[event.accent]}`}
            >
              <img src={event.flyer} alt={event.title} className="aspect-[9/16] w-full object-cover" draggable={false} />
              <div className="p-5">
                <h3 className="font-display text-lg text-ivory">{event.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-gold/70">{event.date}</p>
                <p className="text-xs uppercase tracking-[0.15em] text-ivory/50">{event.time}</p>
                <p className="mt-3 text-xs leading-relaxed text-ivory/60">{event.location}</p>
              </div>
            </div>
          ))}
        </DragGallery>
      </section>

      <section id="gatherings" data-nav-label="Gatherings" className="relative scroll-target px-6 pb-20 lg:px-10">
        <SectionAnchor id="gatherings-ansicht" />
        <RowHeading title="Gathering & Events" />

        <DragGallery className="mx-auto max-w-6xl px-1">
          {gatherings.map((gathering) => (
            <div
              key={gathering.id}
              className={`w-[240px] shrink-0 snap-start border border-gold/15 bg-navy/60 transition-colors sm:w-[280px] ${accentBorder.gold}`}
            >
              {gathering.image ? (
                <img src={gathering.image} alt={gathering.title} className="aspect-[9/16] w-full object-cover" draggable={false} />
              ) : (
                <div className="flex aspect-[9/16] w-full flex-col items-center justify-center gap-3 border-b border-gold/10 bg-navy/40 text-ivory/30">
                  <ImageIcon className="h-8 w-8" strokeWidth={1.2} />
                  <span className="text-[0.65rem] uppercase tracking-[0.25em]">Bild folgt</span>
                </div>
              )}
              <div className="p-5">
                <h3 className="font-display text-lg text-ivory">{gathering.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-gold/70">{gathering.place}</p>
                <p className="text-xs uppercase tracking-[0.15em] text-ivory/50">{gathering.time}</p>
                <Link
                  to="/events#kalender-ansicht"
                  draggable={false}
                  className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold/80 hover:text-gold"
                >
                  <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.5} /> Nächstes Treffen
                </Link>
              </div>
            </div>
          ))}
        </DragGallery>
      </section>

      <section id="kalender" data-nav-label="Kalender" className="relative scroll-target px-6 py-24 lg:px-10">
        {/* Sprungziel für "Nächstes Treffen"-Links — zwei Navbar-Höhen tiefer als der Sektionsanfang. */}
        <span
          id="kalender-ansicht"
          aria-hidden
          className="scroll-target pointer-events-none absolute left-0 top-[calc(var(--navbar-height)*2_-_2mm)]"
        />
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionLabel>Kalender</SectionLabel>
          <h2 className="mt-6 font-display text-3xl sm:text-4xl">Alle Termine im Überblick</h2>
          <p className="mt-4 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-gold/60">
            <CalendarDays className="h-4 w-4" strokeWidth={1.4} />
            Alle Termine synchron mit unserem Google Kalender
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-12 max-w-4xl">
          <StyledCalendar />
        </Reveal>
      </section>
    </div>
  )
}
