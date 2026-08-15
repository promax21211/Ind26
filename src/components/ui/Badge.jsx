const tones = {
  neutral: 'bg-white/[0.06] text-pearl-dim border-ink-border',
  saffron: 'bg-saffron/10 text-saffron-soft border-saffron/30',
  green: 'bg-flag-green/10 text-emerald-400 border-flag-green/30',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  pending: 'bg-chakra-bright/10 text-indigo-300 border-chakra-bright/30',
}

export default function Badge({ children, tone = 'neutral', dot = false, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${tones[tone]} ${className}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}
