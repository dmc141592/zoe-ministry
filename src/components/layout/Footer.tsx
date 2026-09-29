import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { locations, navigation, site } from '@/data/site'
import { InstagramIcon } from '@/components/ui/InstagramIcon'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-ivory">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 pb-[calc(4rem_-_0.5cm)] pt-[108px] sm:pt-[calc(220px_-_0.5cm)] md:pt-[1.5cm] lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Ab md stehen die Spalten nebeneinander: Container-pt = 1.5cm für Navigation/Standorte,
              die Logo-Spalte gleicht die Differenz aus und bleibt an ihrer Position. */}
          <div className="md:col-span-2 md:mt-[calc(220px_-_2cm)]">
            {/* w-fit: Container ist genau so breit wie der Name, damit das Logo darüber zentriert werden kann.
                Der Platzhalter hat die ursprüngliche Logohöhe, damit der restliche Footer nicht verrutscht;
                das grosse Logo wächst von der Unterkante aus nach oben.
                Das PNG hat ~29 % transparenten Rand (horizontal symmetrisch, daher sauber zentrierbar). */}
            <div className="w-fit">
              <div className="relative h-24 sm:h-28">
                <img src="/images/english_fulltransparent_Negative.png" alt="" aria-hidden="true" className="absolute -bottom-[1cm] left-1/2 h-80 w-80 max-w-none -translate-x-1/2 object-contain sm:-bottom-[1.5cm] sm:h-[28rem] sm:w-[28rem]" />
              </div>
              {/* -mr gleicht das Letter-Spacing nach dem letzten Buchstaben aus, damit die Mitte optisch stimmt. */}
              <span className="relative -mr-[0.18em] -mt-[calc(1.5cm_-_1rem)] block font-display text-2xl tracking-[0.18em] text-ivory">{site.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gold">
              {site.tagline}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ivory/70 transition-colors hover:text-gold"
              >
                <InstagramIcon className="h-4 w-4" />
                {site.instagramHandle}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ivory/70 transition-colors hover:text-gold"
              >
                <Mail className="h-4 w-4" strokeWidth={1.5} />
                {site.email}
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.3em] text-gold">Navigation</h3>
            <ul className="mt-4 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to ?? item.children?.[0]?.to ?? '/'}
                    className="text-sm text-ivory/70 transition-colors hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.3em] text-gold">Standorte</h3>
            <ul className="mt-4 space-y-4">
              {/* Nur der Hauptstandort — die Partnerkirche wird im Footer nicht aufgeführt. */}
              {locations
                .filter((loc) => loc.role === 'Hauptstandort')
                .map((loc) => (
                  <li key={loc.id} className="text-sm text-ivory/70">
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold/70">{loc.role}</p>
                    <p className="text-ivory/90">{loc.name} · {loc.canton}</p>
                    <p>{loc.street}</p>
                    <p>{loc.city}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/40 md:flex-row">
          <p>&copy; {new Date().getFullYear()} {site.name}. Alle Rechte vorbehalten.</p>
          <p className="italic font-accent text-sm tracking-wide text-gold/70">OH DEATH,<br />Where is your Victor?</p>
        </div>
      </div>
    </footer>
  )
}
