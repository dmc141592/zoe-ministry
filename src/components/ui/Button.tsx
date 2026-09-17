import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'gold' | 'outline-light' | 'outline-dark' | 'ghost-light'

interface BaseProps {
  children: ReactNode
  variant?: Variant
  className?: string
}

const variantClasses: Record<Variant, string> = {
  gold: 'bg-gold text-navy-deep hover:bg-gold-bright shadow-glow',
  'outline-light': 'border border-ivory/40 text-ivory hover:border-gold hover:text-gold',
  'outline-dark': 'border border-ink/30 text-ink hover:border-gold-dim hover:text-gold-dim',
  'ghost-light': 'text-ivory/90 hover:text-gold',
}

const base =
  'inline-flex items-center justify-center gap-2 px-8 py-3 text-xs uppercase tracking-[0.25em] font-sans font-medium transition-colors duration-300'

export function ButtonLink({
  to,
  children,
  variant = 'gold',
  className,
}: BaseProps & { to: string }) {
  return (
    <Link to={to} className={cn(base, variantClasses[variant], className)}>
      {children}
    </Link>
  )
}

export function ButtonAnchor({
  href,
  children,
  variant = 'gold',
  className,
}: BaseProps & { href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cn(base, variantClasses[variant], className)}>
      {children}
    </a>
  )
}
