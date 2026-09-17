import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Always clear the previous page's scroll position immediately. Route
    // changes animate through <PageTransition> (a ~500ms fade), so the new
    // route's DOM doesn't exist yet at the moment this effect runs — if we
    // only handled the hash case below and it happened to miss its target,
    // the page would otherwise just sit at whatever scroll offset the
    // previous page was left at, which can look like it "landed" on an
    // unrelated section further down the new page.
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })

    if (!hash) return

    const id = hash.replace('#', '')
    let rafId: number
    let attempts = 0
    const maxAttempts = 60 // ~1s at 60fps — comfortably covers the page-transition delay

    const tryScroll = () => {
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

    rafId = requestAnimationFrame(tryScroll)
    return () => cancelAnimationFrame(rafId)
  }, [pathname, hash])

  return null
}
