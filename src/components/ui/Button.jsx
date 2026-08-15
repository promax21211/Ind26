import { Link } from 'react-router-dom'
import ChakraSpinner from './ChakraSpinner'

const base =
  'group relative inline-flex items-center justify-center gap-2 font-body font-medium ' +
  'rounded-xl transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed ' +
  'focus-visible:outline-2 focus-visible:outline-saffron focus-visible:outline-offset-2'

const variants = {
  primary:
    'bg-saffron text-void hover:bg-saffron-soft active:scale-[0.98] shadow-glow-saffron',
  secondary:
    'bg-white/[0.04] text-pearl border border-ink-border hover:border-saffron/50 hover:bg-white/[0.07] active:scale-[0.98]',
  ghost: 'text-pearl-dim hover:text-pearl',
  danger: 'bg-transparent text-red-400 border border-red-500/30 hover:bg-red-500/10',
}

const sizes = {
  sm: 'text-sm px-4 py-2',
  md: 'text-sm px-5 py-3',
  lg: 'text-base px-7 py-3.5',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'right',
  to,
  href,
  external = false,
  type = 'button',
  className = '',
  onClick,
  ...rest
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  const content = (
    <>
      {loading && <ChakraSpinner size={16} />}
      {!loading && Icon && iconPosition === 'left' && (
        <Icon size={16} className="transition-transform group-hover:-translate-x-0.5" />
      )}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && (
        <Icon size={16} className="transition-transform group-hover:translate-x-0.5" />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={classes}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classes}
      {...rest}
    >
      {content}
    </button>
  )
}
