/**
 * Zentrale Website-Konfiguration.
 * Werte mit "PLACEHOLDER" muss der Kunde noch durch echte Angaben ersetzen.
 */
export const site = {
  name: 'ZOE MINISTRY',
  shortName: 'ZOE',
  tagline: 'Belong. Believe. Become.',
  eventBrand: 'ZOE GANG',
  instagramHandle: '@zoedienst',
  instagramUrl: 'https://www.instagram.com/zoedienst',
  // PLACEHOLDER — offizielle Kontakt-E-Mail ergänzen.
  email: 'hello@zoeministry.ch',
}

export const locations = [
  {
    id: 'luterbach',
    name: 'Luterbach',
    canton: 'Solothurn',
    role: 'Hauptstandort',
    cantonCode: 'SO',
    street: 'Industriestrasse 30c',
    city: '4542 Luterbach',
    country: 'Schweiz',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Industriestrasse+30c+4542+Luterbach',
  },
  {
    id: 'bachenbuelach',
    name: 'Bachenbülach',
    canton: 'Zürich',
    role: 'Partnerkirche',
    cantonCode: 'ZH',
    street: 'Niederglatterstrasse 3',
    city: '8184 Bachenbülach',
    country: 'Schweiz',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Niederglatterstrasse+3+8184+Bachenbülach',
  },
] as const

// Links führen zur Kalenderansicht (später mit Google Kalender verbunden).
export const regionalMeetings = [
  { id: 'basel', name: 'Basel', eventUrl: '/events#kalender-ansicht' },
  { id: 'interlaken', name: 'Interlaken', eventUrl: '/events#kalender-ansicht' },
  { id: 'solothurn', name: 'Solothurn', eventUrl: '/events#kalender-ansicht' },
] as const

// Sprungziel der Karten auf der Connect-Seite — die Punkte der Schweizer Karte verlinken dorthin.
export const locationAnchor = (id: string) => `standort-${id}`

export type NavLeaf = {
  label: string
  to: string
}

export type NavSubItem = NavLeaf & {
  children?: NavLeaf[]
}

export type NavItem = {
  label: string
  // Kein Link — öffnet nur das Dropdown (z.B. "About Us").
  to?: string
  children?: NavSubItem[]
}

export const navigation: NavItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'About Us',
    children: [
      {
        label: 'About Church',
        to: '/about',
        children: [
          { label: 'Core Values', to: '/about#core-values' },
          { label: 'Faith Statement', to: '/about#faith-statement' },
          { label: 'Family', to: '/about#family' },
        ],
      },
      {
        label: 'About Pastor',
        to: '/about-pastor#pastor-journey',
        children: [
          { label: 'Pastor Journey', to: '/about-pastor#pastor-journey' },
          { label: 'Pastor Invite', to: '/about-pastor#pastor-invite' },
          { label: 'Family Story', to: '/about-pastor#family-story' },
        ],
      },
    ],
  },
  {
    label: 'Vision',
    to: '/vision',
    children: [{ label: 'Seven Mountains', to: '/vision#seven-mountains' }],
  },
  {
    label: 'Content',
    to: '/content',
    children: [
      { label: 'Preach', to: '/content#preach' },
      { label: 'Testimonies', to: '/content#testimonies' },
    ],
  },
  {
    label: 'Events & Calendar',
    to: '/events',
    children: [
      { label: 'Sunday Service', to: '/events#anlaesse' },
      { label: 'Gathering & Events', to: '/events#gatherings' },
      { label: 'Calendar', to: '/events#kalender-ansicht' },
    ],
  },
  { label: 'Store', to: '/store' },
  { label: 'Connect', to: '/connect' },
]

// PLACEHOLDER — Bankangaben für die Spenden-Sektion vom Kunden einholen.
export const donation = {
  intro:
    'Deine Grosszügigkeit trägt die Vision von Zoe Ministry — von Sonntag zu Sonntag und von Nation zu Nation.',
  bank: {
    accountHolder: 'PLACEHOLDER — Kontoinhaber',
    iban: 'PLACEHOLDER — CH00 0000 0000 0000 0000 0',
    bic: 'PLACEHOLDER — BIC / SWIFT',
    bankName: 'PLACEHOLDER — Name der Bank',
    reference: 'Spende Zoe Ministry',
  },
  // PLACEHOLDER — TWINT-Nummer oder QR-Code ergänzen, sobald vorhanden.
  twintNumber: 'PLACEHOLDER — TWINT Nummer',
}
