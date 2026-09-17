// Englisches Vision-Statement — laut Kunden-PDF unverändert auf Englisch zu übernehmen.
export const visionStatement = {
  lines: [
    'GOD IS FATHER, SON AND HOLY SPIRIT.',
    'GOD IS 100% GOOD. GOD IS LOVE. GOD HAS ONLY GOOD PLANS. GOD IS 100% INVOLVED IN EVERYONE AND EVERYTHING.',
    'AS BELOVED CHILDREN OF GOD, WE GAIN ACCESS TO AN INDESTRUCTIBLE LIFE — A LIFE THAT IS YET TO BE FULLY MANIFESTED THROUGHOUT ALL CREATION. TO BRING HEAVEN TO EARTH IS NOT A DREAM, BUT A REALITY. OUR VISION IS TO SEE:',
    'A GOD-FEARING GOVERNMENT, AN ECONOMY WHERE EVERYONE PROSPERS, EDUCATION THAT BELIEVES IN CHILDREN WHO WILL IMPACT THE WORLD, HEALTHY AND RESTORED FAMILIES, RELIGION FINDING CHRIST, GOD-INSPIRED CREATIVITY IN THE ARTS, ENTERTAINMENT THAT REFLECTS TRUTH AND BEAUTY, MEDIA THAT SPREADS FAITH, HOPE, AND LOVE.',
  ],
}

export const visionVerse = {
  text: 'Und sie sangen in einem gewaltigen Chor: «Würdig ist das Lamm, das geschlachtet worden ist. Es ist würdig, Macht und Reichtum entgegenzunehmen und Weisheit und Stärke und Ehre und Herrlichkeit und Lob.»',
  reference: 'Offenbarung 5:12',
}

// Icon-Schlüssel werden in src/components/vision/SevenMountains.tsx auf lucide-react-Komponenten gemappt.
export type MountainIcon = 'landmark' | 'chart-line' | 'school' | 'house-heart' | 'cross' | 'palette' | 'mic-2'

export interface Mountain {
  key: string
  titleEn: string
  titleDe: string
  /** Ausführlicher englischer Fliesstext — z. B. für zukünftige Detailseiten. */
  description: string
  /** Kurzer deutscher Text für die interaktive Sieben-Berge-Visualisierung. */
  textDe: string
  icon: MountainIcon
  /** Relative Grundhöhe (px) des Gipfels in der Bergketten-Illustration. */
  amplitude: number
}

export const sevenMountains: Mountain[] = [
  {
    key: 'government',
    titleEn: 'GOVERNMENT',
    titleDe: 'Regierung',
    description:
      "Government holds the power to pass public laws and shift culture, serving as the strategic place for people with an apostolic heart to establish a God-fearing government that honors God as King.",
    textDe: 'Die Ebene, auf der die Geschicke eines Landes zum Guten oder zum Bösen geführt werden.',
    icon: 'landmark',
    amplitude: 48,
  },
  {
    key: 'economy',
    titleEn: 'ECONOMY',
    titleDe: 'Wirtschaft',
    description:
      'Business drives the marketplace and global finance, serving as the strategic platform for people with a prophetic heart to build an economy where everyone prospers, operating in the Spirit of Knowledge to discover and transfer wealth for the ultimate advancement of the Kingdom of God.',
    textDe:
      'Der Bereich, von dem alle anderen Bereiche abhängen. Wo Menschen für die Herrlichkeit Gottes oder die Herrlichkeit des Menschen arbeiten.',
    icon: 'chart-line',
    amplitude: 72,
  },
  {
    key: 'education',
    titleEn: 'EDUCATION',
    titleDe: 'Bildung',
    description:
      "Education shapes the mindset and worldview of the next generation, serving as the strategic place for people with a teacher's heart to build an education system that believes in children who will impact the world, relying on God as the ultimate Teacher and the Spirit of Wisdom to anchor everything importantly in Christ.",
    textDe: 'Wo der Mensch hin zu oder weg von Gott geführt wird.',
    icon: 'school',
    amplitude: 72,
  },
  {
    key: 'family',
    titleEn: 'FAMILY',
    titleDe: 'Familie',
    description:
      'Family forms the foundational building block of human society, serving as the sacred sanctuary for people with a pastoral heart to foster healthy and restored families who operate in the Spirit of Counsel and live in the secure identity that we are accepted.',
    textDe: 'Wo Segen oder Fluch an unsere Kinder weitergegeben wird.',
    icon: 'house-heart',
    amplitude: 80,
  },
  {
    key: 'religion',
    titleEn: 'RELIGION',
    titleDe: 'Religion',
    description:
      'Recognizing that religion is a man-made concept, this mountain is the strategic place where the fivefold ministry impacts society through the Spirit of Strength, ensuring that religion finds Christ and leaves people fundamentally secure in Him.',
    textDe: 'Wo Menschen Gott in „Geist und Wahrheit" anbeten oder sich mit religiösen Ritualen begnügen.',
    icon: 'cross',
    amplitude: 70,
  },
  {
    key: 'arts',
    titleEn: 'ARTS & ENTERTAINMENT',
    titleDe: 'Kunst & Unterhaltung',
    description:
      'Arts and entertainment capture the human heart and shape culture, serving as the strategic stage for people with a prophetic heart to release God-inspired creativity in the arts and provide entertainment that reflects truth and beauty, operating through the Spirit of the Lord to point back to God as Creator and live out the reality that we are fulfilled in Him.',
    textDe: 'Wo Werte und Tugenden entweder gefeiert oder verdreht werden.',
    icon: 'palette',
    amplitude: 66,
  },
  {
    key: 'media',
    titleEn: 'MEDIA',
    titleDe: 'Medien',
    description:
      "Media controls the flow of global information and public opinion, serving as the microphone for people with an evangelist's heart to operate in the Spirit of Understanding, reflect God as the ultimate Communicator, and remind the world that we have a destiny through media that spreads faith, hope, and love.",
    textDe: 'Wo gute oder schlechte Nachrichten, Wahrheit oder Lüge verbreitet werden.',
    icon: 'mic-2',
    amplitude: 62,
  },
]
