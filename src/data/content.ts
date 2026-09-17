export interface VideoTile {
  id: string
  title: string
  speaker?: string
  date?: string
  // PLACEHOLDER — echten YouTube-Link einsetzen, sobald das Video hochgeladen ist.
  youtubeUrl: string
}

// PLACEHOLDER — Predigten-Grid mit echten Titeln, Daten und YouTube-Links befüllen.
export const sermons: VideoTile[] = [
  { id: 'sermon-1', title: 'PLACEHOLDER — Predigttitel', speaker: 'PLACEHOLDER — Sprecher', date: 'PLACEHOLDER — Datum', youtubeUrl: 'https://www.youtube.com/@zoedienst' },
  { id: 'sermon-2', title: 'PLACEHOLDER — Predigttitel', speaker: 'PLACEHOLDER — Sprecher', date: 'PLACEHOLDER — Datum', youtubeUrl: 'https://www.youtube.com/@zoedienst' },
  { id: 'sermon-3', title: 'PLACEHOLDER — Predigttitel', speaker: 'PLACEHOLDER — Sprecher', date: 'PLACEHOLDER — Datum', youtubeUrl: 'https://www.youtube.com/@zoedienst' },
  { id: 'sermon-4', title: 'PLACEHOLDER — Predigttitel', speaker: 'PLACEHOLDER — Sprecher', date: 'PLACEHOLDER — Datum', youtubeUrl: 'https://www.youtube.com/@zoedienst' },
  { id: 'sermon-5', title: 'PLACEHOLDER — Predigttitel', speaker: 'PLACEHOLDER — Sprecher', date: 'PLACEHOLDER — Datum', youtubeUrl: 'https://www.youtube.com/@zoedienst' },
  { id: 'sermon-6', title: 'PLACEHOLDER — Predigttitel', speaker: 'PLACEHOLDER — Sprecher', date: 'PLACEHOLDER — Datum', youtubeUrl: 'https://www.youtube.com/@zoedienst' },
]

// PLACEHOLDER — Testimony-Videos mit echten Titeln und YouTube-Links befüllen.
export const testimonies: VideoTile[] = [
  { id: 'testimony-1', title: 'PLACEHOLDER — Name / Geschichte', youtubeUrl: 'https://www.youtube.com/@zoedienst' },
  { id: 'testimony-2', title: 'PLACEHOLDER — Name / Geschichte', youtubeUrl: 'https://www.youtube.com/@zoedienst' },
  { id: 'testimony-3', title: 'PLACEHOLDER — Name / Geschichte', youtubeUrl: 'https://www.youtube.com/@zoedienst' },
  { id: 'testimony-4', title: 'PLACEHOLDER — Name / Geschichte', youtubeUrl: 'https://www.youtube.com/@zoedienst' },
]
