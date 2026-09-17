import { ArrowRight, Book, CalendarDays, Eye, Gift, HandHeart, Megaphone, ShoppingBag } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { ICONS as MOUNTAIN_ICONS, type IconComponent } from '@/components/vision/SevenMountains'
import { sevenMountains } from '@/data/vision'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

interface Interest {
  key: string
  label: string
  icon: IconComponent
}

const mountainInterests: Interest[] = sevenMountains.map((mountain) => ({
  key: mountain.key,
  label: mountain.titleDe,
  icon: MOUNTAIN_ICONS[mountain.icon],
}))

const otherInterests: Interest[] = [
  { key: 'vision', label: 'Vision', icon: Eye },
  { key: 'core-values', label: 'Core Values', icon: HandHeart },
  { key: 'events', label: 'Events', icon: CalendarDays },
  { key: 'preach-testimonies', label: 'Preach & Testimonies', icon: Megaphone },
  { key: 'book', label: 'Book', icon: Book },
  { key: 'merch', label: 'Merch', icon: ShoppingBag },
  { key: 'donation', label: 'Spende', icon: Gift },
]

const allInterests = [...mountainInterests, ...otherInterests]

const inputClasses =
  'w-full rounded-[10px] border border-ink/15 bg-cream-50 px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/30'
const labelClasses = 'mb-1.5 block text-[0.65rem] uppercase tracking-[0.2em] text-gold-500'

function InterestChip({
  interest,
  selected,
  onToggle,
}: {
  interest: Interest
  selected: boolean
  onToggle: () => void
}) {
  const Icon = interest.icon
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors duration-150',
        selected
          ? 'border-gold-400 bg-gold-400 font-medium text-ink'
          : 'border-ink/15 bg-cream-50 text-ink-soft hover:border-gold-400/50',
      )}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
      {interest.label}
    </button>
  )
}

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [interests, setInterests] = useState<string[]>([])

  const toggleInterest = (key: string) => {
    setInterests((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Kontaktanfrage von ${name || 'der Website'}`)
    const selectedLabels = allInterests.filter((i) => interests.includes(i.key)).map((i) => i.label)
    const interestLine = selectedLabels.length > 0 ? `\n\nInteressiert an: ${selectedLabels.join(', ')}` : ''
    const body = encodeURIComponent(`${message}${interestLine}\n\n— ${name}\n${email}`)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-cream-100 p-6 shadow-soft sm:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClasses}
            placeholder="Dein Name"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            E-Mail
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            placeholder="deine@email.ch"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className={labelClasses}>
          Nachricht
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClasses}
          placeholder="Wie können wir dir helfen?"
        />
      </div>

      <div className="mt-6">
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold-500">
          Woran bist du interessiert? <span className="normal-case tracking-normal text-ink-soft">(optional, Mehrfachauswahl)</span>
        </p>

        <p className="mt-4 text-[0.65rem] uppercase tracking-[0.15em] text-ink-soft">Sieben Berge</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {mountainInterests.map((interest) => (
            <InterestChip
              key={interest.key}
              interest={interest}
              selected={interests.includes(interest.key)}
              onToggle={() => toggleInterest(interest.key)}
            />
          ))}
        </div>

        <p className="mt-4 text-[0.65rem] uppercase tracking-[0.15em] text-ink-soft">Weitere Themen</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {otherInterests.map((interest) => (
            <InterestChip
              key={interest.key}
              interest={interest}
              selected={interests.includes(interest.key)}
              onToggle={() => toggleInterest(interest.key)}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-8 py-3 text-xs uppercase tracking-[0.25em] text-ink transition-colors hover:bg-gold-300"
      >
        Nachricht senden
        <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
    </form>
  )
}
