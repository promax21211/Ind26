import { hashPassword, signSession } from '../../lib/crypto.js'
import { buildSessionCookie, SESSION_MAX_AGE_SECONDS } from '../../lib/cookies.js'
import { json, isValidEmail, publicUser } from '../../lib/http.js'

export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ error: 'Database is not configured yet.' }, { status: 500 })
  if (!env.SESSION_SECRET) return json({ error: 'Server is not configured yet.' }, { status: 500 })

  try {
    let body
    try {
      body = await request.json()
    } catch {
      return json({ error: 'Invalid request body.' }, { status: 400 })
    }

    const email = (body.email || '').trim().toLowerCase()
    const password = body.password || ''
    const name = (body.name || '').trim()
    const nickname = (body.nickname || '').trim() || null
    const promoCode = (body.promoCode || '').trim().toUpperCase() || null

    if (!isValidEmail(email)) {
      return json({ error: 'Enter a valid email address.' }, { status: 400 })
    }
    if (password.length < 8) {
      return json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
    }
    if (!name) {
      return json({ error: 'Enter your name.' }, { status: 400 })
    }

    const existing = await env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first()
    if (existing) {
      return json({ error: 'An account with this email already exists.' }, { status: 409 })
    }

    const passwordHash = await hashPassword(password)

    // Plain INSERT, no RETURNING — D1 has been reported to sporadically
    // return zero rows from RETURNING even when the write itself succeeds,
    // which crashes anything that trusts its result. A follow-up SELECT is
    // slightly slower but does not have that failure mode.
    await env.DB.prepare(
      `INSERT INTO users (email, password_hash, name, nickname, promo_code, discord_status, created_at)
       VALUES (?, ?, ?, ?, ?, 'not_verified', datetime('now'))`
    )
      .bind(email, passwordHash, name, nickname, promoCode)
      .run()

    const user = await env.DB.prepare(
      'SELECT email, name, nickname, promo_code, discord_status, created_at FROM users WHERE email = ?'
    )
      .bind(email)
      .first()

    if (!user) {
      // The insert didn't error, but we couldn't read the row back.
      console.error('signup: insert succeeded but follow-up SELECT found no row', { email })
      return json({ error: 'Account created, but something went wrong loading it. Please try logging in.' }, { status: 500 })
    }

    const now = Math.floor(Date.now() / 1000)
    const token = await signSession(
      { sub: user.email, iat: now, exp: now + SESSION_MAX_AGE_SECONDS },
      env.SESSION_SECRET
    )

    return json(
      { user: publicUser(user) },
      { status: 201, headers: { 'Set-Cookie': buildSessionCookie(token, request) } }
    )
  } catch (err) {
    console.error('signup failed:', err.message, err.stack)
    return json({ error: 'Something went wrong creating your account. Please try again.' }, { status: 500 })
  }
}
