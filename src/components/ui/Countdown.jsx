import { useEffect, useState } from 'react'

// Campaign deadline: 16 August 2026, end of day, India Standard Time.
export const CAMPAIGN_DEADLINE = new Date('2026-08-16T23:59:59+05:30')

function getTimeParts(deadline) {
  const diff = deadline.getTime() - Date.now()
  const clamped = Math.max(diff, 0)
  return {
    total: clamped,
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  }
}

function Unit({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="glass-panel flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
        <span className="font-mono text-2xl font-medium tabular-nums text-pearl sm:text-3xl">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-pearl-faint">{label}</span>
    </div>
  )
}

export default function Countdown({ className = '' }) {
  const [parts, setParts] = useState(() => getTimeParts(CAMPAIGN_DEADLINE))

  useEffect(() => {
    const id = setInterval(() => setParts(getTimeParts(CAMPAIGN_DEADLINE)), 1000)
    return () => clearInterval(id)
  }, [])

  if (parts.total <= 0) {
    return (
      <div className={`glass-panel px-6 py-4 text-center ${className}`}>
        <p className="font-display text-sm tracking-wide text-pearl-dim">The campaign has ended.</p>
      </div>
    )
  }

  return (
    <div className={`flex items-start gap-3 sm:gap-4 ${className}`}>
      <Unit value={parts.days} label="Days" />
      <Unit value={parts.hours} label="Hours" />
      <Unit value={parts.minutes} label="Minutes" />
      <Unit value={parts.seconds} label="Seconds" />
    </div>
  )
}
