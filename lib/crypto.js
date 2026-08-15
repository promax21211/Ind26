// Shared crypto helpers for Pages Functions. Uses the Web Crypto API that is
// built into the Workers runtime — no external dependency needed.
// Passwords are never stored or logged in plain text; only a salted
// PBKDF2 hash is persisted to D1.

const PBKDF2_ITERATIONS = 100000

function bufferToHex(buffer) {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function hexToBuffer(hex) {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16)
  }
  return bytes.buffer
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
}

export async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )
  const derived = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    keyMaterial,
    256
  )
  return `${bufferToHex(salt.buffer)}:${bufferToHex(derived)}`
}

export async function verifyPassword(password, stored) {
  const [saltHex, hashHex] = (stored || '').split(':')
  if (!saltHex || !hashHex) return false
  const salt = hexToBuffer(saltHex)
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )
  const derived = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    keyMaterial,
    256
  )
  return timingSafeEqual(bufferToHex(derived), hashHex)
}

function base64UrlEncode(str) {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlDecode(str) {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/').padEnd(str.length + ((4 - (str.length % 4)) % 4), '=')
  return atob(padded)
}

async function hmac(data, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return base64UrlEncode(String.fromCharCode(...new Uint8Array(sig)))
}

// Minimal signed, stateless session token: base64url(payload) + "." + HMAC signature.
// Not encrypted — do not put sensitive data (like a password) in the payload.
export async function signSession(payload, secret) {
  const body = base64UrlEncode(JSON.stringify(payload))
  const signature = await hmac(body, secret)
  return `${body}.${signature}`
}

export async function verifySession(token, secret) {
  if (!token || !token.includes('.')) return null
  const [body, signature] = token.split('.')
  const expected = await hmac(body, secret)
  if (!timingSafeEqual(signature, expected)) return null
  try {
    const payload = JSON.parse(base64UrlDecode(body))
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}
