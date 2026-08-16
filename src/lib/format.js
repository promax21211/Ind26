export function formatDate(value, options) {
  if (!value) return '—'
  const iso = value.includes('T') ? value : `${value.replace(' ', 'T')}Z`
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString(undefined, options || { year: 'numeric', month: 'long', day: 'numeric' })
}
