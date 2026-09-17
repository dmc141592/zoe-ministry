import { motion } from 'framer-motion'
import { Diamond } from 'lucide-react'
import { cn } from '@/lib/utils'

const lineGradient = (direction: 90 | 270) => `linear-gradient(${direction}deg, transparent, var(--color-gold-400))`

export function GoldRule({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center gap-3', className)}>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="h-px w-16"
        style={{ transformOrigin: 'center', background: lineGradient(90) }}
      />
      <Diamond className="h-3 w-3 shrink-0 text-gold-400" strokeWidth={1.5} />
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="h-px w-16"
        style={{ transformOrigin: 'center', background: lineGradient(270) }}
      />
    </div>
  )
}
