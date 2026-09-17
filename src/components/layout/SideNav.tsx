import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const SPACING = 56
const START_Y = 30
const CX = 12
const RING_RADIUS = 10
const RING_COUNT = 9
const HERO_OFFSET = 140

const GOLD = '#B8892F'
const DOT_INACTIVE = '#B9AF9C'

const RING_ANGLES = Array.from({ length: RING_COUNT }, (_, i) => (i / RING_COUNT) * Math.PI * 2)

interface SectionInfo {
  id: string
  label: string
}

/**
 * Fixed side-dot navigation, mounted once for every page. The block itself
 * never moves (top: 50%, translateY(-50%), fixed) — only its opacity
 * toggles once that page's hero/intro section has been scrolled past.
 * Dots are read from each page's own `section[data-nav-label]` elements,
 * so the count and labels always match whatever page is currently mounted.
 */
export function SideNav() {
  const location = useLocation()
  const [sections, setSections] = useState<SectionInfo[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const [labelText, setLabelText] = useState('')
  const [labelOpacity, setLabelOpacity] = useState(1)
  const lastActive = useRef(-1)
  // The route we last *successfully* collected sections for — not a DOM
  // content hash. React 18 StrictMode double-invokes the initial mount's
  // effects with the DOM completely unchanged between the two calls, so
  // comparing "did the DOM content change" can't tell that apart from a
  // genuine navigation; comparing the route can.
  const lastCollectedPathname = useRef<string | null>(null)

  useEffect(() => {
    lastActive.current = -1
    setVisible(false)
    // Clear immediately so the previous page's dots never flash on the new
    // page while it's mounting.
    setSections([])

    const collect = () => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>('main section[data-nav-label]'))
      if (nodes.length === 0) return false
      setSections(nodes.map((el) => ({ id: el.id, label: el.dataset.navLabel ?? '' })))
      lastCollectedPathname.current = location.pathname
      return true
    }

    // First mount (or StrictMode's synthetic re-invoke of that same first
    // mount) — no previous route to be confused with, so the DOM already
    // reflects the right page and a synchronous read is safe.
    const isGenuineNavigation =
      lastCollectedPathname.current !== null && lastCollectedPathname.current !== location.pathname
    if (!isGenuineNavigation && collect()) return

    // Genuine client-side navigation: PageTransition/AnimatePresence
    // (mode="wait") keeps the OUTGOING page mounted through its ~0.5s exit
    // animation before the incoming page replaces it, so a synchronous
    // query here would still find the *old* page's sections. Wait for the
    // new page to actually mount instead of assuming any fixed delay.
    const mainEl = document.querySelector('main')
    if (!mainEl) return
    const observer = new MutationObserver(() => {
      if (collect()) observer.disconnect()
    })
    observer.observe(mainEl, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    if (sections.length === 0) return
    let raf = 0
    // Only the home page has a real full-bleed hero to scroll past before
    // the nav appears; every other page shows it right away.
    const isHome = location.pathname === '/'
    const heroEl = isHome ? document.querySelector<HTMLElement>('main section') : null

    const update = () => {
      raf = 0
      const scrollY = window.scrollY
      const vh = window.innerHeight
      if (isHome) {
        const heroHeight = heroEl?.offsetHeight ?? 0
        setVisible(scrollY > heroHeight - HERO_OFFSET)
      } else {
        setVisible(true)
      }

      const probe = scrollY + vh * 0.4
      let idx = 0
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id)
        if (el && el.offsetTop <= probe) idx = i
      })
      setActiveIndex(idx)
    }

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [sections, location.pathname])

  useEffect(() => {
    if (sections.length === 0) return
    const name = sections[activeIndex]?.label ?? ''

    if (lastActive.current === -1) {
      setLabelText(name)
      lastActive.current = activeIndex
      return
    }
    if (lastActive.current === activeIndex) return

    lastActive.current = activeIndex
    setLabelOpacity(0)
    const t = window.setTimeout(() => {
      setLabelText(name)
      setLabelOpacity(1)
    }, 180)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, sections.length])

  if (sections.length === 0) return null

  const n = sections.length
  const lastDotY = START_Y + (n - 1) * SPACING
  const svgHeight = lastDotY + 36
  const lineY1 = START_Y - 24
  const lineY2 = lastDotY + 30
  const activeY = START_Y + activeIndex * SPACING

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      className="fixed right-[-13px] top-1/2 z-[90] hidden -translate-y-1/2 gap-2 lg:flex"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.6s ease',
      }}
    >
      <svg width={32} height={svgHeight} style={{ overflow: 'visible', display: 'block' }}>
        <line
          x1={CX}
          y1={lineY1}
          x2={CX}
          y2={lineY2}
          stroke={GOLD}
          strokeWidth={0.6}
          opacity={0.5}
          strokeDasharray="1.5 5"
          className="home-nav-flow"
        />
        <circle cx={CX} cy={START_Y - 24} r={1.5} fill={GOLD} opacity={0.6} />
        <circle cx={CX} cy={START_Y - 16} r={1} fill={GOLD} opacity={0.4} />

        {RING_ANGLES.map((angle, i) => (
          <circle
            key={i}
            cx={CX + Math.cos(angle) * RING_RADIUS}
            cy={activeY + Math.sin(angle) * RING_RADIUS}
            r={0.85}
            fill={GOLD}
            className="home-nav-ring-dot"
            style={{ animationDelay: `${i * 0.08}s` }}
          />
        ))}

        {sections.map((s, i) => {
          const active = i === activeIndex
          return (
            <circle
              key={s.id}
              cx={CX}
              cy={START_Y + i * SPACING}
              r={active ? 4.8 : 3.6}
              fill={active ? GOLD : DOT_INACTIVE}
              className={active ? 'home-nav-dot home-nav-dot-active' : 'home-nav-dot'}
              style={{ cursor: 'pointer' }}
              onClick={() => scrollToSection(s.id)}
            >
              <title>{s.label}</title>
            </circle>
          )
        })}

        <circle cx={CX} cy={lastDotY + 22} r={1.5} fill={GOLD} opacity={0.6} />
        <circle cx={CX} cy={lastDotY + 30} r={1} fill={GOLD} opacity={0.4} />
      </svg>

      <div style={{ position: 'relative', width: 70, height: svgHeight }}>
        <span
          className="absolute left-0 whitespace-nowrap text-[10px] uppercase"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            letterSpacing: '3px',
            color: GOLD,
            top: activeY - 34,
            opacity: labelOpacity,
            transition: 'top 0.5s cubic-bezier(.4,0,.2,1), opacity 0.25s ease',
          }}
        >
          {labelText}
        </span>
      </div>
    </div>
  )
}
