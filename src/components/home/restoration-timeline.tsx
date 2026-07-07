'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface TimelineEntry {
  year: string
  title: string
  place: string
  description: string
}

const ENTRIES: TimelineEntry[] = [
  {
    year: '1960',
    title: 'The Appeal',
    place: 'Beirut',
    description: 'APSAD is founded and issues its first appeal to the Lebanese people.',
  },
  {
    year: '1962',
    title: 'El-Dine Residence',
    place: 'Abey',
    description: 'The first restoration — a historic house later chosen as the British Ambassador’s residence.',
  },
  {
    year: '1964',
    title: 'Hammam el-Jédid',
    place: 'Tripoli',
    description: 'The 18th-century bathhouse restored with the Directorate General of Antiquities.',
  },
  {
    year: '1969',
    title: 'Mar Estephan',
    place: 'Batroun',
    description: 'The coastal church returned to its parish, stone by stone.',
  },
  {
    year: '1972',
    title: 'Deir el-Qamar',
    place: 'The Chouf',
    description: 'A rehabilitated residence becomes APSAD’s regional home in the mountains.',
  },
  {
    year: '1978',
    title: 'The Jeweler’s Souk',
    place: 'Beirut',
    description: 'Reconstruction plans drawn for the old gold souk in the wake of war.',
  },
  {
    year: '2001',
    title: 'The Old Souk',
    place: 'Jounieh',
    description: 'Rehabilitation and a pedestrian revival return evenings to the souk.',
  },
  {
    year: '2012',
    title: 'Zaki Nassif House',
    place: 'Mashghara',
    description: 'The composer’s heirs entrust his family house to APSAD.',
  },
  {
    year: '2015',
    title: 'Zaki Nassif Museum',
    place: 'Mashghara',
    description: 'Museum, cultural centre, and music school open their doors.',
  },
  {
    year: '2016',
    title: 'Nahr el-Kalb',
    place: 'Kesrouan',
    description: 'With Factum Foundation, the river’s ancient stelae are studied for preservation.',
  },
]

function EntryPanel({ entry, index }: { entry: TimelineEntry; index: number }) {
  const yearAbove = index % 2 === 0
  return (
    <div className="relative shrink-0 w-[78vw] sm:w-[340px] lg:w-[360px] h-[440px] lg:h-[480px] snap-start">
      {/* Node on the continuous thread */}
      <span
        className="absolute left-0 top-1/2 -translate-y-1/2 h-2.5 w-2.5 bg-primary"
        aria-hidden="true"
      />
      <div
        className={`absolute left-0 right-8 flex flex-col ${
          yearAbove ? 'bottom-1/2 pb-9 justify-end' : 'top-1/2 pt-9'
        }`}
      >
        <p className="font-display text-6xl lg:text-7xl text-foreground leading-none">
          {entry.year}
        </p>
        <p className="font-display text-[11px] uppercase tracking-[0.3em] text-primary mt-4">
          {entry.place}
        </p>
        <h3 className="font-display text-2xl mt-2 text-foreground">{entry.title}</h3>
        <p className="text-base text-muted-foreground leading-relaxed mt-3 max-w-[30ch]">
          {entry.description}
        </p>
      </div>
    </div>
  )
}

function ClosingPanel() {
  return (
    <div className="relative shrink-0 w-[78vw] sm:w-[380px] h-[440px] lg:h-[480px] snap-start flex items-center">
      <span
        className="absolute left-0 top-1/2 -translate-y-1/2 h-2.5 w-2.5 bg-primary"
        aria-hidden="true"
      />
      <div className="pl-8">
        <p className="font-display text-6xl lg:text-7xl text-primary leading-none">Today</p>
        <p className="text-lg text-muted-foreground leading-relaxed mt-6 max-w-[26ch]">
          The record is still being written.
        </p>
        <Link
          href="/get-involved"
          className="inline-flex items-center gap-2 mt-6 font-display text-[12px] uppercase tracking-[0.25em] text-foreground border-b border-primary pb-1 hover:text-primary transition-colors"
        >
          Add your name
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

function TimelineHeading() {
  return (
    <div className="shrink-0 w-[82vw] sm:w-[420px] lg:w-[460px] pr-12 lg:pr-20 flex flex-col justify-center h-[440px] lg:h-[480px] snap-start">
      <p className="font-display text-[11px] uppercase tracking-[0.42em] text-primary mb-6">
        The Record · 1960 — Today
      </p>
      <h2
        className="font-display uppercase tracking-[0.04em] leading-[1.08] text-foreground"
        style={{ fontSize: 'clamp(2rem, 3.6vw, 3.25rem)' }}
      >
        Sixty-five years of rescue
      </h2>
      <p className="text-lg text-muted-foreground leading-relaxed mt-6 max-w-[36ch]">
        Churches, souks, bathhouses, and family houses — each entry below is a
        place that still stands because someone refused to let it fall.
      </p>
    </div>
  )
}

/**
 * The Record — horizontal restoration timeline.
 *
 * Desktop with motion allowed: a sticky viewport where page scroll drives the
 * track horizontally (the one deliberate scroll-driven set-piece of the site).
 * Touch, small screens, or reduced motion: a native scroll-snap strip.
 */
export function RestorationTimeline() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [sticky, setSticky] = useState(false)
  const [contentW, setContentW] = useState(0)
  const [travel, setTravel] = useState(0)

  /* The absolutely-positioned thread inflates scrollWidth, so measure the
     real content width from the last panel's right edge instead. */
  const measure = useCallback(() => {
    const track = trackRef.current
    const last = track?.lastElementChild as HTMLElement | null
    if (!track || !last) return
    const width = last.offsetLeft + last.offsetWidth + 48
    setContentW(width)
    setTravel(Math.max(0, width - window.innerWidth))
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const wide = window.matchMedia('(min-width: 1024px)')
    const decide = () => setSticky(wide.matches && !reduced.matches)
    decide()
    wide.addEventListener('change', decide)
    reduced.addEventListener('change', decide)
    return () => {
      wide.removeEventListener('change', decide)
      reduced.removeEventListener('change', decide)
    }
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure, sticky])

  useEffect(() => {
    if (!sticky || travel === 0) return

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (!wrapRef.current || !trackRef.current) return
        const rect = wrapRef.current.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0
        trackRef.current.style.transform = `translate3d(${-progress * travel}px, 0, 0)`
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${progress})`
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [sticky, travel])

  const track = (
    <div
      ref={trackRef}
      className={`relative flex items-center pl-6 md:pl-12 pr-12 ${
        sticky
          ? 'will-change-transform'
          : 'overflow-x-auto snap-x snap-proximity scroll-pl-6 md:scroll-pl-12'
      }`}
      style={sticky ? undefined : { scrollbarWidth: 'thin' }}
      {...(!sticky && {
        role: 'region',
        'aria-label': 'Restoration timeline, scroll horizontally',
        tabIndex: 0,
      })}
    >
      {/* The continuous thread */}
      <div
        className="absolute left-0 top-1/2 h-px bg-border"
        style={{ width: contentW ? `${contentW}px` : '100%' }}
        aria-hidden="true"
      />
      <TimelineHeading />
      {ENTRIES.map((entry, i) => (
        <EntryPanel key={entry.year + entry.title} entry={entry} index={i} />
      ))}
      <ClosingPanel />
    </div>
  )

  if (!sticky) {
    return (
      <section className="relative py-20 overflow-hidden">
        {track}
        <p className="font-display text-[10px] uppercase tracking-[0.3em] text-muted-foreground text-center mt-6 lg:hidden">
          Swipe to travel the record
        </p>
      </section>
    )
  }

  return (
    <section
      ref={wrapRef}
      className="relative"
      style={{ height: `calc(100vh + ${travel}px)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {track}
        {/* Progress hairline */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-56 flex items-center gap-4">
          <span className="font-display text-[10px] tracking-[0.2em] text-muted-foreground">1960</span>
          <div className="relative flex-1 h-px bg-border overflow-hidden">
            <div
              ref={progressRef}
              className="absolute inset-0 bg-primary origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          <span className="font-display text-[10px] tracking-[0.2em] text-muted-foreground">Today</span>
        </div>
      </div>
    </section>
  )
}
