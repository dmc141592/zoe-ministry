import { AnimatePresence, animate, motion, useInView, useReducedMotion } from 'framer-motion'
import {
  ChartLine,
  ChevronLeft,
  ChevronRight,
  HouseHeart,
  Landmark,
  Mic2,
  Palette,
  School,
} from 'lucide-react'
import { useEffect, useRef, useState, type ComponentType, type KeyboardEvent } from 'react'
import { sevenMountains, type MountainIcon } from '@/data/vision'
import { cn } from '@/lib/utils'
import { smoothPath } from '@/lib/smoothPath'

export type IconComponent = ComponentType<{ className?: string; strokeWidth?: number }>

/**
 * lucide-react's "Cross" renders an even-armed plus sign, not a Latin cross —
 * this draws a proper cross silhouette (long vertical beam, crossbar in the
 * upper third) instead.
 */
export function LatinCrossIcon({ className }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M10.4 2h3.2v5h6.4v3h-6.4v12h-3.2v-12H4v-3h6.4z" />
    </svg>
  )
}

export const ICONS: Record<MountainIcon, IconComponent> = {
  landmark: Landmark,
  'chart-line': ChartLine,
  school: School,
  'house-heart': HouseHeart,
  cross: LatinCrossIcon,
  palette: Palette,
  'mic-2': Mic2,
}

const N = sevenMountains.length
const PEAK_X = [42, 144, 246, 348, 450, 552, 654]
const AMP_BASE = sevenMountains.map((m) => m.amplitude)

const BASELINE = 178
const SIGMA = 24
const SIGMA_POW = Math.pow(SIGMA, 1.85)
const VIEW_WIDTH = 696
const VIEW_HEIGHT = 214
const LINE_COUNT = 20
const ACTIVE_BOOST = 26
const NEIGHBOR_DROP = 12
const MORPH_DURATION = 480

const SAMPLE_XS: number[] = []
for (let x = 0; x <= VIEW_WIDTH; x += 6) SAMPLE_XS.push(x)

interface LineConfig {
  baseOffset: number
  ampFactor: number
  opacity: number
  phase: number
  color: string
  strokeWidth: number
}

const LINES: LineConfig[] = Array.from({ length: LINE_COUNT }, (_, i) => ({
  baseOffset: i * 1.1,
  ampFactor: 1 - i * 0.03,
  opacity: Math.max(0.82 - i * 0.03, 0.16),
  phase: i * 0.9,
  color: i % 3 === 1 ? 'var(--color-gold-300)' : 'var(--color-gold-600)',
  strokeWidth: i === 0 ? 1.4 : 1,
}))

// Only the seven real peaks feed the height function — this is the exact
// geometry the hit-zones, labels and nav below are aligned to, and it's also
// what the wide decorative sampling below reuses unchanged.
function heightAt(x: number, amps: number[]) {
  let y = 0
  for (let j = 0; j < N; j++) {
    const d = Math.abs(x - PEAK_X[j])
    y += amps[j] * Math.exp(-Math.pow(d, 1.85) / (2 * SIGMA_POW))
  }
  return y
}

function computePath(line: LineConfig, amps: number[], sampleXs: number[]) {
  const points = sampleXs.map((x) => {
    const h = heightAt(x, amps)
    const wobble = Math.sin(x * 0.09 + line.phase) * 2.2 + Math.sin(x * 0.035 + line.phase * 1.7) * 1.4
    return { x, y: BASELINE + line.baseOffset - h * line.ampFactor + wobble }
  })
  return smoothPath(points)
}

const pathFor = (line: LineConfig, amps: number[]) => computePath(line, amps, SAMPLE_XS)

function targetAmps(index: number) {
  return AMP_BASE.map((a, j) => {
    if (j === index) return a + ACTIVE_BOOST
    if (Math.abs(j - index) === 1) return a - NEIGHBOR_DROP
    return a
  })
}

export function SevenMountains() {
  const [activeIndex, setActiveIndex] = useState(3)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const [amps, setAmps] = useState<number[]>(() => (shouldReduceMotion ? targetAmps(3) : AMP_BASE.map(() => 0)))
  const [moonX, setMoonX] = useState(PEAK_X[3])
  const ampsRef = useRef(amps)
  const moonXRef = useRef(moonX)
  const frameRef = useRef<number | null>(null)
  const growControlsRef = useRef<ReturnType<typeof animate> | null>(null)
  const hasGrownRef = useRef(false)
  const rangeRef = useRef<SVGSVGElement>(null)
  const isRangeInView = useInView(rangeRef, { once: true, margin: '-10% 0px -10% 0px' })

  // "Grow in" once, the first time the range scrolls into view: amplitudes
  // rise from a flat line up to their resting (active-boosted) values, using
  // the same duration/easing as the rest of the site's <Reveal> animations.
  useEffect(() => {
    if (!isRangeInView || hasGrownRef.current || shouldReduceMotion) return
    hasGrownRef.current = true
    const toAmps = targetAmps(activeIndex)
    const fromAmps = AMP_BASE.map(() => 0)
    growControlsRef.current = animate(0, 1, {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (t) => {
        const next = fromAmps.map((f, j) => f + (toAmps[j] - f) * t)
        ampsRef.current = next
        setAmps(next)
      },
    })
    return () => growControlsRef.current?.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRangeInView])

  function select(index: number) {
    if (index === activeIndex) return
    growControlsRef.current?.stop()
    const fromAmps = ampsRef.current
    const fromMoonX = moonXRef.current
    const toAmps = targetAmps(index)
    const toMoonX = PEAK_X[index]

    setActiveIndex(index)

    if (shouldReduceMotion) {
      ampsRef.current = toAmps
      moonXRef.current = toMoonX
      setAmps(toAmps)
      setMoonX(toMoonX)
      return
    }

    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / MORPH_DURATION)
      const eased = 1 - Math.pow(1 - t, 3)
      const nextAmps = fromAmps.map((f, j) => f + (toAmps[j] - f) * eased)
      const nextMoonX = fromMoonX + (toMoonX - fromMoonX) * eased
      ampsRef.current = nextAmps
      moonXRef.current = nextMoonX
      setAmps(nextAmps)
      setMoonX(nextMoonX)
      frameRef.current = t < 1 ? requestAnimationFrame(tick) : null
    }
    frameRef.current = requestAnimationFrame(tick)
  }

  function nav(dir: 1 | -1) {
    select((activeIndex + dir + N) % N)
  }

  function activateKey(index: number) {
    return (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        select(index)
      }
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      nav(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      nav(-1)
    }
  }

  const active = sevenMountains[activeIndex]
  const ActiveIcon = ICONS[active.icon]
  const moonY = BASELINE - amps[activeIndex] - 34
  const cardTransition = { duration: shouldReduceMotion ? 0 : 0.32, ease: [0.4, 0, 0.2, 1] as const }

  return (
    <div onKeyDown={handleKeyDown}>
      <p className="sr-only">
        Interaktive Übersicht der sieben Berge des gesellschaftlichen Einflusses:{' '}
        {sevenMountains.map((m) => m.titleDe).join(', ')}. Wählen Sie einen Berg aus, um seine
        Beschreibung zu lesen.
      </p>

      {/* Interactive content column — same standard content width as the rest of the
          page/site, so labels, hit-zones and the card stay aligned with everything else. */}
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          <svg
            ref={rangeRef}
            viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
            className="relative block h-auto w-full overflow-visible"
          >
            {LINES.map((line, i) => (
              <path
                key={i}
                d={pathFor(line, amps)}
                fill="none"
                stroke={line.color}
                strokeWidth={line.strokeWidth}
                strokeLinejoin="round"
                strokeLinecap="round"
                style={{ opacity: line.opacity }}
              />
            ))}

            <circle cx={moonX} cy={moonY} r={34} fill="var(--color-gold-400)" opacity={0.1} />
            <circle cx={moonX} cy={moonY} r={20} fill="var(--color-gold-400)" opacity={0.16} />
            <circle cx={moonX} cy={moonY} r={9} fill="var(--color-gold-400)" />

            {sevenMountains.map((m, k) => (
              <rect
                key={m.key}
                x={PEAK_X[k] - 48}
                y={0}
                width={96}
                height={VIEW_HEIGHT}
                fill="var(--color-gold-400)"
                style={{ opacity: hoverIndex === k ? 0.045 : 0, transition: 'opacity 250ms ease' }}
                role="button"
                tabIndex={0}
                aria-label={`Berg ${m.titleDe} auswählen`}
                aria-pressed={k === activeIndex}
                className="cursor-pointer outline-none"
                onClick={() => select(k)}
                onKeyDown={activateKey(k)}
                onMouseEnter={() => setHoverIndex(k)}
                onMouseLeave={() => setHoverIndex((h) => (h === k ? null : h))}
                onFocus={() => setHoverIndex(k)}
                onBlur={() => setHoverIndex((h) => (h === k ? null : h))}
              />
            ))}
          </svg>
        </div>

        {/*
          Labels are plain HTML, not SVG <text>, on purpose: the svg's viewBox scales
          down on narrow screens (width:100% / height:auto), which would shrink
          font-size:11 well below legible size on mobile. Rendering them here keeps
          the exact desktop position (directly under the range) while staying readable
          at every width, without affecting any of the mountain-chain geometry above.

          Desktop (sm+): each label is absolutely positioned at PEAK_X[k] / VIEW_WIDTH
          — the exact same peakX array and the exact same viewBox width used by the
          hit-zones and the sun's target position above. There is only this one source
          of truth for each mountain's x position, so a label can never drift out of
          alignment with its peak again.

          Mobile (below sm): peak-to-peak spacing gets too tight for the longer labels
          ("Kunst & Unterhaltung") to sit under their own peak without overlapping
          their neighbours, so a plain 4-column reading-order grid is used instead —
          deliberately not position-matched there.
        */}
        <div className="relative mt-1 hidden h-8 sm:block">
          {sevenMountains.map((m, k) => (
            <button
              key={m.key}
              type="button"
              onClick={() => select(k)}
              aria-label={`Berg ${m.titleDe} auswählen`}
              aria-pressed={k === activeIndex}
              style={{ left: `${(PEAK_X[k] / VIEW_WIDTH) * 100}%`, width: `${(102 / VIEW_WIDTH) * 100}%` }}
              className={cn(
                'absolute top-0 -translate-x-1/2 px-1 text-center text-[11px] leading-tight transition-colors duration-300',
                k === activeIndex ? 'text-gold-500' : 'text-ink/55 hover:text-ink/75',
              )}
            >
              {m.titleDe}
            </button>
          ))}
        </div>

        <div className="mt-1 grid grid-cols-4 gap-x-2 gap-y-2 sm:hidden">
          {sevenMountains.map((m, k) => (
            <button
              key={m.key}
              type="button"
              onClick={() => select(k)}
              aria-label={`Berg ${m.titleDe} auswählen`}
              aria-pressed={k === activeIndex}
              className={cn(
                'min-h-11 px-1 py-1 text-center text-[11px] leading-tight transition-colors duration-300',
                k === activeIndex ? 'text-gold-500' : 'text-ink/55 hover:text-ink/75',
              )}
            >
              {m.titleDe}
            </button>
          ))}
        </div>

        <div className="my-5 flex items-center justify-center gap-1.5">
          <button
            type="button"
            aria-label="Vorheriger Berg"
            onClick={() => nav(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-gold-500 hover:text-gold-500"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>

          <div className="flex items-center gap-[7px] px-1.5">
            {sevenMountains.map((m, k) => (
              <button
                key={m.key}
                type="button"
                aria-label={m.titleDe}
                aria-current={k === activeIndex}
                onClick={() => select(k)}
                className={cn(
                  'h-[7px] w-[7px] rounded-full transition-all duration-300',
                  k === activeIndex ? 'scale-[1.3] bg-gold-400' : 'bg-ink/20 hover:scale-125 hover:bg-ink/40',
                )}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Nächster Berg"
            onClick={() => nav(1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-gold-500 hover:text-gold-500"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={cardTransition}
              className="min-h-[200px] rounded-xl border border-ink/8 bg-cream-50 p-6 shadow-soft"
            >
              <div className="mb-3.5 flex items-center gap-2.5">
                <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-gold-400/14 text-gold-500">
                  <ActiveIcon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="m-0 font-display text-[22px] text-ink">{active.titleEn}</p>
                  <p className="m-0 mt-0.5 text-xs tracking-[0.05em] text-gold-500">{active.titleDe}</p>
                </div>
              </div>
              <p className="m-0 text-sm leading-[1.75] text-ink-soft">{active.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
