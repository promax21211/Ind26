import { verifySession } from '../../lib/crypto.js'
import { readSessionCookie } from '../../lib/cookies.js'
import { json, publicUser } from '../../lib/http.js'

export async function onRequestGet({ request, env }) {
  if (!env.DB || !env.SESSION_SECRET) {
    return json({ error: 'Server is not configured yet.' }, { status: 500 })
  }

  try {
    const token = readSessionCookie(request)
    const payload = token ? await verifySession(token, env.SESSION_SECRET) : null
    if (!payload) return json({ error: 'Not signed in.' }, { status: 401 })

    const user = await env.DB.prepare(
      'SELECT email, name, nickname, promo_code, discord_status, created_at FROM users WHERE email = ?'
    )
      .bind(payload.sub)
      .first()

    if (!user) return json({ error: 'Not signed in.' }, { status: 401 })

    return json({ user: publicUser(user) })
  } catch (err) {
    console.error('me failed:', err.message, err.stack)
    return json({ error: 'Something went wrong loading your session.' }, { status: 500 })
  }
}
