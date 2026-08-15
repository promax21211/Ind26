export default function FormField({
  id,
  label,
  type = 'text',
  optional = false,
  error,
  hint,
  className = '',
  ...rest
}) {
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined

  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-pearl-dim">
          {label}
        </label>
        {optional && <span className="text-xs text-pearl-faint">Optional</span>}
      </div>
      <input
        id={id}
        type={type}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-pearl placeholder:text-pearl-faint
          transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-saffron/50
          ${error ? 'border-red-500/60' : 'border-ink-border focus:border-saffron/50'}`}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-pearl-faint">
          {hint}
        </p>
      )}
    </div>
  )
}
