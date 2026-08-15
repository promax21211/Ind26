import { Link, Outlet } from 'react-router-dom'
import ChakraMotif from '../ui/ChakraMotif'

export default function AuthLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-void">
      <div className="pointer-events-none absolute -right-52 -top-52 h-[560px] w-[560px] opacity-70">
        <ChakraMotif className="h-full w-full" opacity={0.12} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-saffron-glow" />

      <header className="container-page relative flex h-20 items-center">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Freedom 79 home">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="#0B0F1E" stroke="#1E2338" />
            <circle cx="16" cy="16" r="8.5" stroke="#FF9933" strokeWidth="1.3" />
            <circle cx="16" cy="16" r="1.4" fill="#F5F3EE" />
          </svg>
          <span className="font-display text-lg font-semibold tracking-tight text-pearl">
            Freedom<span className="text-saffron-soft">79</span>
          </span>
        </Link>
      </header>

      <main className="relative flex flex-1 items-center justify-center px-5 py-10">
        <Outlet />
      </main>

      <footer className="relative pb-8 text-center text-xs text-pearl-faint">
        Independence Day 2026 Campaign · Available until 16 August 2026
      </footer>
    </div>
  )
}
