import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: string
  tone?: 'gold' | 'ink'
  className?: string
  align?: 'left' | 'center'
}

export function SectionLabel({ children, tone = 'gold', className, align = 'center' }: SectionLabelProps) {
  const color = tone === 'gold' ? 'text-gold' : 'text-ink-soft'
  return (
    <div
      className={cn(
        'flex items-center gap-4 text-[0.7rem] uppercase tracking-[0.4em]',
        color,
        align === 'center' ? 'justify-center' : 'justify-start',
        className,
      )}
    >
      <span className="h-px w-8 bg-current opacity-60" />
      <span>{children}</span>
      <span className="h-px w-8 bg-current opacity-60" />
    </div>
  )
}
