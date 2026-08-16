import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Button from '../ui/Button'

const NAV_LINKS = [
  { label: 'Home', hash: '' },
  { label: 'Rewards', hash: 'rewards' },
  { label: 'How It Works', hash: 'how-it-works' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  function goToSection(hash) {
    setOpen(false)
    if (location.pathname === '/') {
      if (!hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(hash ? `/#${hash}` : '/')
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-void/80 backdrop-blur-xl border-b border-ink-border' : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Freedom 79 home">
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="#0B0F1E" stroke="#1E2338" />
            <circle cx="16" cy="16" r="8.5" stroke="#FF9933" strokeWidth="1.3" />
            <circle cx="16" cy="16" r="1.4" fill="#F5F3EE" />
          </svg>
          <span className="font-display text-lg font-semibold tracking-tight text-pearl">
            Freedom<span className="text-saffron-soft">79</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => goToSection(link.hash)}
              className="text-sm font-medium text-pearl-dim transition-colors hover:text-pearl"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" to="/login">
            Sign In
          </Button>
          <Button variant="primary" size="sm" to="/signup">
            Get Started
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-border text-pearl md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-border bg-void px-5 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => goToSection(link.hash)}
                className="rounded-lg px-3 py-3 text-left text-sm font-medium text-pearl-dim hover:bg-white/[0.04] hover:text-pearl"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            <Button variant="secondary" to="/login" className="w-full">
              Sign In
            </Button>
            <Button variant="primary" to="/signup" className="w-full">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
