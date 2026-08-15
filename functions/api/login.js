import { verifyPassword, signSession } from '../../lib/crypto.js'
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

  if (!isValidEmail(email) || !password) {
    return json({ error: 'Invalid email or password.' }, { status: 401 })
  }

  const user = await env.DB.prepare(
    'SELECT id, email, password_hash, promo_code, discord_status, created_at FROM users WHERE email = ?'
  )
    .bind(email)
    .first()

  const validPassword = user ? await verifyPassword(password, user.password_hash) : false
  if (!user || !validPassword) {
    return json({ error: 'Invalid email or password.' }, { status: 401 })
  }

  const now = Math.floor(Date.now() / 1000)
  const token = await signSession(
    { sub: user.email, iat: now, exp: now + SESSION_MAX_AGE_SECONDS },
    env.SESSION_SECRET
  )

  return json(
    { user: publicUser(user) },
    { status: 200, headers: { 'Set-Cookie': buildSessionCookie(token, request) } }
  )
}
