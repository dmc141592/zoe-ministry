import { ArrowRight, Briefcase, Church, Droplets, HeartHandshake, Mic, Users, UtensilsCrossed } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

interface Topic {
  key: string
  label: string
  icon: LucideIcon
}

const topics: Topic[] = [
  { key: 'preach', label: 'Preach', icon: Mic },
  { key: 'counselling', label: 'Counselling', icon: HeartHandshake },
  { key: 'taufe', label: 'Taufe', icon: Droplets },
  { key: 'dinner', label: 'Dinner', icon: UtensilsCrossed },
  { key: 'business', label: 'Business', icon: Briefcase },
  { key: 'meeting', label: 'Meeting', icon: Users },
  { key: 'guest-pastor', label: 'Guest Pastor', icon: Church },
]

// Variante des Kontaktformulars: dunkles Beige, dunkle Schrift, helle Felder.
const inputClasses =
  'w-full rounded-[10px] border border-ink/15 bg-ivory/90 px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-ink/50 focus:outline-none focus:ring-2 focus:ring-ink/15'
const labelClasses = 'mb-1.5 block text-[0.65rem] uppercase tracking-[0.2em] text-[#9e7b1a]'

function TopicChip({ topic, selected, onToggle }: { topic: Topic; selected: boolean; onToggle: () => void }) {
  const Icon = topic.icon
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors duration-150',
        selected
          ? 'border-ink bg-ink font-medium text-gold'
          : 'border-ink/20 bg-ivory/70 text-ink hover:border-ink/50',
      )}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
      {topic.label}
    </button>
  )
}

export function InvitationForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [organisation, setOrganisation] = useState('')
  const [date, setDate] = useState('')
  const [place, setPlace] = useState('')
  const [message, setMessage] = useState('')
  const [selected, setSelected] = useState<string[]>([])

  const toggleTopic = (key: string) => {
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Einladung von ${organisation || name || 'der Website'}`)
    const topicLabels = topics.filter((t) => selected.includes(t.key)).map((t) => t.label)
    const lines = [
      message,
      '',
      topicLabels.length > 0 ? `Einladungsthema: ${topicLabels.join(', ')}` : '',
      organisation ? `Gemeinde / Organisation: ${organisation}` : '',
      date ? `Datum: ${date}` : '',
      place ? `Ort: ${place}` : '',
      '',
      `— ${name}`,
      email,
    ].filter((line, i, arr) => line !== '' || arr[i - 1] !== '')
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(lines.join('\n'))}`
  }

  return (
    <form onSubmit={handleSubmit} className="h-full rounded-xl bg-[#e0d4bb]/90 p-6 text-ink shadow-[0_30px_60px_-10px_rgba(60,48,30,0.4),0_10px_24px_-6px_rgba(60,48,30,0.28)] backdrop-blur-sm sm:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="inv-name" className={labelClasses}>
            Name
          </label>
          <input
            id="inv-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClasses}
            placeholder="Dein Name"
          />
        </div>
        <div>
          <label htmlFor="inv-email" className={labelClasses}>
            E-Mail
          </label>
          <input
            id="inv-email"
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
        <label htmlFor="inv-organisation" className={labelClasses}>
          Gemeinde / Organisation
        </label>
        <input
          id="inv-organisation"
          value={organisation}
          onChange={(e) => setOrganisation(e.target.value)}
          className={inputClasses}
          placeholder="optional"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="inv-date" className={labelClasses}>
            Wunschdatum
          </label>
          <input
            id="inv-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="inv-place" className={labelClasses}>
            Ort
          </label>
          <input
            id="inv-place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className={inputClasses}
            placeholder="Stadt / Adresse"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="inv-message" className={labelClasses}>
          Nachricht
        </label>
        <textarea
          id="inv-message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClasses}
          placeholder="Erzähl uns von deinem Anlass."
        />
      </div>

      <div className="mt-6">
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[#9e7b1a]">
          Einladungsthema <span className="normal-case tracking-normal text-ink/60">(Mehrfachauswahl möglich)</span>
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((topic) => (
            <TopicChip
              key={topic.key}
              topic={topic}
              selected={selected.includes(topic.key)}
              onToggle={() => toggleTopic(topic.key)}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-3 text-xs uppercase tracking-[0.25em] text-gold transition-colors hover:bg-navy-deep"
      >
        Einladung senden
        <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
    </form>
  )
}
