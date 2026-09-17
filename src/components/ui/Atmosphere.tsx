import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'

interface ExcludeZone {
  top: [number, number]
  left: [number, number]
}

/**
 * Deterministic starfield used on dark cinematic sections.
 * Pure CSS/SVG — no external imagery required.
 */
export function Starfield({
  count = 60,
  className,
  excludeZone,
  shootingStars = false,
}: {
  count?: number
  className?: string
  /** Percent-based box (of the section) to keep free of stars, e.g. where a foreground illustration sits. */
  excludeZone?: ExcludeZone
  /** Occasionally sweep a short shooting star across the top of the section. */
  shootingStars?: boolean
}) {
  const stars = useMemo(() => {
    let seed = 42
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    const inExcludeZone = (top: number, left: number) =>
      excludeZone !== undefined &&
      top >= excludeZone.top[0] &&
      top <= excludeZone.top[1] &&
      left >= excludeZone.left[0] &&
      left <= excludeZone.left[1]

    return Array.from({ length: count }, (_, i) => {
      let top = rand() * 100
      let left = rand() * 100
      let attempts = 0
      while (inExcludeZone(top, left) && attempts < 30) {
        top = rand() * 100
        left = rand() * 100
        attempts++
      }
      return {
        id: i,
        top,
        left,
        size: rand() * 1.6 + 0.6,
        // every star twinkles through the same ~0.15–0.75 range (see .star-twinkle);
        // only duration/delay vary, so the field feels organic instead of synchronized.
        duration: rand() * 2.5 + 2.5,
        delay: rand() * 3,
      }
    })
  }, [count, excludeZone])

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {stars.map((star) => (
        <span
          key={star.id}
          className="star-twinkle absolute rounded-full bg-ivory"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      {shootingStars && <ShootingStars />}
    </div>
  )
}

interface ShootingStar {
  id: number
  top: number
  left: number
  angle: number
  length: number
  duration: number
}

/**
 * Rare, short shooting star — checked every 6–10s with a ~45% chance of firing,
 * so on average one appears roughly every 15–20s. Deliberately infrequent.
 */
function ShootingStars() {
  const [stars, setStars] = useState<ShootingStar[]>([])
  const nextId = useRef(0)

  useEffect(() => {
    let cancelled = false
    let timeoutId: ReturnType<typeof setTimeout>

    const scheduleNext = () => {
      const wait = 6000 + Math.random() * 4000
      timeoutId = setTimeout(() => {
        if (cancelled) return
        if (Math.random() < 0.45) {
          const id = nextId.current++
          const duration = 1.2 + Math.random() * 0.3
          const star: ShootingStar = {
            id,
            top: Math.random() * 25,
            left: Math.random() * 60,
            angle: 20 + Math.random() * 25,
            length: 150 + Math.random() * 100,
            duration,
          }
          setStars((prev) => [...prev, star])
          setTimeout(() => {
            if (!cancelled) setStars((prev) => prev.filter((s) => s.id !== id))
          }, duration * 1000 + 100)
        }
        scheduleNext()
      }, wait)
    }

    scheduleNext()
    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <>
      {stars.map((star) => (
        <span
          key={star.id}
          className="shooting-star"
          style={
            {
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.length}px`,
              animationDuration: `${star.duration}s`,
              '--shooting-angle': `${star.angle}deg`,
            } as CSSProperties
          }
        />
      ))}
    </>
  )
}

export function CinematicBackdrop({
  className,
  starsExcludeZone,
  shootingStars,
}: {
  className?: string
  /** Forwarded to Starfield — keeps stars off a foreground element such as a map illustration. */
  starsExcludeZone?: ExcludeZone
  /** Forwarded to Starfield — occasionally sweeps a shooting star through the section. */
  shootingStars?: boolean
}) {
  return (
    <div className={cn('pointer-events-none absolute inset-0', className)}>
      <div className="absolute inset-0 bg-navy" />
      <div className="absolute -top-1/3 left-1/2 h-[70%] w-[90%] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-1/2 w-1/2 rounded-full bg-gold-dim/10 blur-[100px]" />
      <Starfield excludeZone={starsExcludeZone} shootingStars={shootingStars} />
      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-deep/80" />
    </div>
  )
}
