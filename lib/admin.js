// Lightweight admin protection for this preview build: a single shared key
// set as a Cloudflare secret, sent as the X-Admin-Key header. This is meant
// to be replaced with real admin accounts/roles once the project grows
// beyond a single campaign (see README.md → "Hardening the backend").
export function isAuthorizedAdmin(request, env) {
  if (!env.ADMIN_KEY) return false
  const provided = request.headers.get('X-Admin-Key') || ''
  return provided.length > 0 && provided === env.ADMIN_KEY
}
