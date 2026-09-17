export interface TeamMember {
  name: string
  role: string
  /** Flat solid fallback color for the wheel avatar until a real photo is added. */
  color: string
  /** Optional real photo — falls back to the flat monogram swatch above when absent. */
  image?: string
}

// Palette cycles across entries — no real photos yet, see `image` on TeamMember.
const PALETTE = ['#7a5a28', '#3d5170', '#5a4066', '#6b5a28', '#2f6b5a']

const DEVOTED_MEMBER = 'Devoted Member'

const roster: Array<[name: string, role?: string]> = [
  ['Enoch', 'Media'],
  ['Jaganiy', 'Hospitality'],
  ['Jathuyan', 'Missionar'],
  ['Joel'],
  ['Rebeckah', 'Worship'],
  ['Gideon'],
  ['Judith'],
  ['Karthi'],
  ['Qiara', 'Kids Ministry'],
  ['Sangitha'],
  ['Kandol'],
  ['Saro'],
  ['Shapthi'],
  ['Shenthuran', 'Hospitality Leader'],
  ['SuJeevan', 'Kids Ministry'],
  ['Tharun'],
  ['Thenu'],
  ['ThrsaNila'],
  ['Salome', 'Media'],
]

export const teamMembers: TeamMember[] = roster.map(([name, role], i) => ({
  name,
  role: role ?? DEVOTED_MEMBER,
  color: PALETTE[i % PALETTE.length],
}))
