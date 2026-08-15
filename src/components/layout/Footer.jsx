import { Link } from 'react-router-dom'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Rewards', to: '/#rewards' },
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-ink-border bg-void-soft">
      <div className="h-px w-full bg-tricolor-line opacity-70" />
      <div className="container-page py-12 sm:py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <span className="font-display text-lg font-semibold text-pearl">
              Freedom<span className="text-saffron-soft">79</span>
            </span>
            <p className="mt-2 text-sm text-pearl-dim">Independence Day 2026 Campaign</p>
            <p className="mt-1 text-xs text-pearl-faint">Campaign available until 16 August 2026.</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 sm:justify-end">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm text-pearl-dim transition-colors hover:text-pearl"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-pearl-faint">
          Third-party platforms are independent services. Availability, eligibility, rewards and
          terms are determined by the respective platforms.
        </p>
      </div>
    </footer>
  )
}
