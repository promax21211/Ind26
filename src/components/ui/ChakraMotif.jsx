const SPOKES = Array.from({ length: 24 }, (_, i) => i * 15)

export default function ChakraMotif({ className = '', spin = true, opacity = 0.14 }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={`${spin ? 'animate-spin-slow' : ''} ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <circle cx="200" cy="200" r="180" stroke="url(#chakraRing)" strokeWidth="1.5" fill="none" />
      <circle cx="200" cy="200" r="140" stroke="#F5F3EE" strokeWidth="0.75" fill="none" opacity="0.5" />
      {SPOKES.map((angle) => (
        <line
          key={angle}
          x1="200"
          y1="200"
          x2="200"
          y2="24"
          stroke="#F5F3EE"
          strokeWidth="1.25"
          strokeLinecap="round"
          transform={`rotate(${angle} 200 200)`}
        />
      ))}
      <circle cx="200" cy="200" r="14" fill="#05070D" stroke="#FF9933" strokeWidth="1.5" />
      <defs>
        <linearGradient id="chakraRing" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF9933" />
          <stop offset="50%" stopColor="#F5F3EE" />
          <stop offset="100%" stopColor="#0F9D58" />
        </linearGradient>
      </defs>
    </svg>
  )
}
