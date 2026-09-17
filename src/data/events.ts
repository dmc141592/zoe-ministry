export interface FlyerEvent {
  id: string
  title: string
  flyer: string
  date: string
  time: string
  location: string
  accent: 'gold' | 'ember' | 'navy'
}

export const flyerEvents: FlyerEvent[] = [
  {
    id: 'sunday-service',
    title: 'Sunday Service',
    flyer: '/images/flyer-sunday-service.jpeg',
    date: '2. August 2026',
    time: 'Start 15:00',
    location: 'Niederglatterstrasse 3, 8184 Bachenbülach',
    accent: 'gold',
  },
  {
    id: 'baptized-into-christ',
    title: 'Baptized Into Christ',
    flyer: '/images/flyer-baptized-into-christ.jpeg',
    date: '9. August',
    time: 'Türöffnung 9:45 · Start 10:00',
    location: 'Industriestrasse 30c, 4542 Luterbach',
    accent: 'navy',
  },
  {
    id: 'members-meeting',
    title: 'Members Meeting',
    flyer: '/images/flyer-members-meeting.jpeg',
    date: '23. August',
    time: 'Türöffnung 9:45 · Start 10:00',
    location: 'Industriestrasse 30c, 4542 Luterbach',
    accent: 'ember',
  },
]

const GERMAN_MONTHS: Record<string, number> = {
  januar: 0,
  februar: 1,
  märz: 2,
  april: 3,
  mai: 4,
  juni: 5,
  juli: 6,
  august: 7,
  september: 8,
  oktober: 9,
  november: 10,
  dezember: 11,
}

/** Parses dates like "2. August 2026" or "9. August" (year defaults to the current year). */
function parseGermanDate(value: string): Date {
  const match = value.match(/(\d{1,2})\.\s*([A-Za-zäöüÄÖÜ]+)\s*(\d{4})?/)
  if (!match) return new Date(0)
  const [, day, monthName, year] = match
  const month = GERMAN_MONTHS[monthName.toLowerCase()] ?? 0
  const resolvedYear = year ? Number(year) : new Date().getFullYear()
  return new Date(resolvedYear, month, Number(day))
}

/** Single shared sort order (newest first) used by both the home page preview and the events page. */
export function sortByDateDescending(events: FlyerEvent[]): FlyerEvent[] {
  return [...events].sort((a, b) => parseGermanDate(b.date).getTime() - parseGermanDate(a.date).getTime())
}

export const sortedFlyerEvents = sortByDateDescending(flyerEvents)
