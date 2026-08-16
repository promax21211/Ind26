import { json } from '../../../lib/http.js'
import { isAuthorizedAdmin } from '../../../lib/admin.js'

export async function onRequestGet({ request, env }) {
  if (!env.DB) return json({ error: 'Database is not configured yet.' }, { status: 500 })
  if (!isAuthorizedAdmin(request, env)) return json({ error: 'Unauthorized.' }, { status: 401 })

  try {
    const url = new URL(request.url)
    const limit = Math.min(Number(url.searchParams.get('limit')) || 50, 200)

    const { results } = await env.DB.prepare(
      `SELECT email, name, promo_code, discord_status, created_at
       FROM users
       ORDER BY created_at DESC
       LIMIT ?`
    )
      .bind(limit)
      .all()

    // password_hash is never selected above, so there is nothing sensitive to strip.
    return json({
      users: results.map((row) => ({
        email: row.email,
        name: row.name,
        promo: !!row.promo_code,
        registered: row.created_at,
        discord: row.discord_status,
      })),
    })
  } catch (err) {
    console.error('admin/users failed:', err.message, err.stack)
    return json({ error: 'Something went wrong loading users.' }, { status: 500 })
  }
}
