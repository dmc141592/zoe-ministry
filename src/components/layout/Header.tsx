import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navigation, site } from '@/data/site'
import { cn } from '@/lib/utils'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null)
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)
  const location = useLocation()
  const lastScrollY = useRef(0)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let raf = 0
    // Kleine Bewegungen (Trackpad-Zittern, iOS-Bounce) ignorieren, damit die Leiste nicht flackert.
    const THRESHOLD = 5
    // Beim Runterscrollen verschwindet die Leiste und bleibt weg, bis nach oben gescrollt wird.
    const update = () => {
      raf = 0
      const y = window.scrollY
      setScrolled(y > 40)
      if (y < 10) {
        setHidden(false)
        lastScrollY.current = y
        return
      }
      const delta = y - lastScrollY.current
      if (Math.abs(delta) < THRESHOLD) return
      setHidden(delta > 0)
      lastScrollY.current = y
    }
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update)
    }
    lastScrollY.current = window.scrollY
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  // Measure the header's real rendered height (padding/border/content included)
  // instead of assuming a fixed px value, and publish it as --navbar-height so
  // .scroll-target (index.css) always reserves exactly the right amount of
  // space for anchor scrolling — self-correcting if the header's size ever
  // changes (content, breakpoint, font metrics, …).
  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const setNavbarHeight = () => {
      document.documentElement.style.setProperty('--navbar-height', `${el.getBoundingClientRect().height}px`)
    }
    setNavbarHeight()
    const observer = new ResizeObserver(setNavbarHeight)
    observer.observe(el)
    window.addEventListener('resize', setNavbarHeight)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', setNavbarHeight)
    }
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDesktopMenu(null)
    setOpenSubMenu(null)
  }, [location.pathname])

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed inset-x-0 top-0 z-50',
        scrolled ? 'bg-navy-deep/90 backdrop-blur-md shadow-[0_1px_0_rgba(201,162,76,0.2)]' : 'bg-gradient-to-b from-navy-deep/70 to-transparent',
      )}
      style={{
        transform: hidden && !mobileOpen ? 'translateY(-100%)' : 'translateY(0)',
        opacity: hidden && !mobileOpen ? 0 : 1,
        transition:
          'background-color 0.5s ease, backdrop-filter 0.5s ease, box-shadow 0.5s ease, transform 0.4s ease, opacity 0.4s ease',
      }}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 py-2 lg:px-10">
        <Link to="/" className="flex -translate-x-[60px] items-center text-ivory">
          <img src="/images/english_fulltransparent_Negative.png" alt="" aria-hidden="true" className="h-16 w-auto object-contain" />
          <span className="-ml-[7px] font-display text-lg tracking-[0.18em]">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const hasChildren = !!item.children?.length
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hasChildren && setOpenDesktopMenu(item.label)}
                onMouseLeave={() => {
                  setOpenDesktopMenu(null)
                  setOpenSubMenu(null)
                }}
              >
                {item.to ? (
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-1 px-4 py-2 text-[0.7rem] uppercase tracking-[0.2em] text-ivory/80 transition-colors hover:text-gold',
                        isActive && 'text-gold',
                      )
                    }
                  >
                    {item.label}
                    {hasChildren && <ChevronDown className="h-3 w-3" strokeWidth={1.5} />}
                  </NavLink>
                ) : (
                  <button
                    type="button"
                    onClick={() => setOpenDesktopMenu((v) => (v === item.label ? null : item.label))}
                    className="flex items-center gap-1 px-4 py-2 text-[0.7rem] uppercase tracking-[0.2em] text-ivory/80 transition-colors hover:text-gold"
                  >
                    {item.label}
                    {hasChildren && <ChevronDown className="h-3 w-3" strokeWidth={1.5} />}
                  </button>
                )}

                {hasChildren && (
                  <AnimatePresence>
                    {openDesktopMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-full min-w-[200px] -translate-x-1/2 border border-gold/20 bg-navy-deep/95 py-2 backdrop-blur-md"
                      >
                        {item.children!.map((child) => {
                          const hasGrandchildren = !!child.children?.length
                          return (
                            <div
                              key={child.label}
                              className="relative"
                              onMouseEnter={() => hasGrandchildren && setOpenSubMenu(child.label)}
                              onMouseLeave={() => setOpenSubMenu((v) => (v === child.label ? null : v))}
                            >
                              <Link
                                to={child.to}
                                className="flex items-center justify-between gap-4 px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.15em] text-ivory/75 transition-colors hover:bg-gold/10 hover:text-gold"
                              >
                                {child.label}
                                {hasGrandchildren && <ChevronRight className="h-3 w-3" strokeWidth={1.5} />}
                              </Link>

                              {hasGrandchildren && (
                                <AnimatePresence>
                                  {openSubMenu === child.label && (
                                    <motion.div
                                      initial={{ opacity: 0, x: 8 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: 8 }}
                                      transition={{ duration: 0.2 }}
                                      className="absolute left-full top-0 min-w-[200px] border border-gold/20 bg-navy-deep/95 py-2 backdrop-blur-md"
                                    >
                                      {child.children!.map((grandchild) => (
                                        <Link
                                          key={grandchild.label}
                                          to={grandchild.to}
                                          className="block px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.15em] text-ivory/75 transition-colors hover:bg-gold/10 hover:text-gold"
                                        >
                                          {grandchild.label}
                                        </Link>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              )}
                            </div>
                          )
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            )
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/connect#spenden"
            className="inline-flex items-center border border-gold/70 px-6 py-2.5 text-[0.7rem] uppercase tracking-[0.25em] text-gold transition-colors hover:bg-gold hover:text-navy-deep"
          >
            Spenden
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="text-ivory lg:hidden"
          aria-label="Menü öffnen"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-navy-deep/98 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col px-6 pb-8 pt-2">
              {navigation.map((item) => (
                <div key={item.label} className="border-b border-ivory/10 py-3">
                  {item.to ? (
                    <Link
                      to={item.to}
                      className="block text-sm uppercase tracking-[0.2em] text-ivory/90"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="block text-sm uppercase tracking-[0.2em] text-ivory/90">
                      {item.label}
                    </span>
                  )}
                  {!!item.children?.length && (
                    <div className="mt-2 flex flex-col gap-3 pl-4">
                      {item.children.map((child) => (
                        <div key={child.label}>
                          <Link
                            to={child.to}
                            className="text-xs uppercase tracking-[0.15em] text-ivory/60"
                          >
                            {child.label}
                          </Link>
                          {!!child.children?.length && (
                            <div className="mt-2 flex flex-col gap-2 pl-4">
                              {child.children.map((grandchild) => (
                                <Link
                                  key={grandchild.label}
                                  to={grandchild.to}
                                  className="text-[0.65rem] uppercase tracking-[0.15em] text-ivory/45"
                                >
                                  {grandchild.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                to="/connect#spenden"
                className="mt-6 inline-flex items-center justify-center border border-gold px-6 py-3 text-[0.7rem] uppercase tracking-[0.25em] text-gold"
              >
                Spenden
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
