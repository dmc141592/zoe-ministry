import { motion } from 'framer-motion'
import { useState } from 'react'
import { familyMemberInitials, familyMemberName, familyMembers, type FamilyMember } from '@/data/family'

interface BlobStyle {
  position: string
  size: string
  gradient: string
  borderWidth: string
  initialsSize: string
  nameSize: string
  roleSize: string
  captionMarginTop: string
  animationClass: string
  zIndex: number
}

const blobStyles: BlobStyle[] = [
  {
    // Pastor — top center, largest
    position: 'left-1/2 top-[2%] -translate-x-1/2',
    size: 'h-[150px] w-[156px] sm:h-[210px] sm:w-[218px] lg:h-[250px] lg:w-[260px]',
    gradient: 'linear-gradient(160deg,#3a3020,#20180f)',
    borderWidth: '3px',
    initialsSize: 'text-3xl sm:text-4xl lg:text-[56px]',
    nameSize: 'text-base sm:text-lg lg:text-[19px]',
    roleSize: 'text-[10px] lg:text-[11px]',
    captionMarginTop: 'mt-7 lg:mt-9',
    animationClass: 'family-blob-1',
    zIndex: 3,
  },
  {
    // Pastor's wife — right, one tier lower (top% derived from the shared 780x825
    // canvas so this bubble's rendered center lands exactly on the connecting line).
    position: 'left-[83%] top-[53.09%] -translate-x-1/2 -translate-y-1/2',
    size: 'h-[110px] w-[116px] sm:h-[155px] sm:w-[163px] lg:h-[180px] lg:w-[190px]',
    gradient: 'linear-gradient(160deg,#4a3418,#241a0c)',
    borderWidth: '2.5px',
    initialsSize: 'text-xl sm:text-2xl lg:text-4xl',
    nameSize: 'text-sm sm:text-base',
    roleSize: 'text-[9px] lg:text-[10.5px]',
    captionMarginTop: 'mt-5 lg:mt-[26px]',
    animationClass: 'family-blob-2',
    zIndex: 2,
  },
  {
    // Right hand / operations — left, same tier as the wife
    position: 'left-[17%] top-[53.09%] -translate-x-1/2 -translate-y-1/2',
    size: 'h-[110px] w-[116px] sm:h-[155px] sm:w-[163px] lg:h-[180px] lg:w-[190px]',
    gradient: 'linear-gradient(160deg,#2a3550,#141a28)',
    borderWidth: '2.5px',
    initialsSize: 'text-xl sm:text-2xl lg:text-4xl',
    nameSize: 'text-sm sm:text-base',
    roleSize: 'text-[9px] lg:text-[10.5px]',
    captionMarginTop: 'mt-5 lg:mt-[26px]',
    animationClass: 'family-blob-3',
    zIndex: 2,
  },
]

function FamilyBlob({ member, style }: { member: FamilyMember; style: BlobStyle }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div className={`absolute ${style.position} ${style.size}`} style={{ zIndex: style.zIndex }}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{
          scale: hovered ? 1.18 : 1,
          boxShadow: hovered ? '0 20px 42px -8px rgba(201,162,39,0.5)' : '0 12px 28px -10px rgba(27,23,18,0.3)',
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`flex h-full w-full cursor-pointer items-center justify-center ${style.animationClass}`}
        style={{ background: style.gradient, border: `${style.borderWidth} solid #C9A227` }}
      >
        <span className={`font-display text-[#E3CE8A] ${style.initialsSize}`}>{familyMemberInitials(member)}</span>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
        transition={{ duration: 0.3 }}
        className={`pointer-events-none text-center ${style.captionMarginTop}`}
      >
        <p className={`font-display text-ink ${style.nameSize}`}>{familyMemberName(member)}</p>
        <p className={`mt-0.5 uppercase tracking-[0.05em] text-gold-500 ${style.roleSize}`}>{member.role}</p>
      </motion.div>
    </div>
  )
}

/**
 * Renders only the three positioned blobs — no wrapping box or connecting lines.
 * Meant to be placed inside a shared 780x825 relative canvas (see AboutPage.tsx)
 * together with <TeamWheel />, so the SVG lines between them can be drawn once,
 * in one shared coordinate system, ending exactly on each bubble's center.
 */
export function FamilyBubbles() {
  return (
    <>
      {familyMembers.map((member, i) => (
        <FamilyBlob key={member.firstName} member={member} style={blobStyles[i]} />
      ))}
    </>
  )
}
