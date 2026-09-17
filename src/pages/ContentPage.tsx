import { PlayCircle } from 'lucide-react'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/Reveal'
import { CinematicBackdrop } from '@/components/ui/Atmosphere'
import { GoldRule } from '@/components/ui/GoldRule'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { sermons, testimonies, type VideoTile } from '@/data/content'

function VideoCard({ video }: { video: VideoTile }) {
  return (
    <a
      href={video.youtubeUrl}
      target="_blank"
      rel="noreferrer"
      className="group block overflow-hidden border border-gold/15 bg-navy/70 transition-colors hover:border-gold/40"
    >
      <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-navy-mist to-navy-deep">
        <PlayCircle className="h-12 w-12 text-gold/70 transition-transform duration-300 group-hover:scale-110" strokeWidth={1} />
      </div>
      <div className="p-5">
        <h3 className="font-display text-base text-ivory">{video.title}</h3>
        {(video.speaker || video.date) && (
          <p className="mt-1 text-xs uppercase tracking-[0.15em] text-gold/60">
            {[video.speaker, video.date].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>
    </a>
  )
}

export function ContentPage() {
  return (
    <div className="bg-navy-deep text-ivory">
      <section
        id="content-intro"
        data-nav-label="Content"
        className="relative scroll-mt-28 overflow-hidden px-6 pb-16 pt-40 text-center lg:pt-48"
      >
        <CinematicBackdrop />
        <Reveal className="relative mx-auto max-w-2xl">
          <SectionLabel>Content</SectionLabel>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl">Worte, die bleiben.</h1>
          <p className="mt-6 text-sm leading-relaxed text-ivory/70">
            Predigten und echte Geschichten aus unserer Gemeinschaft — zum Nachhören, Teilen und Weitergeben.
          </p>
        </Reveal>
      </section>

      <section id="preach" data-nav-label="Preach" className="scroll-mt-28 px-6 py-24 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <GoldRule />
          <h2 className="mt-6 font-display text-3xl sm:text-4xl">Preach</h2>
        </Reveal>
        <StaggerGroup className="mx-auto mt-14 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sermons.map((sermon) => (
            <StaggerItem key={sermon.id}>
              <VideoCard video={sermon} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section id="testimonies" data-nav-label="Testimonies" className="scroll-mt-28 px-6 py-24 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <GoldRule />
          <h2 className="mt-6 font-display text-3xl sm:text-4xl">Testimonies</h2>
          <p className="mt-4 text-sm leading-relaxed text-ivory/70">
            Echte Geschichten von Veränderung — erzählt von Menschen aus unserer Mitte.
          </p>
        </Reveal>
        <StaggerGroup className="mx-auto mt-14 grid max-w-5xl gap-8 sm:grid-cols-2">
          {testimonies.map((testimony) => (
            <StaggerItem key={testimony.id}>
              <VideoCard video={testimony} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
    </div>
  )
}
