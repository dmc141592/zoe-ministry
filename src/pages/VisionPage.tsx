import { Parallax } from '@/components/motion/Parallax'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/Reveal'
import { GoldRule } from '@/components/ui/GoldRule'
import { SevenMountains } from '@/components/vision/SevenMountains'
import { visionStatement, visionVerse } from '@/data/vision'

const lineGradient = (direction: 90 | 270) =>
  `linear-gradient(${direction}deg, transparent, var(--color-gold-400))`

export function VisionPage() {
  return (
    <div className="bg-cream-100">
      <section
        id="statement"
        data-nav-label="Vision"
        className="relative scroll-mt-28 overflow-hidden px-6 pb-16 pt-40 lg:pt-48"
      >
        <Reveal>
          <div className="flex items-center justify-center gap-3.5">
            <span className="h-px w-11" style={{ background: lineGradient(90) }} />
            <span className="text-[11px] uppercase tracking-[0.35em] text-gold-500">Vision</span>
            <span className="h-px w-11" style={{ background: lineGradient(270) }} />
          </div>
        </Reveal>

        <StaggerGroup className="mx-auto mt-10 max-w-[620px] space-y-6 text-center" stagger={0.12}>
          <StaggerItem>
            <p className="font-display text-[21px] uppercase leading-[1.55] text-ink">
              {visionStatement.lines[0]} {visionStatement.lines[1]}
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="font-display text-[21px] uppercase leading-[1.55] text-ink-soft">
              {visionStatement.lines[2]}
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="font-display text-[21px] uppercase leading-[1.55] text-gold-500">
              {visionStatement.lines[3]}
            </p>
          </StaggerItem>
        </StaggerGroup>
      </section>

      <div className="mx-auto h-px max-w-5xl bg-ink/6" />

      <section id="seven-mountains" data-nav-label="Seven Mountains" className="relative scroll-mt-28 px-6 py-24 lg:px-10">
        <Reveal className="mx-auto max-w-[640px] text-center">
          <p className="m-0 font-display text-[40px] text-ink">SEVEN MOUNTAINS</p>

          <GoldRule className="my-7" />

          <p className="font-accent m-0 text-2xl italic leading-[1.65] text-ink">
            „{visionVerse.text}"
          </p>
          <p className="m-0 mt-5 text-xs uppercase tracking-[0.18em] text-gold-500">
            — {visionVerse.reference}
          </p>
        </Reveal>
      </section>

      <section id="berge" data-nav-label="Berge" className="relative scroll-mt-28 px-6 pb-32 lg:px-10">
        <Parallax strength={24}>
          <SevenMountains />
        </Parallax>
      </section>
    </div>
  )
}
