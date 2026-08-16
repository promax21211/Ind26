import { json } from '../../lib/http.js'

// Public — deliberately exposes nothing beyond a coarse total count.
// Used for an honest "X members joined" style line on the landing page
// instead of a hardcoded/fabricated number.
export async function onRequestGet({ env }) {
  if (!env.DB) return json({ totalUsers: null })

  try {
    const row = await env.DB.prepare('SELECT COUNT(*) AS count FROM users').first()
    return json({ totalUsers: row.count })
  } catch (err) {
    console.error('stats failed:', err.message, err.stack)
    return json({ totalUsers: null })
  }
}
