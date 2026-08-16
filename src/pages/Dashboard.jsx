import PageFade from '../components/ui/PageFade'
import StatCard from '../components/ui/StatCard'
import PlatformCard from '../components/ui/PlatformCard'
import { platforms } from '../data/platforms'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { account } = useAuth()
  const discordVerified = account?.discordStatus === 'verified'

  return (
    <PageFade>
      <span className="eyebrow">
        <span className="h-1 w-1 rounded-full bg-saffron" />
        Welcome back
      </span>
      <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-pearl sm:text-3xl">
        Independence Rewards 2026
      </h1>
      <p className="mt-2 text-sm text-pearl-dim">
        {account ? `Welcome back, ${account.nickname || account.name}` : 'Explore this campaign\u2019s opportunities.'}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Opportunities" value={platforms.length} icon="LayoutGrid" accent="saffron" />
        <StatCard
          label="Promo Status"
          value={account?.promoCode ? 'Active' : 'Not Applied'}
          icon="Ticket"
          accent={account?.promoCode ? 'green' : 'pearl'}
        />
        <StatCard
          label="Discord Verification"
          value={discordVerified ? 'Verified' : 'Not Verified'}
          icon="MessageCircle"
          accent={discordVerified ? 'green' : 'pearl'}
        />
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl font-semibold text-pearl">Opportunities</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {platforms.map((platform) => (
            <PlatformCard key={platform.id} platform={platform} />
          ))}
        </div>
      </div>
    </PageFade>
  )
}
