import { buildClearedSessionCookie } from '../../lib/cookies.js'
import { json } from '../../lib/http.js'

export async function onRequestPost({ request }) {
  return json({ ok: true }, { headers: { 'Set-Cookie': buildClearedSessionCookie(request) } })
}
