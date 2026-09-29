import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { locationAnchor, locations } from '@/data/site'

// Switzerland outline traced from reference/SwissMap.png — decorative, not for navigation.
const OUTLINE =
  'M395.7,131.8 L385.3,120.1 L367.1,140.9 L346.3,131.8 L341.1,117.5 L313.8,112.3 L311.2,96.7 L326.8,73.3 L322.9,61.6 L283.9,36.9 L265.7,38.2 L235.8,20.0 L222.8,31.7 L231.9,42.1 L228.0,48.6 L204.6,42.1 L190.3,51.2 L164.3,52.5 L160.4,44.7 L138.3,68.1 L109.7,56.4 L99.3,75.9 L112.3,81.1 L62.9,129.2 L61.6,152.6 L33.0,172.1 L29.1,187.7 L35.6,203.3 L31.7,216.3 L20.0,222.8 L22.6,230.6 L36.9,230.6 L48.6,218.9 L44.7,211.1 L52.5,200.7 L82.4,191.6 L91.5,199.4 L87.6,231.9 L112.3,264.4 L124.0,268.3 L157.8,254.0 L177.3,263.1 L183.8,252.7 L192.9,252.7 L204.6,230.6 L199.4,217.6 L225.4,194.2 L228.0,221.5 L243.6,238.4 L257.9,242.3 L255.3,251.4 L276.1,280.0 L282.6,264.4 L276.1,246.2 L295.6,217.6 L299.5,186.4 L309.9,187.7 L319.0,211.1 L351.5,203.3 L354.1,213.7 L368.4,221.5 L369.7,194.2 L360.6,181.2 L367.1,169.5 L385.3,179.9 L395.7,174.7 L387.9,163.0 Z'

// Ausschnitt eng um den Umriss (x 20–396, y 20–280), damit die Schweiz grösser dargestellt wird.
const VIEWBOX = { x: 10, y: 10, width: 396, height: 280 }

// Die Karte wird grösser gerendert (max-w-5xl + engerer Ausschnitt statt max-w-3xl mit 500er-viewBox).
// Punkte, Linien und Beschriftungen werden mit diesem Faktor skaliert, damit sie auf dem Bildschirm
// gleich gross bleiben wie vorher.
const SCALE = 768 / 500 / (1024 / VIEWBOX.width)

type MarkerKind = 'main' | 'partner' | 'regional'
type LabelPos = 'top' | 'bottom' | 'left'

type Marker = {
  id: string
  x: number
  y: number
  label: string
  kind: MarkerKind
  labelPos: LabelPos
  href: string
}

const [mainLocation, partnerChurch] = locations
// Klick auf einen Punkt scrollt zur passenden Karte unten auf der Connect-Seite (dort gibt's Route/Termine).
const cardUrl = (id: string) => `/connect#${locationAnchor(id)}`

const hub: Marker = {
  id: mainLocation.id, x: 155.6, y: 87.3, label: 'Solothurn', kind: 'main', labelPos: 'left',
  href: cardUrl(mainLocation.id),
}

// Alle Linien gehen vom Hauptstandort (Solothurn) aus.
const spokes: Marker[] = [
  {
    id: partnerChurch.id, x: 240, y: 65, label: 'Zürich', kind: 'partner', labelPos: 'top',
    href: cardUrl('regional'),
  },
  {
    id: 'basel', x: 156, y: 54, label: 'Basel', kind: 'regional', labelPos: 'top',
    href: cardUrl('regional'),
  },
  {
    id: 'interlaken', x: 185.8, y: 166, label: 'Interlaken', kind: 'regional', labelPos: 'bottom',
    href: cardUrl('regional'),
  },
]

const markers = [hub, ...spokes]

const GOLD = '#c9a24c'
const WHITE = '#ffffff'

const markerStyle: Record<MarkerKind, { r: number; halo: number; fill: string; haloFill: string }> = {
  // r/halo je +1mm (1mm ≈ 2.46 Einheiten vor SCALE bei voller Kartenbreite).
  main: { r: 6.46, halo: 11.46, fill: '#ecd28f', haloFill: 'rgba(201,162,76,0.18)' },
  partner: { r: 2.75, halo: 6.25, fill: '#ecd28f', haloFill: 'rgba(201,162,76,0.18)' },
  regional: { r: 2.75, halo: 6.25, fill: WHITE, haloFill: 'rgba(255,255,255,0.18)' },
}

const FONT_SIZE = 11 * SCALE

// Lichtpuls auf den Linien: alle 5 s, abwechselnd alle gleichzeitig Richtung Solothurn und
// von Solothurn weg. Ein Zyklus = 10 s (einmal hinein, einmal hinaus).
const PULSE_CYCLE = 10
const PULSE_TRAVEL = 1.5
const PULSE_START = 0.6 + 1.2 // erst nachdem die Linien fertig gezeichnet sind
const t = PULSE_TRAVEL / PULSE_CYCLE
const fade = t * 0.2
// Position: hinein (0 → t), warten, hinaus (0.5 → 0.5 + t), warten.
const PULSE_POS_TIMES = [0, t, 0.5, 0.5 + t, 1]
// Sichtbar nur während der Bewegung, mit kurzem Ein-/Ausblenden an den Enden.
const PULSE_OPACITY_TIMES = [0, fade, t - fade, t, 0.5, 0.5 + fade, 0.5 + t - fade, 0.5 + t, 1]
const PULSE_OPACITY = [0, 1, 1, 0, 0, 1, 1, 0, 0]

function labelProps(m: Marker, r: number) {
  const gap = 12 * SCALE
  switch (m.labelPos) {
    case 'left':
      return { x: m.x - r * SCALE - gap * 0.6, y: m.y + FONT_SIZE * 0.35, textAnchor: 'end' as const }
    case 'bottom':
      return { x: m.x, y: m.y + gap + FONT_SIZE * 0.7, textAnchor: 'middle' as const }
    default:
      return { x: m.x, y: m.y - gap - FONT_SIZE * 0.35, textAnchor: 'middle' as const }
  }
}

export function SwissMap() {
  // Ein gemeinsamer Sichtbarkeits-Trigger für die ganze Karte. Mit whileInView pro Element wurde
  // jedes Element einzeln beobachtet — tiefer liegende (Interlaken) starteten dadurch später.
  const svgRef = useRef<SVGSVGElement>(null)
  const inView = useInView(svgRef, { once: true, amount: 0.5 })

  // data-shooting-stars-avoid: Sternschnuppen im Hintergrund fliegen nur um die Karte herum.
  return (
    <div data-shooting-stars-avoid className="relative mx-auto w-full max-w-5xl">
      <svg
        ref={svgRef}
        viewBox={`${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.width} ${VIEWBOX.height}`}
        className="w-full"
        aria-hidden
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={4 * SCALE} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d={OUTLINE}
          fill="rgba(201,162,76,0.05)"
          stroke="rgba(201,162,76,0.35)"
          strokeWidth={1.25 * SCALE}
          strokeLinejoin="round"
        />

        {spokes.map((spoke) => {
          // Straight-line distance in SVG user units — used as the literal stroke-dasharray/dashoffset
          // length for the line-draw effect (classic technique, not framer-motion's normalized pathLength).
          const length = Math.hypot(spoke.x - hub.x, spoke.y - hub.y)
          return (
            <motion.line
              key={spoke.id}
              x1={hub.x}
              y1={hub.y}
              x2={spoke.x}
              y2={spoke.y}
              stroke={spoke.kind === 'partner' ? GOLD : WHITE}
              strokeWidth={1.25 * SCALE}
              strokeDasharray={length}
              initial={{ strokeDashoffset: length, opacity: 0.8 }}
              animate={inView ? { strokeDashoffset: 0 } : undefined}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
            />
          )
        })}

        {spokes.map((spoke) => {
          const repeat = { duration: PULSE_CYCLE, repeat: Infinity, delay: PULSE_START }
          return (
            <motion.circle
              key={`pulse-${spoke.id}`}
              r={2 * SCALE}
              fill={spoke.kind === 'partner' ? GOLD : WHITE}
              filter="url(#glow)"
              initial={{ cx: spoke.x, cy: spoke.y, opacity: 0 }}
              animate={
                inView
                  ? {
                      cx: [spoke.x, hub.x, hub.x, spoke.x, spoke.x],
                      cy: [spoke.y, hub.y, hub.y, spoke.y, spoke.y],
                      opacity: PULSE_OPACITY,
                    }
                  : undefined
              }
              transition={{
                cx: { ...repeat, times: PULSE_POS_TIMES, ease: 'easeInOut' },
                cy: { ...repeat, times: PULSE_POS_TIMES, ease: 'easeInOut' },
                opacity: { ...repeat, times: PULSE_OPACITY_TIMES, ease: 'linear' },
              }}
            />
          )
        })}

        {markers.map((marker, i) => {
          const style = markerStyle[marker.kind]
          const content = (
            <>
              <circle
                cx={marker.x}
                cy={marker.y}
                r={style.halo * SCALE}
                fill={style.haloFill}
                filter="url(#glow)"
                className="map-pulse"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
              <circle
                cx={marker.x}
                cy={marker.y}
                r={style.r * SCALE}
                fill={style.fill}
                className="transition-transform duration-200 group-hover:scale-125"
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              />
              <text
                {...labelProps(marker, style.r)}
                className="fill-ivory transition-opacity duration-200 group-hover:fill-gold-bright group-hover:opacity-100"
                style={{ fontSize: FONT_SIZE, letterSpacing: '0.08em', fontFamily: 'Inter, sans-serif' }}
              >
                {marker.label}
              </text>
            </>
          )
          return (
            <Link key={marker.id} to={marker.href} className="group cursor-pointer">
              {content}
            </Link>
          )
        })}
      </svg>
    </div>
  )
}
