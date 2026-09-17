export interface FamilyMember {
  firstName: string
  /** Optional — leave empty until real last names are confirmed by the client. */
  lastName?: string
  role: string
  /** Optional real photo; falls back to a monogram avatar when absent. */
  image?: string
}

export const familyMembers: FamilyMember[] = [
  { firstName: 'Jeremy', role: 'Lead Pastor' },
  { firstName: 'Danuxy', role: 'Co-Lead & Worship' },
  { firstName: 'Melvin', role: 'Operations' },
]

export const familyVerse = {
  text: 'Denn wie wir an einem Leib viele Glieder haben... so sind wir viele ein Leib in Christus, aber untereinander ist einer des anderen Glied.',
  reference: 'Römer 12,4-5',
}

export function familyMemberName(member: FamilyMember): string {
  return member.lastName ? `${member.firstName} ${member.lastName}` : member.firstName
}

export function familyMemberInitials(member: FamilyMember): string {
  const first = member.firstName.charAt(0).toUpperCase()
  return member.lastName ? `${first}.${member.lastName.charAt(0).toUpperCase()}` : first
}
