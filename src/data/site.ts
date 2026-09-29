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
  // Ohne Link öffnet der Punkt nur das Dropdown.
  to?: string
  children?: NavSubItem[]
}

export const navigation: NavItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'About Us',
    // Gleiche Verlinkung wie "About Church".
    to: '/about',
    children: [
      {
        label: 'About Church',
        to: '/about',
        children: [
          { label: 'Core Values', to: '/about#core-values-ansicht' },
          { label: 'Faith Statement', to: '/about#faith-statement-ansicht' },
          { label: 'Family', to: '/about#family-ansicht' },
        ],
      },
      {
        label: 'About Pastor',
        to: '/about-pastor#pastor-journey-ansicht',
        children: [
          { label: 'Pastor Journey', to: '/about-pastor#pastor-journey-ansicht' },
          { label: 'Pastor Invite', to: '/about-pastor#pastor-invite-ansicht' },
          { label: 'Family Story', to: '/about-pastor#family-story-ansicht' },
        ],
      },
    ],
  },
  {
    label: 'Vision',
    to: '/vision',
    children: [{ label: 'Seven Mountains', to: '/vision#seven-mountains-ansicht' }],
  },
  {
    label: 'Content',
    to: '/content',
    children: [
      { label: 'Preach', to: '/content#preach-ansicht' },
      { label: 'Testimonies', to: '/content#testimonies-ansicht' },
    ],
  },
  {
    label: 'Events & Calendar',
    to: '/events',
    children: [
      { label: 'Sunday Service', to: '/events#anlaesse-ansicht' },
      { label: 'Gathering & Events', to: '/events#gatherings-ansicht' },
      { label: 'Calendar', to: '/events#kalender-ansicht' },
    ],
  },
  { label: 'Store', to: '/store' },
  {
    label: 'Connect',
    to: '/connect',
    // Gleiche Sprungziele wie die Seitennavigation auf der Connect-Seite.
    children: [
      { label: 'Standorte', to: '/connect#standorte-ansicht' },
      { label: 'Spenden', to: '/connect#spenden-ansicht' },
      { label: 'Kontakt', to: '/connect#kontakt-ansicht' },
    ],
  },
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
