import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { PageTransition } from '@/components/layout/PageTransition'
import { ScrollManager } from '@/components/layout/ScrollManager'
import { SideNav } from '@/components/layout/SideNav'
import { AboutPage } from '@/pages/AboutPage'
import { ConnectPage } from '@/pages/ConnectPage'
import { ContentPage } from '@/pages/ContentPage'
import { EventsPage } from '@/pages/EventsPage'
import { HomePage } from '@/pages/HomePage'
import { StorePage } from '@/pages/StorePage'
import { VisionPage } from '@/pages/VisionPage'

export default function App() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <ScrollManager />
      <Header />
      <SideNav />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
            <Route path="/vision" element={<PageTransition><VisionPage /></PageTransition>} />
            <Route path="/content" element={<PageTransition><ContentPage /></PageTransition>} />
            <Route path="/events" element={<PageTransition><EventsPage /></PageTransition>} />
            <Route path="/store" element={<PageTransition><StorePage /></PageTransition>} />
            <Route path="/connect" element={<PageTransition><ConnectPage /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
