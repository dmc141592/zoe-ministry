import { useEffect, useMemo, useState } from 'react'
import { CalendarClock, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fetchUpcomingEvents, type CalendarEvent } from '@/lib/googleCalendar'

const MONTHS_AHEAD = 3
const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

function dateKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

function getMonthGrid(monthDate: Date): Date[] {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const firstOfMonth = new Date(year, month, 1)
  const lastOfMonth = new Date(year, month + 1, 0)
  const startOffset = (firstOfMonth.getDay() + 6) % 7
  const endOffset = (7 - ((lastOfMonth.getDay() + 6) % 7) - 1) % 7

  const days: Date[] = []
  const cursor = new Date(year, month, 1 - startOffset)
  const end = new Date(year, month + 1, endOffset)
  while (cursor <= end) {
    days.push(new Date(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }
  return days
}

const monthYearFormatter = new Intl.DateTimeFormat('de-CH', { month: 'long', year: 'numeric' })
const upcomingDateFormatter = new Intl.DateTimeFormat('de-CH', { weekday: 'short', day: 'numeric', month: 'long' })

export function StyledCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(new Date()))

  useEffect(() => {
    let cancelled = false
    fetchUpcomingEvents(MONTHS_AHEAD).then((result) => {
      if (!cancelled) {
        setEvents(result)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  const minMonth = useMemo(() => startOfMonth(new Date()), [])
  const maxMonth = useMemo(() => addMonths(minMonth, MONTHS_AHEAD), [minMonth])

  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>()
    for (const event of events) {
      const key = dateKey(event.start)
      const existing = map.get(key)
      if (existing) existing.push(event)
      else map.set(key, [event])
    }
    return map
  }, [events])

  const upcoming = useMemo(() => events.slice(0, 8), [events])

  const days = useMemo(() => getMonthGrid(viewMonth), [viewMonth])
  const atMin = viewMonth.getTime() <= minMonth.getTime()
  const atMax = viewMonth.getTime() >= maxMonth.getTime()

  const isEmpty = !loading && events.length === 0

  return (
    <div className="rounded-2xl bg-cream-50 p-4 shadow-soft sm:p-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setViewMonth((m) => addMonths(m, -1))}
          disabled={atMin}
          className="rounded-full border border-gold-400/30 p-2 text-ink transition hover:bg-gold-400/10 disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Vorheriger Monat"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.6} />
        </button>
        <h3 className="font-display text-lg capitalize text-ink sm:text-xl">{monthYearFormatter.format(viewMonth)}</h3>
        <button
          type="button"
          onClick={() => setViewMonth((m) => addMonths(m, 1))}
          disabled={atMax}
          className="rounded-full border border-gold-400/30 p-2 text-ink transition hover:bg-gold-400/10 disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Nächster Monat"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.6} />
        </button>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-1 text-center text-[0.65rem] font-medium uppercase tracking-[0.15em] text-gold-500">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1">
        {days.map((day) => {
          const inMonth = day.getMonth() === viewMonth.getMonth()
          const dayEvents = loading ? [] : (eventsByDay.get(dateKey(day)) ?? [])
          const hasEvents = dayEvents.length > 0

          return (
            <div
              key={day.toISOString()}
              className={cn('min-h-16 rounded-lg p-1.5', inMonth ? 'bg-cream-100/60' : 'bg-transparent')}
            >
              {loading ? (
                <div className="h-3 w-3 animate-pulse rounded bg-ink/10" />
              ) : (
                <span
                  className={cn(
                    'text-xs',
                    !inMonth ? 'text-ink/25' : hasEvents ? 'font-medium text-ink' : 'text-ink/55',
                  )}
                >
                  {day.getDate()}
                </span>
              )}

              {loading ? (
                <div className="mt-1.5 h-2.5 w-full animate-pulse rounded bg-ink/5" />
              ) : (
                hasEvents && (
                  <div className="mt-1 flex flex-col gap-0.5">
                    {dayEvents.slice(0, 2).map((event) => (
                      <span
                        key={event.id}
                        className="truncate rounded-[5px] bg-gold-400 px-1 py-0.5 text-[9.5px] leading-tight text-ink"
                        title={event.title}
                      >
                        {event.title}
                      </span>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="truncate rounded-[5px] bg-gold-400/70 px-1 py-0.5 text-[9.5px] leading-tight text-ink">
                        +{dayEvents.length - 2} weitere
                      </span>
                    )}
                  </div>
                )
              )}
            </div>
          )
        })}
      </div>

      {loading ? (
        <div className="mt-6 rounded-xl border border-gold-400/15 bg-cream-100/50 p-4">
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 w-full animate-pulse rounded bg-ink/5" />
            ))}
          </div>
        </div>
      ) : isEmpty ? (
        <p className="mt-6 flex items-center justify-center gap-2 py-2 text-center text-sm text-ink/50">
          <CalendarClock className="h-4 w-4" strokeWidth={1.4} />
          Kalender wird bald verbunden
        </p>
      ) : (
        <div className="mt-6 rounded-xl border border-gold-400/15 bg-cream-100/50 p-4">
          <ul className="divide-y divide-gold-400/10">
            {upcoming.map((event) => (
              <li key={event.id} className="flex items-center gap-3 py-2 text-sm">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                <span className="shrink-0 text-xs uppercase tracking-wide text-gold-500">
                  {upcomingDateFormatter.format(event.start)}
                </span>
                <span className="truncate text-ink">{event.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
