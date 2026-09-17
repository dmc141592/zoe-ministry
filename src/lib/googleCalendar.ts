export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  allDay: boolean
}

interface GoogleCalendarApiEvent {
  id: string
  summary?: string
  start?: { date?: string; dateTime?: string }
  end?: { date?: string; dateTime?: string }
}

interface GoogleCalendarApiResponse {
  items?: GoogleCalendarApiEvent[]
}

function hasPlaceholderCredentials(apiKey: string | undefined, calendarId: string | undefined): boolean {
  if (!apiKey || !calendarId) return true
  return apiKey.includes('PLATZHALTER') || calendarId.includes('PLATZHALTER')
}

/** Parses a "YYYY-MM-DD" all-day date as local midnight, avoiding the UTC-parsing day shift of `new Date(str)`. */
function parseDateOnly(value: string): Date {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export async function fetchUpcomingEvents(monthsAhead = 3): Promise<CalendarEvent[]> {
  const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY
  const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID

  if (hasPlaceholderCredentials(apiKey, calendarId)) {
    return []
  }

  const timeMin = new Date()
  const timeMax = new Date(timeMin)
  timeMax.setMonth(timeMax.getMonth() + monthsAhead)

  const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`)
  url.searchParams.set('key', apiKey)
  url.searchParams.set('timeMin', timeMin.toISOString())
  url.searchParams.set('timeMax', timeMax.toISOString())
  url.searchParams.set('singleEvents', 'true')
  url.searchParams.set('orderBy', 'startTime')
  url.searchParams.set('maxResults', '50')

  try {
    const response = await fetch(url.toString())
    if (!response.ok) return []

    const data: GoogleCalendarApiResponse = await response.json()

    return (data.items ?? [])
      .filter((item): item is GoogleCalendarApiEvent & { summary: string } => Boolean(item.summary))
      .map((item) => {
        const allDay = Boolean(item.start?.date)
        const start = item.start?.dateTime
          ? new Date(item.start.dateTime)
          : item.start?.date
            ? parseDateOnly(item.start.date)
            : new Date(NaN)
        const end = item.end?.dateTime
          ? new Date(item.end.dateTime)
          : item.end?.date
            ? parseDateOnly(item.end.date)
            : start
        return { id: item.id, title: item.summary, start, end, allDay }
      })
      .filter((event) => !Number.isNaN(event.start.getTime()))
  } catch {
    return []
  }
}
