import { useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function DragGallery({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const start = useRef({ x: 0, scrollLeft: 0 })

  const onPointerDown = (e: React.PointerEvent) => {
    if (!ref.current) return
    setIsDragging(true)
    start.current = { x: e.clientX, scrollLeft: ref.current.scrollLeft }
    ref.current.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !ref.current) return
    const delta = e.clientX - start.current.x
    ref.current.scrollLeft = start.current.scrollLeft - delta
  }

  const onPointerUp = () => setIsDragging(false)

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      className={cn(
        'drag-scroll flex snap-x snap-mandatory gap-8 overflow-x-auto pb-6',
        isDragging ? 'cursor-grabbing select-none' : 'cursor-grab',
        className,
      )}
    >
      {children}
    </div>
  )
}
