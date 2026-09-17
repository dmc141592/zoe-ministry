import { CalendarDays, MoveHorizontal } from 'lucide-react'
import { DragGallery } from '@/components/sections/DragGallery'
import { StyledCalendar } from '@/components/events/StyledCalendar'
import { CinematicBackdrop } from '@/components/ui/Atmosphere'
import { Reveal } from '@/components/motion/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { sortedFlyerEvents } from '@/data/events'

const accentBorder: Record<string, string> = {
  gold: 'hover:border-gold/60',
  ember: 'hover:border-ember/60',
  navy: 'hover:border-navy-mist',
}

export function EventsPage() {
  return (
    <div className="bg-navy-deep text-ivory">
      <section
        id="events-intro"
        data-nav-label="Events"
        className="relative scroll-mt-28 overflow-hidden px-6 pb-16 pt-40 text-center lg:pt-48"
      >
        <CinematicBackdrop />
        <Reveal className="relative mx-auto max-w-2xl">
          <SectionLabel>Events & Calendar</SectionLabel>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl">Komm, wie du bist.</h1>
          <p className="mt-6 text-sm leading-relaxed text-ivory/70">
            Von wöchentlichen Gottesdiensten bis zu besonderen Anlässen — hier findest du, was als
            Nächstes ansteht.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <img
              src="/images/zoe-gang-logo-original.jpeg"
              alt="Zoe Gang Events"
              className="h-10 w-10 rounded-full object-cover opacity-90"
            />
            <span className="text-[0.65rem] uppercase tracking-[0.25em] text-ivory/50">
              präsentiert von Zoe Gang Events
            </span>
          </div>
        </Reveal>
      </section>

      <section id="anlaesse" data-nav-label="Anlässe" className="scroll-mt-28 px-6 py-20 lg:px-10">
        <Reveal className="mx-auto mb-4 flex max-w-6xl items-center justify-between gap-4">
          <h2 className="font-display text-2xl sm:text-3xl">Kommende Anlässe</h2>
          <span className="hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold/60 sm:flex">
            <MoveHorizontal className="h-4 w-4" strokeWidth={1.4} />
            Zum Durchblättern ziehen
          </span>
        </Reveal>

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

      <section id="kalender" data-nav-label="Kalender" className="scroll-mt-28 px-6 py-24 lg:px-10">
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
