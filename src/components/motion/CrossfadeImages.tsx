import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface CrossfadeImagesProps {
  images: string[]
  interval?: number
  className?: string
}

export function CrossfadeImages({ images, interval = 6000, className }: CrossfadeImagesProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length < 2) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length)
    }, interval)
    return () => window.clearInterval(id)
  }, [images.length, interval])

  return (
    <div className={className}>
      <AnimatePresence>
        <motion.div
          key={images[index]}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 2.2, ease: 'easeInOut' }, scale: { duration: 8, ease: 'easeOut' } }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[index]})` }}
        />
      </AnimatePresence>
    </div>
  )
}
