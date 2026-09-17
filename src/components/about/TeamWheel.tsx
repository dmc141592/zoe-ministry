import { useEffect, useRef, useState } from 'react'
import { teamMembers } from '@/data/teamMembers'

// Timing/easing constants ported 1:1 from the reference implementation.
const EDGE = 0.64
const SPACING = 118
const CENTER_THRESHOLD = 0.5
const BLOB_RANGE = 3.4
const BASE_DRIFT = 0.09
const EDGE_SPEED_MIN = 0.28
const EDGE_SPEED_RANGE = 1.3
const CENTER_PULL_FACTOR = 2.1
const HOVER_BOOST = 1.2

// Design-time reference size — the zone this was tuned against is 640px wide with
// 190px avatars. Everything scales relative to these at runtime (see `applyScale`).
const DESIGN_ZONE_WIDTH = 640
const BASE = 190

function wrap(v: number, n: number) {
  v = v % n
  if (v < 0) v += n
  return v
}

function shortestDiff(i: number, p: number, n: number) {
  let d = i - p
  d = ((d % n) + n) % n
  if (d > n / 2) d -= n
  return d
}

function smoothstep(t: number) {
  t = Math.max(0, Math.min(1, t))
  return t * t * (3 - 2 * t)
}

export function TeamWheel() {
  const n = teamMembers.length
  const zoneRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])
  const spanRefs = useRef<Array<HTMLSpanElement | null>>([])
  const wasCenterRef = useRef<boolean[]>(teamMembers.map(() => false))

  const posRef = useRef(3)
  const scaleRef = useRef(1)
  const hoveringRef = useRef(false)
  const mouseNormRef = useRef(0)
  const hoveredIdxRef = useRef(-1)
  const lastIdxShownRef = useRef(-1)
  const lastTimeRef = useRef<number | null>(null)
  const draggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartPosRef = useRef(0)

  const [caption, setCaption] = useState({ name: teamMembers[0].name, role: teamMembers[0].role })

  useEffect(() => {
    const zone = zoneRef.current
    if (!zone) return

    // Fixed base size, set once (and on resize) — never touched inside the frame
    // loop, which only ever writes `transform`/`opacity` (compositor-only, no reflow).
    const applyScale = () => {
      const scale = zone.clientWidth / DESIGN_ZONE_WIDTH
      scaleRef.current = scale
      const size = BASE * scale
      itemRefs.current.forEach((el) => {
        if (!el) return
        el.style.width = `${size}px`
        el.style.height = `${size}px`
        el.style.marginLeft = `${-size / 2}px`
        el.style.marginTop = `${-size / 2}px`
      })
    }
    applyScale()
    window.addEventListener('resize', applyScale)

    const onEnter = () => {
      hoveringRef.current = true
    }
    const onLeave = () => {
      hoveringRef.current = false
      hoveredIdxRef.current = -1
    }
    const onMove = (e: MouseEvent) => {
      const rect = zone.getBoundingClientRect()
      const x = e.clientX - rect.left
      mouseNormRef.current = (x / rect.width) * 2 - 1
    }
    const onTouchStart = (e: TouchEvent) => {
      draggingRef.current = true
      dragStartXRef.current = e.touches[0].clientX
      dragStartPosRef.current = posRef.current
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!draggingRef.current) return
      const dx = e.touches[0].clientX - dragStartXRef.current
      posRef.current = dragStartPosRef.current - dx / (SPACING * scaleRef.current)
    }
    const onTouchEnd = () => {
      draggingRef.current = false
    }

    zone.addEventListener('mouseenter', onEnter)
    zone.addEventListener('mouseleave', onLeave)
    zone.addEventListener('mousemove', onMove)
    zone.addEventListener('touchstart', onTouchStart, { passive: true })
    zone.addEventListener('touchmove', onTouchMove, { passive: true })
    zone.addEventListener('touchend', onTouchEnd)

    let rafId: number

    const loop = (ts: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = ts
      const dt = Math.min(0.05, (ts - lastTimeRef.current) / 1000)
      lastTimeRef.current = ts

      if (!draggingRef.current) {
        if (hoveringRef.current) {
          const absN = Math.abs(mouseNormRef.current)
          if (absN > EDGE) {
            const edgeT = (absN - EDGE) / (1 - EDGE)
            const speed = Math.sign(mouseNormRef.current) * (EDGE_SPEED_MIN + edgeT * EDGE_SPEED_RANGE)
            posRef.current += speed * dt
          } else if (hoveredIdxRef.current !== -1) {
            const d = shortestDiff(hoveredIdxRef.current, posRef.current, n)
            posRef.current += d * CENTER_PULL_FACTOR * dt
          } else {
            posRef.current += BASE_DRIFT * dt
          }
        } else {
          posRef.current += BASE_DRIFT * dt
        }
      }
      posRef.current = wrap(posRef.current, n)

      const scale = scaleRef.current

      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const diff = shortestDiff(i, posRef.current, n)
        const absDiff = Math.abs(diff)
        const t = smoothstep(1 - absDiff / BLOB_RANGE)
        const baseRatio = (32 + 150 * Math.pow(t, 1.3)) / BASE
        const isCenter = absDiff < CENTER_THRESHOLD
        const isHovered = hoveredIdxRef.current === i
        const ratio = isHovered ? baseRatio * HOVER_BOOST : baseRatio
        const opacity = smoothstep(Math.min(1, t * 1.2))
        const xOff = diff * SPACING * scale

        // transform-only update: translate + scale, no layout reflow, buttery smooth.
        el.style.transform = `translateX(${xOff.toFixed(2)}px) scale(${ratio.toFixed(4)})`
        el.style.opacity = String(opacity)
        el.style.zIndex = String(Math.round(100 - absDiff * 10) + (isHovered ? 50 : 0))
        el.style.background = teamMembers[i].color
        el.style.borderColor = isCenter ? '#C9A227' : 'transparent'
        el.style.boxShadow = isHovered
          ? '0 18px 36px -8px rgba(201,162,39,0.55)'
          : isCenter
            ? '0 14px 30px -8px rgba(201,162,39,0.5)'
            : 'none'

        if (isCenter !== wasCenterRef.current[i]) {
          wasCenterRef.current[i] = isCenter
          el.style.animation = isCenter ? 'family-blob-1 9s ease-in-out infinite' : 'none'
          if (!isCenter) el.style.borderRadius = '50%'
        }

        const span = spanRefs.current[i]
        if (span) span.style.fontSize = `${(16 + 11 * t) * scale}px`
      })

      const nearest = wrap(Math.round(posRef.current), n)
      if (nearest !== lastIdxShownRef.current) {
        lastIdxShownRef.current = nearest
        setCaption({ name: teamMembers[nearest].name, role: teamMembers[nearest].role })
      }

      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', applyScale)
      zone.removeEventListener('mouseenter', onEnter)
      zone.removeEventListener('mouseleave', onLeave)
      zone.removeEventListener('mousemove', onMove)
      zone.removeEventListener('touchstart', onTouchStart)
      zone.removeEventListener('touchmove', onTouchMove)
      zone.removeEventListener('touchend', onTouchEnd)
      cancelAnimationFrame(rafId)
    }
  }, [n])

  return (
    <>
      <div
        ref={zoneRef}
        className="absolute left-1/2 top-[84.24%] h-[25.45%] w-[82.05%] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        style={{ touchAction: 'pan-y' }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {teamMembers.map((member, i) => (
            <div
              key={member.name}
              ref={(el) => {
                itemRefs.current[i] = el
              }}
              onMouseEnter={() => {
                hoveredIdxRef.current = i
              }}
              onMouseLeave={() => {
                if (hoveredIdxRef.current === i) hoveredIdxRef.current = -1
              }}
              className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-full border-[3px] border-transparent transition-shadow duration-300 ease-out will-change-transform"
            >
              <span
                ref={(el) => {
                  spanRefs.current[i] = el
                }}
                className="font-display text-[#F7F3EA]"
              >
                {member.name.charAt(0)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-0 top-[98.79%] w-full text-center">
        <p className="font-display text-xl text-ink">{caption.name}</p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-gold-500">{caption.role}</p>
      </div>
    </>
  )
}
