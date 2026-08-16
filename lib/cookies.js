const SESSION_COOKIE = 'freedom79_session'
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7 // 7 days

export function readSessionCookie(request) {
  const header = request.headers.get('Cookie') || ''
  const match = header.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`))
  return match ? decodeURIComponent(match[1]) : null
}

export function buildSessionCookie(token, request) {
  const isHttps = new URL(request.url).protocol === 'https:'
  const parts = [
    `${SESSION_COOKIE}=${encodeURIComponent(token)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${MAX_AGE_SECONDS}`,
  ]
  if (isHttps) parts.push('Secure')
  return parts.join('; ')
}

export function buildClearedSessionCookie(request) {
  const isHttps = new URL(request.url).protocol === 'https:'
  const parts = [`${SESSION_COOKIE}=`, 'Path=/', 'HttpOnly', 'SameSite=Lax', 'Max-Age=0']
  if (isHttps) parts.push('Secure')
  return parts.join('; ')
}

export const SESSION_MAX_AGE_SECONDS = MAX_AGE_SECONDS
