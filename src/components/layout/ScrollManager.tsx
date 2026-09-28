import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollManager() {
  // `key` changes on every navigation — also when clicking a link to the exact same URL (e.g. the
  // same #anchor a second time after scrolling away), which pathname/hash alone wouldn't catch.
  const { pathname, hash, key } = useLocation()
  const prevPathname = useRef<string | null>(null)

  useEffect(() => {
    // Jumping to an anchor on the page we're already on: scroll smoothly from the current position
    // instead of first snapping to the top.
    const samePage = prevPathname.current === pathname
    prevPathname.current = pathname

    // Always clear the previous page's scroll position immediately. Route
    // changes animate through <PageTransition> (a ~500ms fade), so the new
    // route's DOM doesn't exist yet at the moment this effect runs — if we
    // only handled the hash case below and it happened to miss its target,
    // the page would otherwise just sit at whatever scroll offset the
    // previous page was left at, which can look like it "landed" on an
    // unrelated section further down the new page.
    if (!samePage) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })

    if (!hash) return

    const id = hash.replace('#', '')
    let rafId: number
    let cancelled = false
    let attempts = 0
    const maxAttempts = 60 // ~1s at 60fps — comfortably covers the page-transition delay

    const tryScroll = () => {
      if (cancelled) return
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      attempts += 1
      if (attempts < maxAttempts) {
        rafId = requestAnimationFrame(tryScroll)
      }
    }

    // Wait for web fonts to finish loading first — on a cold cache, the
    // headline above an anchor target still swaps from its fallback font
    // shortly after we'd otherwise scroll, reflowing the page and leaving
    // the landing dozens of pixels off. document.fonts.ready resolves
    // immediately if nothing is loading, so this is a no-op on repeat visits.
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) rafId = requestAnimationFrame(tryScroll)
      })
    } else {
      rafId = requestAnimationFrame(tryScroll)
    }

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
    }
  }, [pathname, hash, key])

  return null
}
