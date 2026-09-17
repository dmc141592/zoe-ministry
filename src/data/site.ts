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
    cantonCode: 'ZH',
    street: 'Niederglatterstrasse 3',
    city: '8184 Bachenbülach',
    country: 'Schweiz',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Niederglatterstrasse+3+8184+Bachenbülach',
  },
] as const

export const navigation = [
  { label: 'Home', to: '/' },
  {
    label: 'About Us',
    to: '/about',
    children: [
      { label: 'Core Values', to: '/about#core-values' },
      { label: 'Faith Statement', to: '/about#faith-statement' },
      { label: 'Family', to: '/about#family' },
    ],
  },
  { label: 'Vision', to: '/vision' },
  {
    label: 'Content',
    to: '/content',
    children: [
      { label: 'Preach', to: '/content#preach' },
      { label: 'Testimonies', to: '/content#testimonies' },
    ],
  },
  { label: 'Events & Calendar', to: '/events' },
  { label: 'Store', to: '/store' },
  { label: 'Connect', to: '/connect' },
] as const

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
