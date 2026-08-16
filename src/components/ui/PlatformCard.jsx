import { ExternalLink } from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'
import Card from './Card'
import Badge from './Badge'
import { getIcon } from '../../lib/icons'

export default function PlatformCard({ platform }) {
  const Icon = getIcon(platform.icon)

  return (
    <Card hover className="flex h-full flex-col p-6">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-ink-border bg-gradient-to-br from-white/[0.06] to-transparent">
          <Icon size={22} className="text-saffron-soft" strokeWidth={1.75} />
        </div>
        <ExternalLink size={15} className="mt-1 text-pearl-faint" aria-hidden="true" />
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold text-pearl">{platform.name}</h3>
      <p className="mt-0.5 text-xs font-mono uppercase tracking-wide text-pearl-faint">{platform.category}</p>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-pearl-dim">{platform.description}</p>

      <div className="mt-5 flex items-center justify-between gap-3">
        <Badge tone="neutral">Third-party platform</Badge>
      </div>

      <a
        href={platform.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-saffron-soft transition-colors hover:text-saffron"
      >
        Explore
        <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </Card>
  )
}
