import { Copy, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { ContactForm } from '@/components/sections/ContactForm'
import { SwissMap } from '@/components/sections/SwissMap'
import { Reveal } from '@/components/motion/Reveal'
import { CinematicBackdrop } from '@/components/ui/Atmosphere'
import { GoldRule } from '@/components/ui/GoldRule'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { donation, locations, site } from '@/data/site'

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
        className="relative scroll-mt-28 overflow-hidden px-6 pb-24 pt-40 lg:pt-48"
      >
        <CinematicBackdrop starsExcludeZone={{ top: [22, 92], left: [18, 82] }} shootingStars />
        <Reveal className="relative mx-auto max-w-2xl text-center">
          <SectionLabel>Connect · Network</SectionLabel>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl">Zwei Orte, eine Familie.</h1>
          <p className="mt-6 text-sm leading-relaxed text-ivory/70">
            Zoe Ministry ist an zwei Standorten in der Schweiz zuhause — verbunden durch dieselbe Berufung.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="relative mt-16">
          <SwissMap />
        </Reveal>

        <div className="relative mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
          {locations.map((loc, i) => (
            <Reveal key={loc.id} delay={0.25 + i * 0.1}>
              <div className="h-full border border-gold/15 bg-navy/50 p-8">
                <SectionLabel align="left" tone="gold">{loc.canton}</SectionLabel>
                <h3 className="mt-4 font-display text-2xl text-ivory">{loc.name}</h3>
                <p className="mt-3 text-sm text-ivory/70">{loc.street}</p>
                <p className="text-sm text-ivory/70">{loc.city}, {loc.country}</p>
                <a
                  href={loc.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold/80 hover:text-gold"
                >
                  Route planen <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div
        aria-hidden
        className="h-[140px] w-full"
        style={{ background: 'linear-gradient(to bottom, var(--color-ink), var(--color-cream-100))' }}
      />

      <section id="spenden" data-nav-label="Spenden" className="scroll-mt-28 bg-cream-100 px-6 py-28 text-ink lg:px-10">
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

      <section id="kontakt" data-nav-label="Kontakt" className="scroll-mt-28 bg-cream-100 px-6 py-28 text-ink lg:px-10">
        <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionLabel align="left">Kontakt</SectionLabel>
            <h2 className="mt-6 font-display text-3xl text-ink">Schreib uns.</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Fragen, Anliegen oder einfach Hallo sagen — wir freuen uns, von dir zu hören.
            </p>
            <p className="mt-6 text-sm text-ink-soft">{site.email}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </div>
  )
}
