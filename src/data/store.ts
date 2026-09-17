export const book = {
  title: 'Foundation of Faith',
  subtitle: 'Building a life that lasts',
  cover: '/images/foundation-of-faith-book-cover.jpeg',
  intro:
    'Ein praktischer Wegweiser, um dein Leben auf unerschütterliche Wahrheit zu bauen und mit Sinn zu leben — jeden Tag.',
  description:
    'Foundation of Faith zeigt, wie ein Leben aussieht, das trägt — durch die gewöhnlichen Wochen und die, die dich erschüttern. Geschrieben für eine Generation, die etwas Echtes sucht, bewegt es sich zwischen ehrlichem Gespräch, biblischen Grundlagen und gelebtem Alltag.',
  themes: [
    'Biblische Grundlagen für den Alltag',
    'Praktische Anwendung statt Theorie',
    'Glaube, der dein Leben verändert',
    'Zugehörigkeit vor Leistung',
  ],
  author: {
    // PLACEHOLDER — echten Autorennamen einsetzen.
    name: 'PLACEHOLDER — Name des Autors',
    role: 'Pastor · Speaker · Autor',
    image: '/images/author-photo.jpeg',
    // PLACEHOLDER — kurze, persönliche Biografie ergänzen.
    bio: 'PLACEHOLDER — kurze Biografie ergänzen: wie die Zoe-Gemeinschaft entstanden ist, woraus dieses Buch gewachsen ist und warum es dem Autor wichtig ist.',
  },
  // PLACEHOLDER — echten Shopify-Produktlink einsetzen.
  shopifyUrl: 'https://shopify.com/',
}

export interface MerchItem {
  name: string
  description: string
}

// PLACEHOLDER — Merch-/Dropship-Sortiment ergänzen, sobald verfügbar.
export const merchItems: MerchItem[] = [
  { name: 'Zoe Gang Hoodie', description: 'PLACEHOLDER — Beschreibung & Preis' },
  { name: 'Zoe Gang Cap', description: 'PLACEHOLDER — Beschreibung & Preis' },
  { name: 'Foundation of Faith Journal', description: 'PLACEHOLDER — Beschreibung & Preis' },
]
