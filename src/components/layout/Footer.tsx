import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { locations, navigation, site } from '@/data/site'
import { InstagramIcon } from '@/components/ui/InstagramIcon'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-ivory">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <img src="/images/english_fulltransparent_Negative.png" alt="" aria-hidden="true" className="h-24 w-24 object-contain sm:h-28 sm:w-28" />
            <span className="mt-4 block font-display text-2xl tracking-[0.18em] text-ivory">{site.name}</span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/60">
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
                  <Link to={item.to} className="text-sm text-ivory/70 transition-colors hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.3em] text-gold">Standorte</h3>
            <ul className="mt-4 space-y-4">
              {locations.map((loc) => (
                <li key={loc.id} className="text-sm text-ivory/70">
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
          <p className="italic font-accent text-sm tracking-wide text-gold/70">Europe shall be saved.</p>
        </div>
      </div>
    </footer>
  )
}
