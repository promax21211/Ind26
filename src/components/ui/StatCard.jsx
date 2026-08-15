import Card from './Card'
import { getIcon } from '../../lib/icons'

export default function StatCard({ label, value, icon, hint, accent = 'saffron' }) {
  const Icon = getIcon(icon)
  const accentClasses = {
    saffron: 'text-saffron-soft',
    green: 'text-emerald-400',
    pearl: 'text-pearl',
  }

  return (
    <Card className="flex items-center gap-4 p-5">
      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-ink-border bg-white/[0.03]">
        <Icon size={20} className={accentClasses[accent]} strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <p className="font-mono text-2xl font-medium tabular-nums text-pearl">{value}</p>
        <p className="truncate text-xs uppercase tracking-wide text-pearl-faint">{label}</p>
        {hint && <p className="mt-0.5 text-xs text-pearl-dim">{hint}</p>}
      </div>
    </Card>
  )
}
