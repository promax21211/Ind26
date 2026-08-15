export function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(email) {
  return typeof email === 'string' && EMAIL_RE.test(email)
}

// Shape returned to the client for the signed-in user. Never include
// password_hash here.
export function publicUser(row) {
  return {
    email: row.email,
    promoCode: row.promo_code || null,
    discordStatus: row.discord_status,
    joinedAt: row.created_at,
  }
}
