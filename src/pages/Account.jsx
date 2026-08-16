import { Mail, User, AtSign, CalendarDays, Ticket, MessageCircle } from 'lucide-react'
import PageFade from '../components/ui/PageFade'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { useAuth } from '../context/AuthContext'
import { formatDate } from '../lib/format'

const DISCORD_LABEL = {
  verified: 'Verified',
  pending: 'Pending',
  not_verified: 'Not Verified',
}

function Row({ icon: Icon, label, children }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-ink-border py-4 last:border-b-0">
      <span className="flex items-center gap-2.5 text-sm text-pearl-dim">
        <Icon size={16} className="text-pearl-faint" />
        {label}
      </span>
      {children}
    </div>
  )
}

export default function Account() {
  const { account } = useAuth()
  const discordStatus = account?.discordStatus || 'not_verified'

  return (
    <PageFade className="max-w-2xl">
      <span className="eyebrow">
        <span className="h-1 w-1 rounded-full bg-saffron" />
        Account
      </span>
      <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-pearl sm:text-3xl">
        My Account
      </h1>
      <p className="mt-2 text-sm text-pearl-dim">
        Your account details for the Independence Day 2026 campaign.
      </p>

      <Card className="mt-8 px-6">
        <Row icon={User} label="Name">
          <span className="text-sm font-medium text-pearl">{account?.name || '—'}</span>
        </Row>
        {account?.nickname && (
          <Row icon={AtSign} label="Nickname">
            <span className="text-sm font-medium text-pearl">{account.nickname}</span>
          </Row>
        )}
        <Row icon={Mail} label="Email">
          <span className="text-sm font-medium text-pearl">{account?.email || '—'}</span>
        </Row>
        <Row icon={CalendarDays} label="Account creation date">
          <span className="text-sm font-medium text-pearl">{formatDate(account?.joinedAt)}</span>
        </Row>
        <Row icon={Ticket} label="Promo code status">
          {account?.promoCode ? (
            <Badge tone="green" dot>
              Applied · {account.promoCode}
            </Badge>
          ) : (
            <Badge tone="neutral">Not applied</Badge>
          )}
        </Row>
        <Row icon={MessageCircle} label="Discord verification">
          <Badge tone={discordStatus === 'verified' ? 'green' : discordStatus === 'pending' ? 'pending' : 'neutral'} dot>
            {DISCORD_LABEL[discordStatus] || 'Not Verified'}
          </Badge>
        </Row>
      </Card>

      <p className="mt-5 text-xs text-pearl-faint">
        Your password is never shown here or anywhere else in Freedom79.
      </p>
    </PageFade>
  )
}
