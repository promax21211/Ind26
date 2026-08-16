import { json } from '../../../lib/http.js'
import { isAuthorizedAdmin } from '../../../lib/admin.js'

export async function onRequestGet({ request, env }) {
  if (!env.DB) return json({ error: 'Database is not configured yet.' }, { status: 500 })
  if (!isAuthorizedAdmin(request, env)) return json({ error: 'Unauthorized.' }, { status: 401 })

  try {
    const [totalUsers, signupsToday, promoUses, discordVerified] = await Promise.all([
      env.DB.prepare('SELECT COUNT(*) AS count FROM users').first(),
      env.DB.prepare("SELECT COUNT(*) AS count FROM users WHERE date(created_at) = date('now')").first(),
      env.DB.prepare('SELECT COUNT(*) AS count FROM users WHERE promo_code IS NOT NULL').first(),
      env.DB.prepare("SELECT COUNT(*) AS count FROM users WHERE discord_status = 'verified'").first(),
    ])

    return json({
      totalUsers: totalUsers.count,
      signupsToday: signupsToday.count,
      promoUses: promoUses.count,
      discordVerified: discordVerified.count,
    })
  } catch (err) {
    console.error('admin/stats failed:', err.message, err.stack)
    return json({ error: 'Something went wrong loading stats.' }, { status: 500 })
  }
}
