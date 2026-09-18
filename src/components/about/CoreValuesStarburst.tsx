import { useEffect, useRef } from 'react'

const SVG_NS = 'http://www.w3.org/2000/svg'
const CX = 500
const CY = 500

const PAGE_BG = '#F7F1E4'
const LIGHT_GOLD = '#E8C77A'
const DARK_GOLD = '#9E8330'
const MID_GOLD = '#C9A227'
const SUN_LINE = '#C9A227'
const CROSS_GOLD = '#B8892F'
const TITLE_GOLD = '#8A6D1E'
const SHADE_1 = '#E8C77A'
const SHADE_2 = '#F2DCA0'

interface ValueDef {
  title: string
  angle: number
  lines: [string, string, string]
}

const VALUES: ValueDef[] = [
  {
    title: 'Verbindlich',
    angle: 15,
    lines: [
      'Anvertraute Geschichten als heiligen Boden bewahren.',
      'Scham, Angst und Unsicherheit entgegentreten.',
      'Verletzlichkeit erlauben und Verbindlichkeit fördern.',
    ],
  },
  {
    title: 'Gegenwart',
    angle: 60,
    lines: [
      'Sensibel sein für Gottes Stimme.',
      'Bewusst Zeit für Gebet nehmen und über die Schrift meditieren.',
      'Gegenwart Gottes in herausfordernden Zeiten wahrnehmen und darin wandeln.',
    ],
  },
  {
    title: 'Ehre',
    angle: 115,
    lines: [
      'Empfangen durch Wertschätzen und Ehren von Menschen und Situationen.',
      'Die Haltung der Ehre während Konfrontation und Meinungsverschiedenheit bewahren.',
      'Kultur der Ehre während der Abwesenheit von Personen ausleben.',
    ],
  },
  {
    title: 'Grosszügigkeit',
    angle: 160,
    lines: [
      'Grosszügigkeit im Denken und in der Interpretation der Absichten anderer zeigen.',
      'Finanziell grosszügig sein im Hinblick auf die Vision vom Königreich Gottes.',
      'Gegenüber den Bedürfnissen anderer grosszügig sein.',
    ],
  },
  {
    title: 'Vermächtnis',
    angle: 205,
    lines: [
      'Entscheidungen treffen, welche die kommenden Generationen mit Segen beeinflussen.',
      'Täglich das volle Potenzial ausschöpfen und nach Exzellenz streben.',
      'Persönliche Erfolge in gesellschaftliche Durchbrüche verwandeln.',
    ],
  },
  {
    title: 'Übernatürliches',
    angle: 250,
    lines: [
      'Bewusst leben und stets eine übernatürliche Lösung erwarten.',
      'Authentisch sein in den Geschichten, die wir erzählen.',
      'Mit Weisheit und Kraft voranschreiten.',
    ],
  },
  {
    title: 'Freiheit',
    angle: 305,
    lines: [
      'Frei «Ja» oder «Nein» sagen und dazu stehen.',
      'Frei, um die Liebe zueinander aufrechtzuerhalten in allen Situationen.',
      'Frei, Neues erkunden, Risiken eingehen, Konsequenzen annehmen und korrigieren.',
    ],
  },
]

const REST_R = 46
const EXPANDED_R = 230
const BADGE_R = 68
const BACKDROP_R = BADGE_R + 30
const RAY_START = REST_R + 4
const LINE_GAP = 41

const RING_DEFS = [
  { rOff: 26, a0: -18, a1: 202, color: SHADE_1, width: 2.7 },
  { rOff: 17, a0: 32, a1: 268, color: SHADE_2, width: 1.4 },
  { rOff: 22, a0: 248, a1: 336, color: SHADE_1, width: 1.7 },
]

const CYCLE_PATTERN = [
  { type: 'solid', color: 'light', lenBase: 0.92 },
  { type: 'dashed', color: 'dark', lenBase: 0.62 },
  { type: 'dotted', color: 'light', lenBase: 0.34 },
  { type: 'solid', color: 'dark', lenBase: 0.78 },
  { type: 'dashed', color: 'light', lenBase: 0.55 },
  { type: 'dotted', color: 'light', lenBase: 0.3 },
] as const

const EXTRA_TARGETS = [282, 295, 241, 124, 51, 24]

function seeded(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}
function pt(angleDeg: number, radius: number) {
  const a = (angleDeg * Math.PI) / 180
  return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) }
}
function polarAt(px: number, py: number, radius: number, deg: number) {
  const a = (deg * Math.PI) / 180
  return { x: px + radius * Math.cos(a), y: py + radius * Math.sin(a) }
}
function arcPathAt(px: number, py: number, radius: number, a0: number, a1: number) {
  const s = polarAt(px, py, radius, a0)
  const e = polarAt(px, py, radius, a1)
  const large = ((a1 - a0 + 360) % 360) > 180 ? 1 : 0
  return ['M', s.x, s.y, 'A', radius, radius, 0, large, 1, e.x, e.y].join(' ')
}
function angDist(a: number, b: number) {
  const d = Math.abs(a - b) % 360
  return d > 180 ? 360 - d : d
}
function norm(a: number) {
  return ((a % 360) + 360) % 360
}

interface DecorRay {
  angle: number
  baseLen: number
  dashed: boolean
  dotted: boolean
  color: string
  width: number
  phase: number
  speed: number
}

/**
 * Interactive "starburst" Core Values visualization. Ported ~1:1 from the
 * provided reference (imperative SVG built via refs + a single rAF loop,
 * matching its exact math/timings) rather than re-derived through React
 * state, since the reference's fidelity is the whole point here.
 */
export function CoreValuesStarburst() {
  const bgGlowRef = useRef<SVGCircleElement>(null)
  const raysGroupRef = useRef<SVGGElement>(null)
  const crossGroupRef = useRef<SVGGElement>(null)
  const centerCircleRef = useRef<SVGCircleElement>(null)
  const centerTextGroupRef = useRef<SVGGElement>(null)
  const valuesGroupRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const bgGlowEl = bgGlowRef.current
    const raysGroup = raysGroupRef.current
    const crossGroup = crossGroupRef.current
    const centerCircleEl = centerCircleRef.current
    const centerTextGroup = centerTextGroupRef.current
    const valuesGroup = valuesGroupRef.current
    if (!bgGlowEl || !raysGroup || !crossGroup || !centerCircleEl || !centerTextGroup || !valuesGroup) return

    bgGlowEl.setAttribute('r', '380')

    const excludedAngles = VALUES.map((v) => v.angle).concat([0, 90, 180, 270])
    const minDist = 8

    const decorRays: DecorRay[] = []
    const gridStep = 4
    let slotIdx = 0
    for (let deg = 0; deg < 360; deg += gridStep) {
      const minToExcluded = Math.min(...excludedAngles.map((e) => angDist(deg, e)))
      if (minToExcluded < minDist) continue

      const forced = minToExcluded < 16
      const p = forced ? { type: 'solid' as const, color: 'light' as const, lenBase: 0.85 } : CYCLE_PATTERN[slotIdx % CYCLE_PATTERN.length]

      let colorHex: string
      if (p.color === 'light') colorHex = LIGHT_GOLD
      else if (p.type === 'dashed') colorHex = MID_GOLD
      else colorHex = DARK_GOLD

      const baseLen = 340 * p.lenBase * (0.92 + 0.08 * Math.sin(slotIdx * 0.7))

      decorRays.push({
        angle: deg,
        baseLen,
        dashed: p.type === 'dashed',
        dotted: p.type === 'dotted',
        color: colorHex,
        width: p.type === 'dotted' ? 1.7 : 1.5,
        phase: slotIdx * 0.6,
        speed: 0.45,
      })
      slotIdx++
    }

    function isClearSpot(x: number) {
      const clearExcl = excludedAngles.every((e) => angDist(x, e) >= 8)
      const clearRays = decorRays.every((r) => angDist(x, r.angle) >= 1.6)
      return clearExcl && clearRays
    }
    function findClearAngle(target: number) {
      if (isClearSpot(target)) return norm(target)
      for (let offset = 0.5; offset <= 25; offset += 0.5) {
        if (isClearSpot(target + offset)) return norm(target + offset)
        if (isClearSpot(target - offset)) return norm(target - offset)
      }
      return norm(target)
    }

    EXTRA_TARGETS.forEach((target, k) => {
      const finalAngle = findClearAngle(target)
      decorRays.push({
        angle: finalAngle,
        baseLen: 90 + seeded(finalAngle * 3.7) * 60,
        dashed: true,
        dotted: true,
        color: LIGHT_GOLD,
        width: 1.8,
        phase: k * 1.1,
        speed: 0,
      })
    })

    const decorEls = decorRays.map((r) => {
      const line = document.createElementNS(SVG_NS, 'line')
      line.setAttribute('stroke', r.color)
      line.setAttribute('stroke-width', String(r.width))
      line.setAttribute('opacity', '0.6')
      if (r.dotted) {
        line.setAttribute('stroke-linecap', 'round')
        const gap = 8 + seeded(r.angle) * 10
        line.setAttribute('stroke-dasharray', '0.6 ' + gap)
      } else if (r.dashed) {
        const seg = 6 + seeded(r.angle) * 14
        line.setAttribute('stroke-dasharray', seg + ' ' + seg * 0.7)
      }
      raysGroup.appendChild(line)
      return line
    })

    const crossArms = [
      { angle: 270, len: 110 },
      { angle: 90, len: 230 },
      { angle: 0, len: 110 },
      { angle: 180, len: 110 },
    ]
    crossArms.forEach((r) => {
      const line = document.createElementNS(SVG_NS, 'line')
      const p1 = pt(r.angle, RAY_START)
      const p2 = pt(r.angle, RAY_START + r.len)
      line.setAttribute('x1', String(p1.x))
      line.setAttribute('y1', String(p1.y))
      line.setAttribute('x2', String(p2.x))
      line.setAttribute('y2', String(p2.y))
      line.setAttribute('stroke', CROSS_GOLD)
      line.setAttribute('stroke-width', '3')
      line.setAttribute('opacity', '1')
      line.setAttribute('stroke-linecap', 'butt')
      crossGroup.appendChild(line)
    })

    const valueEls = VALUES.map((v) => {
      const g = document.createElementNS(SVG_NS, 'g')
      g.setAttribute('class', 'cv-value')
      g.style.cursor = 'pointer'

      const hitLine = document.createElementNS(SVG_NS, 'line')
      hitLine.setAttribute('stroke', 'transparent')
      hitLine.setAttribute('stroke-width', '40')
      g.appendChild(hitLine)

      const line = document.createElementNS(SVG_NS, 'line')
      line.setAttribute('stroke', SUN_LINE)
      line.setAttribute('stroke-width', '2')
      line.setAttribute('opacity', '0.7')
      line.setAttribute('pointer-events', 'none')
      g.appendChild(line)

      const backdrop = document.createElementNS(SVG_NS, 'circle')
      backdrop.setAttribute('r', String(BACKDROP_R))
      backdrop.setAttribute('fill', PAGE_BG)
      g.appendChild(backdrop)

      const rings = RING_DEFS.map((rd) => {
        const arc = document.createElementNS(SVG_NS, 'path')
        arc.setAttribute('fill', 'none')
        arc.setAttribute('stroke', rd.color)
        arc.setAttribute('stroke-width', String(rd.width))
        arc.setAttribute('opacity', '0.8')
        arc.setAttribute('stroke-linecap', 'round')
        g.appendChild(arc)
        return arc
      })

      const circle = document.createElementNS(SVG_NS, 'circle')
      circle.setAttribute('r', String(BADGE_R))
      circle.setAttribute('fill', 'url(#cv-badgeFade)')
      g.appendChild(circle)

      const fontSize = v.title.length > 12 ? 15 : 18
      const text = document.createElementNS(SVG_NS, 'text')
      text.setAttribute('class', 'cv-value-label')
      text.style.pointerEvents = 'none'
      text.setAttribute('text-anchor', 'middle')
      text.setAttribute('fill', TITLE_GOLD)
      text.setAttribute('font-family', "'Playfair Display', serif")
      text.setAttribute('font-weight', '800')
      text.setAttribute('font-size', String(fontSize))
      let tspans: SVGTSpanElement[] = []
      if (v.title.length > 12) {
        const splitPoint = Math.floor(v.title.length / 2)
        const line1 = v.title.slice(0, splitPoint)
        const line2 = v.title.slice(splitPoint)
        const t1 = document.createElementNS(SVG_NS, 'tspan')
        t1.setAttribute('dy', '-0.2em')
        t1.textContent = line1
        const t2 = document.createElementNS(SVG_NS, 'tspan')
        t2.setAttribute('dy', '1.2em')
        t2.textContent = line2
        text.appendChild(t1)
        text.appendChild(t2)
        tspans = [t1, t2]
      } else {
        text.textContent = v.title
        text.setAttribute('dominant-baseline', 'central')
      }
      g.appendChild(text)

      valuesGroup.appendChild(g)
      return { g, hitLine, line, backdrop, circle, rings, text, tspans, angle: v.angle }
    })

    centerCircleEl.setAttribute('r', String(REST_R))

    function buildCenterText() {
      centerTextGroup!.innerHTML = ''
      const title = document.createElementNS(SVG_NS, 'text')
      title.setAttribute('x', String(CX))
      title.setAttribute('y', String(CY - 40))
      title.setAttribute('text-anchor', 'middle')
      title.setAttribute('font-family', "'Playfair Display', serif")
      title.setAttribute('font-weight', '800')
      title.setAttribute('font-size', '28')
      title.setAttribute('fill', TITLE_GOLD)
      centerTextGroup!.appendChild(title)

      const fo = document.createElementNS(SVG_NS, 'foreignObject')
      fo.setAttribute('x', String(CX - 165))
      fo.setAttribute('y', String(CY - 20))
      fo.setAttribute('width', '330')
      fo.setAttribute('height', '160')
      const div = document.createElement('div')
      div.style.fontFamily = "'Helvetica Neue',Arial,sans-serif"
      div.style.fontSize = '13.5px'
      div.style.color = '#7A6530'
      div.style.lineHeight = '1.55'
      div.style.textAlign = 'center'
      fo.appendChild(div)
      centerTextGroup!.appendChild(fo)
      return { title, desc: div }
    }
    const centerTextEls = buildCenterText()
    centerTextGroup.style.transition = 'opacity 0.3s ease'
    centerTextGroup.style.opacity = '0'

    let activeIndex = -1
    const centerAnim = { current: REST_R }
    let tweenGen = 0
    let textGen = 0
    let pendingTextTimeout = 0

    function tweenCenter(target: number) {
      const myGen = ++tweenGen
      const start = centerAnim.current
      const t0 = performance.now()
      const dur = 420
      function tick(now: number) {
        if (myGen !== tweenGen) return
        const t = Math.min(1, (now - t0) / dur)
        const e = 1 - Math.pow(1 - t, 3)
        centerAnim.current = start + (target - start) * e
        centerCircleEl!.setAttribute('r', String(centerAnim.current))
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    function select(i: number) {
      if (activeIndex === i) return
      activeIndex = i
      tweenCenter(EXPANDED_R)
      const myTextGen = ++textGen
      centerTextGroup!.style.opacity = '0'
      window.clearTimeout(pendingTextTimeout)
      pendingTextTimeout = window.setTimeout(() => {
        if (myTextGen !== textGen) return
        centerTextEls.title.textContent = VALUES[i].title
        centerTextEls.desc.innerHTML = VALUES[i].lines.map((l) => '<div style="margin-bottom:5px;">' + l + '</div>').join('')
        centerTextGroup!.style.opacity = '1'
      }, 180)
    }
    function deselect() {
      if (activeIndex === -1) return
      activeIndex = -1
      tweenCenter(REST_R)
      ++textGen
      centerTextGroup!.style.opacity = '0'
    }

    valueEls.forEach((ve, i) => {
      ve.g.addEventListener('mouseenter', () => select(i))
      ve.g.addEventListener('click', () => select(i))
      ve.g.addEventListener('mouseleave', () => deselect())
    })

    decorRays.forEach((r, i) => {
      if (!r.dotted) return
      const p1 = pt(r.angle, RAY_START)
      const p2 = pt(r.angle, RAY_START + r.baseLen)
      const el = decorEls[i]
      el.setAttribute('x1', String(p1.x))
      el.setAttribute('y1', String(p1.y))
      el.setAttribute('x2', String(p2.x))
      el.setAttribute('y2', String(p2.y))
    })

    let rafId = 0
    let cancelled = false
    const t0 = performance.now()
    function frame(now: number) {
      if (cancelled) return
      const t = (now - t0) / 1000
      decorRays.forEach((r, i) => {
        if (r.dotted) return
        const len = r.baseLen + r.baseLen * 0.22 * Math.sin(t * r.speed + r.phase)
        const p1 = pt(r.angle, RAY_START)
        const p2 = pt(r.angle, RAY_START + len)
        const el = decorEls[i]
        el.setAttribute('x1', String(p1.x))
        el.setAttribute('y1', String(p1.y))
        el.setAttribute('x2', String(p2.x))
        el.setAttribute('y2', String(p2.y))
      })
      valueEls.forEach((ve) => {
        const breathe = 48 * Math.sin(t * 0.5 + ve.angle)
        const len = 380 + breathe
        const p1 = pt(ve.angle, centerAnim.current + 2)
        const p2 = pt(ve.angle, len - BADGE_R - LINE_GAP)
        ve.line.setAttribute('x1', String(p1.x))
        ve.line.setAttribute('y1', String(p1.y))
        ve.line.setAttribute('x2', String(p2.x))
        ve.line.setAttribute('y2', String(p2.y))
        ve.hitLine.setAttribute('x1', String(p1.x))
        ve.hitLine.setAttribute('y1', String(p1.y))
        ve.hitLine.setAttribute('x2', String(p2.x))
        ve.hitLine.setAttribute('y2', String(p2.y))
        const tip = pt(ve.angle, len)
        ve.backdrop.setAttribute('cx', String(tip.x))
        ve.backdrop.setAttribute('cy', String(tip.y))
        ve.circle.setAttribute('cx', String(tip.x))
        ve.circle.setAttribute('cy', String(tip.y))
        ve.text.setAttribute('x', String(tip.x))
        ve.text.setAttribute('y', String(tip.y))
        ve.tspans.forEach((ts) => ts.setAttribute('x', String(tip.x)))
        ve.rings.forEach((arcEl, ri) => {
          const rd = RING_DEFS[ri]
          arcEl.setAttribute('d', arcPathAt(tip.x, tip.y, BADGE_R + rd.rOff, rd.a0, rd.a1))
        })
      })
      rafId = requestAnimationFrame(frame)
    }
    rafId = requestAnimationFrame(frame)

    return () => {
      cancelled = true
      window.cancelAnimationFrame(rafId)
      window.clearTimeout(pendingTextTimeout)
      raysGroup.innerHTML = ''
      crossGroup.innerHTML = ''
      valuesGroup.innerHTML = ''
      centerTextGroup.innerHTML = ''
    }
  }, [])

  return (
    <div className="flex justify-center rounded-xl bg-[#F7F1E4] py-4">
      <svg width={640} height={640} viewBox="0 0 1000 1000" className="h-auto w-full max-w-[640px]">
        <defs>
          <radialGradient id="cv-bgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFDF6" stopOpacity={0.65} />
            <stop offset="45%" stopColor="#FBF3DD" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#F7F1E4" stopOpacity={0} />
          </radialGradient>
          <radialGradient id="cv-centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={1} />
            <stop offset="55%" stopColor="#FCF6E4" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#F7F1E4" stopOpacity={0} />
          </radialGradient>
          <radialGradient id="cv-badgeFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={1} />
            <stop offset="60%" stopColor="#FCF8EC" stopOpacity={1} />
            <stop offset="100%" stopColor="#F7F1E4" stopOpacity={1} />
          </radialGradient>
        </defs>
        <circle ref={bgGlowRef} cx={CX} cy={CY} fill="url(#cv-bgGlow)" />
        <g ref={raysGroupRef} />
        <g ref={crossGroupRef} />
        <circle ref={centerCircleRef} cx={CX} cy={CY} fill="url(#cv-centerGlow)" />
        <g ref={centerTextGroupRef} />
        <g ref={valuesGroupRef} />
      </svg>
    </div>
  )
}
