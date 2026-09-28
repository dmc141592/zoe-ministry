import { CalendarDays, Copy, ExternalLink } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ContactForm } from '@/components/sections/ContactForm'
import { InvitationForm } from '@/components/sections/InvitationForm'
import { SwissMap } from '@/components/sections/SwissMap'
import { Reveal } from '@/components/motion/Reveal'
import { CinematicBackdrop } from '@/components/ui/Atmosphere'
import { GoldRule } from '@/components/ui/GoldRule'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { donation, locationAnchor, locations, regionalMeetings, site } from '@/data/site'

const [mainLocation, partnerChurch] = locations

const groupHeading = 'mb-4 text-xs uppercase tracking-[0.2em] text-ivory/50'
const cardLink =
  'mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold/80 hover:text-gold'

function LocationCard({
  id,
  caption,
  title,
  children,
}: {
  id: string
  caption: string
  title: string
  children: ReactNode
}) {
  return (
    <div id={locationAnchor(id)} className="scroll-target h-full border border-gold/15 bg-navy/50 p-8">
      <SectionLabel align="left" tone="gold">{caption}</SectionLabel>
      <h3 className="mt-4 font-display text-2xl text-ivory">{title}</h3>
      {children}
    </div>
  )
}

function AddressCard({ loc, caption }: { loc: (typeof locations)[number]; caption: string }) {
  return (
    <LocationCard id={loc.id} caption={caption} title={loc.name}>
      <p className="mt-3 text-sm text-ivory/70">{loc.street}</p>
      <p className="text-sm text-ivory/70">{loc.city}, {loc.country}</p>
      <a href={loc.mapUrl} target="_blank" rel="noreferrer" className={cardLink}>
        <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} /> Route planen
      </a>
    </LocationCard>
  )
}

function BankRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }
  return (
    <div className="flex items-center justify-between border-b border-ink/10 py-3">
      <div>
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft/70">{label}</p>
        <p className="mt-1 text-sm text-ink">{value}</p>
      </div>
      <button
        type="button"
        onClick={copy}
        className="text-ink/40 transition-colors hover:text-gold-500"
        aria-label={`${label} kopieren`}
      >
        <Copy className="h-4 w-4" strokeWidth={1.5} />
      </button>
      {copied && <span className="ml-2 text-[0.6rem] text-gold-500">kopiert</span>}
    </div>
  )
}

export function ConnectPage() {
  return (
    <div className="bg-navy-deep text-ivory">
      <section
        id="standorte"
        data-nav-label="Standorte"
        className="relative scroll-target overflow-hidden px-6 pb-24 pt-40 lg:pt-48"
      >
        <CinematicBackdrop starsExcludeZone={{ top: [22, 92], left: [8, 92] }} shootingStars />
        <Reveal className="relative mx-auto max-w-2xl text-center">
          <SectionLabel>Connect · Network</SectionLabel>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl">Ein Zuhause. Ein Netzwerk.</h1>
        </Reveal>

        <Reveal delay={0.15} className="relative mt-16">
          <SwissMap />
        </Reveal>

        <div className="relative mx-auto mt-16 max-w-5xl">
          <Reveal delay={0.25}>
            <h2 className={groupHeading}>Hauptstandort</h2>
            <AddressCard loc={mainLocation} caption={mainLocation.canton} />
          </Reveal>

          <Reveal delay={0.3} className="mt-12">
            <h2 className={groupHeading}>Regionaltreffen &amp; Partnerkirche</h2>
          </Reveal>
          <div className="relative grid gap-8 sm:grid-cols-2">
            {/* Gemeinsames Sprungziel für Basel, Interlaken und Zürich auf der Karte — 2.9cm über der Basel-Karte. */}
            <span
              id={locationAnchor('regional')}
              aria-hidden
              className="scroll-target pointer-events-none absolute left-0 top-[-2.9cm]"
            />
            {regionalMeetings.map((meeting, i) => (
              <Reveal key={meeting.id} delay={0.35 + i * 0.1}>
                <LocationCard id={meeting.id} caption={meeting.name} title={meeting.name}>
                  <p className="mt-1 text-sm text-ivory/50">Regionaltreffen</p>
                  <Link to={meeting.eventUrl} className={cardLink}>
                    <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.5} /> Nächstes Treffen
                  </Link>
                </LocationCard>
              </Reveal>
            ))}
            <Reveal delay={0.35 + regionalMeetings.length * 0.1}>
              <AddressCard loc={partnerChurch} caption={`${partnerChurch.canton} · Partnerkirche`} />
            </Reveal>
          </div>
        </div>
      </section>

      <div
        aria-hidden
        className="h-[140px] w-full"
        style={{ background: 'linear-gradient(to bottom, var(--color-ink), var(--color-cream-100))' }}
      />

      <section id="spenden" data-nav-label="Spenden" className="scroll-target bg-cream-100 px-6 py-28 text-ink lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Spenden</SectionLabel>
          <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">Grosszügigkeit in Aktion</h2>
          <p className="mt-5 text-sm leading-relaxed text-ink-soft">{donation.intro}</p>
          <GoldRule className="mt-8" />
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-12 max-w-md border border-gold-400/20 bg-cream-50 p-8 shadow-soft">
          <BankRow label="Kontoinhaber" value={donation.bank.accountHolder} />
          <BankRow label="IBAN" value={donation.bank.iban} />
          <BankRow label="BIC / SWIFT" value={donation.bank.bic} />
          <BankRow label="Bank" value={donation.bank.bankName} />
          <BankRow label="Verwendungszweck" value={donation.bank.reference} />
          <BankRow label="TWINT" value={donation.twintNumber} />
        </Reveal>
      </section>

      <section id="kontakt" data-nav-label="Kontakt" className="scroll-target bg-cream-100 px-6 py-28 text-ink lg:px-10">
        {/* Zwei Formulare nebeneinander: helles Kontaktformular, dunkles Einladungsformular. */}
        {/* Spalten strecken sich auf gleiche Höhe, die Formulare füllen den Rest — so enden beide gleich tief. */}
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col">
            <Reveal>
              <SectionLabel align="left">Kontakt</SectionLabel>
              <h2 className="mt-6 font-display text-3xl text-ink">Schreib uns.</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Fragen, Anliegen oder einfach Hallo sagen — wir freuen uns, von dir zu hören.
              </p>
              <p className="mt-6 text-sm text-ink-soft">{site.email}</p>
            </Reveal>
            <Reveal delay={0.15} className="mt-10 flex-1">
              <ContactForm />
            </Reveal>
          </div>

          <div id="einladung" className="scroll-target flex flex-col">
            <Reveal>
              <SectionLabel align="left">Einladung</SectionLabel>
              <h2 className="mt-6 font-display text-3xl text-ink">Lade uns ein.</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Predigt, Taufe, Dinner oder Business-Meeting — erzähl uns von deinem Anlass.
              </p>
              <p className="mt-6 text-sm text-ink-soft">{site.email}</p>
            </Reveal>
            <Reveal delay={0.25} className="mt-10 flex-1">
              <InvitationForm />
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
