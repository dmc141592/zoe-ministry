import { motion } from 'framer-motion'
import { locations } from '@/data/site'

// Switzerland outline traced from reference/SwissMap.png — decorative, not for navigation.
const OUTLINE =
  'M395.7,131.8 L385.3,120.1 L367.1,140.9 L346.3,131.8 L341.1,117.5 L313.8,112.3 L311.2,96.7 L326.8,73.3 L322.9,61.6 L283.9,36.9 L265.7,38.2 L235.8,20.0 L222.8,31.7 L231.9,42.1 L228.0,48.6 L204.6,42.1 L190.3,51.2 L164.3,52.5 L160.4,44.7 L138.3,68.1 L109.7,56.4 L99.3,75.9 L112.3,81.1 L62.9,129.2 L61.6,152.6 L33.0,172.1 L29.1,187.7 L35.6,203.3 L31.7,216.3 L20.0,222.8 L22.6,230.6 L36.9,230.6 L48.6,218.9 L44.7,211.1 L52.5,200.7 L82.4,191.6 L91.5,199.4 L87.6,231.9 L112.3,264.4 L124.0,268.3 L157.8,254.0 L177.3,263.1 L183.8,252.7 L192.9,252.7 L204.6,230.6 L199.4,217.6 L225.4,194.2 L228.0,221.5 L243.6,238.4 L257.9,242.3 L255.3,251.4 L276.1,280.0 L282.6,264.4 L276.1,246.2 L295.6,217.6 L299.5,186.4 L309.9,187.7 L319.0,211.1 L351.5,203.3 L354.1,213.7 L368.4,221.5 L369.7,194.2 L360.6,181.2 L367.1,169.5 L385.3,179.9 L395.7,174.7 L387.9,163.0 Z'

const markers = [
  { id: 'luterbach', x: 160, y: 80, label: 'Solothurn' },
  { id: 'bachenbuelach', x: 240, y: 65, label: 'Zürich' },
]

// Straight-line distance in SVG user units — used as the literal stroke-dasharray/dashoffset
// length for the line-draw effect (classic technique, not framer-motion's normalized pathLength).
const LINE_LENGTH = Math.hypot(markers[1].x - markers[0].x, markers[1].y - markers[0].y)

export function SwissMap() {
  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <svg viewBox="0 0 500 300" className="w-full" aria-hidden>
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
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
          strokeWidth={1.25}
          strokeLinejoin="round"
        />

        <motion.line
          x1={markers[0].x}
          y1={markers[0].y}
          x2={markers[1].x}
          y2={markers[1].y}
          stroke="#c9a24c"
          strokeWidth={1.25}
          strokeDasharray={LINE_LENGTH}
          initial={{ strokeDashoffset: LINE_LENGTH, opacity: 0.8 }}
          whileInView={{ strokeDashoffset: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
        />

        {markers.map((marker, i) => {
          const location = locations.find((loc) => loc.id === marker.id)
          return (
            <a
              key={marker.id}
              href={location?.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer"
            >
              <circle
                cx={marker.x}
                cy={marker.y}
                r={9}
                fill="rgba(201,162,76,0.18)"
                filter="url(#glow)"
                className="map-pulse"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
              <circle
                cx={marker.x}
                cy={marker.y}
                r={4}
                fill="#ecd28f"
                className="transition-transform duration-200 group-hover:scale-125"
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              />
              <text
                x={marker.x}
                y={marker.y - 16}
                textAnchor="middle"
                className="fill-ivory transition-opacity duration-200 group-hover:fill-gold-bright group-hover:opacity-100"
                style={{ fontSize: 11, letterSpacing: '0.08em', fontFamily: 'Inter, sans-serif' }}
              >
                {marker.label}
              </text>
            </a>
          )
        })}
      </svg>
    </div>
  )
}
