// Shared crypto helpers for Pages Functions.
// Plaintext version for a game/testing environment.
//
// IMPORTANT:
// This stores the password/text exactly as provided.
// Do NOT use this approach for real user passwords.

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false

  let mismatch = 0

  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }

  return mismatch === 0
}

// --------------------------------------------------
// PLAINTEXT STORAGE
// --------------------------------------------------

export async function hashPassword(password) {
  // No hashing is performed.
  // The original text is returned exactly as entered.
  return password
}

export async function verifyPassword(password, stored) {
  if (typeof password !== 'string' || typeof stored !== 'string') {
    return false
  }

  // Compare the entered text directly with the stored text.
  return timingSafeEqual(password, stored)
}

// --------------------------------------------------
// BASE64URL HELPERS
// --------------------------------------------------

function base64UrlEncode(str) {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

function base64UrlDecode(str) {
  const padded = str
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(
      str.length + ((4 - (str.length % 4)) % 4),
      '='
    )

  return atob(padded)
}

// --------------------------------------------------
// HMAC
// --------------------------------------------------

async function hmac(data, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    {
      name: 'HMAC',
      hash: 'SHA-256'
    },
    false,
    ['sign']
  )

  const sig = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(data)
  )

  return base64UrlEncode(
    String.fromCharCode(...new Uint8Array(sig))
  )
}

// --------------------------------------------------
// SESSION TOKEN
// --------------------------------------------------

// Minimal signed, stateless session token:
// base64url(payload) + "." + HMAC signature.
//
// The payload is NOT encrypted.
// Anyone who has the token can decode the payload,
// but they cannot modify it without the secret.

export async function signSession(payload, secret) {
  const body = base64UrlEncode(
    JSON.stringify(payload)
  )

  const signature = await hmac(body, secret)

  return `${body}.${signature}`
}

export async function verifySession(token, secret) {
  if (!token || !token.includes('.')) {
    return null
  }

  const [body, signature] = token.split('.')

  const expected = await hmac(body, secret)

  if (!timingSafeEqual(signature, expected)) {
    return null
  }

  try {
    const payload = JSON.parse(
      base64UrlDecode(body)
    )

    if (
      payload.exp &&
      payload.exp < Math.floor(Date.now() / 1000)
    ) {
      return null
    }

    return payload
  } catch {
    return null
  }
    }
