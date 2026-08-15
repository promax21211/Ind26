import { hashPassword, signSession } from '../../lib/crypto.js'
import { buildSessionCookie, SESSION_MAX_AGE_SECONDS } from '../../lib/cookies.js'
import { json, isValidEmail, publicUser } from '../../lib/http.js'

export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ error: 'Database is not configured yet.' }, { status: 500 })
  if (!env.SESSION_SECRET) return json({ error: 'Server is not configured yet.' }, { status: 500 })

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const email = (body.email || '').trim().toLowerCase()
  const password = body.password || ''
  const promoCode = (body.promoCode || '').trim().toUpperCase() || null

  if (!isValidEmail(email)) {
    return json({ error: 'Enter a valid email address.' }, { status: 400 })
  }
  if (password.length < 8) {
    return json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
  }

  const existing = await env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first()
  if (existing) {
    return json({ error: 'An account with this email already exists.' }, { status: 409 })
  }

  const passwordHash = await hashPassword(password)

  const inserted = await env.DB.prepare(
    `INSERT INTO users (email, password_hash, promo_code, discord_status, created_at)
     VALUES (?, ?, ?, 'not_verified', datetime('now'))
     RETURNING id, email, promo_code, discord_status, created_at`
  )
    .bind(email, passwordHash, promoCode)
    .first()

  const now = Math.floor(Date.now() / 1000)
  const token = await signSession(
    { sub: inserted.email, iat: now, exp: now + SESSION_MAX_AGE_SECONDS },
    env.SESSION_SECRET
  )

  return json(
    { user: publicUser(inserted) },
    { status: 201, headers: { 'Set-Cookie': buildSessionCookie(token, request) } }
  )
}
