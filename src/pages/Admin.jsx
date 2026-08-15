import { useState } from 'react'
import { ShieldAlert, Lock } from 'lucide-react'
import PageFade from '../components/ui/PageFade'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import FormField from '../components/ui/FormField'
import Badge from '../components/ui/Badge'
import StatCard from '../components/ui/StatCard'
import { formatDate } from '../lib/format'

const DISCORD_LABEL = { verified: 'Verified', pending: 'Pending', not_verified: 'Not Verified' }
const DISCORD_TONE = { verified: 'green', pending: 'pending', not_verified: 'neutral' }

async function fetchJson(url, adminKey) {
  const res = await fetch(url, { headers: { 'X-Admin-Key': adminKey } })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Request failed.')
  return data
}

function AdminGate({ onUnlock }) {
  const [key, setKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await onUnlock(key)
    } catch (err) {
      setError(err.message || 'Could not verify this admin key.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageFade className="mx-auto max-w-sm py-10">
      <Card className="p-7 text-center sm:p-9">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-ink-border bg-white/[0.03]">
          <Lock size={20} className="text-saffron-soft" />
        </div>
        <h1 className="mt-5 font-display text-xl font-semibold text-pearl">Admin Preview</h1>
        <p className="mt-2 text-sm text-pearl-dim">
          Enter the admin key to view live campaign data. Not linked from the public site.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
          <FormField
            id="adminKey"
            label="Admin Key"
            type="password"
            placeholder="Enter admin key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            error={error || undefined}
          />
          <Button type="submit" variant="primary" loading={loading} className="w-full">
            Unlock
          </Button>
        </form>
      </Card>
    </PageFade>
  )
}

export default function Admin() {
  const [adminKey, setAdminKey] = useState(null)
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')

  async function loadData(key) {
    const [statsData, usersData] = await Promise.all([
      fetchJson('/api/admin/stats', key),
      fetchJson('/api/admin/users', key),
    ])
    setStats(statsData)
    setUsers(usersData.users)
    setAdminKey(key)
  }

  async function handleRefresh() {
    if (!adminKey) return
    setRefreshing(true)
    setError('')
    try {
      await loadData(adminKey)
    } catch (err) {
      setError(err.message || 'Could not refresh admin data.')
    } finally {
      setRefreshing(false)
    }
  }

  if (!adminKey) {
    return <AdminGate onUnlock={loadData} />
  }

  return (
    <PageFade className="container-page py-10 sm:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="eyebrow">
            <span className="h-1 w-1 rounded-full bg-saffron" />
            Internal
          </span>
          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-pearl sm:text-3xl">
            Admin Dashboard
          </h1>
        </div>
        <Button variant="secondary" size="sm" onClick={handleRefresh} loading={refreshing}>
          Refresh
        </Button>
      </div>

      <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/[0.06] px-4 py-3">
        <ShieldAlert size={16} className="mt-0.5 flex-none text-amber-400" />
        <p className="text-xs leading-relaxed text-amber-200/80">
          Internal preview — not linked from the public site. Passwords, password hashes, session
          tokens and API keys are never displayed here.
        </p>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      {stats && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Users" value={stats.totalUsers} icon="Users" accent="saffron" />
          <StatCard label="Today's Signups" value={stats.signupsToday} icon="UserPlus" accent="saffron" />
          <StatCard label="Promo Code Uses" value={stats.promoUses} icon="Ticket" accent="green" />
          <StatCard label="Discord Verified" value={stats.discordVerified} icon="ShieldCheck" accent="green" />
        </div>
      )}

      <Card className="mt-8 overflow-hidden">
        <div className="border-b border-ink-border px-6 py-4">
          <h2 className="font-display text-base font-semibold text-pearl">Recent Users</h2>
        </div>

        {!users || users.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-pearl-faint">No users yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ink-border text-xs uppercase tracking-wide text-pearl-faint">
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Promo</th>
                  <th className="px-6 py-3 font-medium">Registered</th>
                  <th className="px-6 py-3 font-medium">Discord Status</th>
                </tr>
              </thead>
              <tbody className="font-mono text-[13px]">
                {users.map((user) => (
                  <tr key={user.email} className="border-b border-ink-border last:border-b-0">
                    <td className="px-6 py-3.5 text-pearl">{user.email}</td>
                    <td className="px-6 py-3.5">
                      <Badge tone={user.promo ? 'green' : 'neutral'}>{user.promo ? 'Yes' : 'No'}</Badge>
                    </td>
                    <td className="px-6 py-3.5 text-pearl-dim">
                      {formatDate(user.registered, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-3.5">
                      <Badge tone={DISCORD_TONE[user.discord] || 'neutral'}>
                        {DISCORD_LABEL[user.discord] || 'Not Verified'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </PageFade>
  )
}
