import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Sidebar from './Sidebar'

export default function DashboardLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-void">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-ink-border bg-void/90 px-5 backdrop-blur-xl md:hidden">
        <Link to="/" className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="#0B0F1E" stroke="#1E2338" />
            <circle cx="16" cy="16" r="8.5" stroke="#FF9933" strokeWidth="1.3" />
            <circle cx="16" cy="16" r="1.4" fill="#F5F3EE" />
          </svg>
          <span className="font-display text-base font-semibold text-pearl">
            Freedom<span className="text-saffron-soft">79</span>
          </span>
        </Link>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-border text-pearl"
          onClick={() => setOpen(true)}
          aria-label="Open dashboard menu"
        >
          <Menu size={17} />
        </button>
      </header>

      <div className="mx-auto flex max-w-[1440px]">
        <aside className="sticky top-0 hidden h-screen w-64 flex-none border-r border-ink-border md:block">
          <Sidebar />
        </aside>

        {open && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-72 border-r border-ink-border bg-void">
              <div className="flex items-center justify-between border-b border-ink-border px-5 py-4">
                <span className="font-display text-base font-semibold text-pearl">Menu</span>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-border text-pearl"
                  onClick={() => setOpen(false)}
                  aria-label="Close dashboard menu"
                >
                  <X size={16} />
                </button>
              </div>
              <Sidebar onNavigate={() => setOpen(false)} />
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
