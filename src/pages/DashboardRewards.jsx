import PageFade from '../components/ui/PageFade'
import PlatformCard from '../components/ui/PlatformCard'
import { platforms } from '../data/platforms'

export default function DashboardRewards() {
  return (
    <PageFade>
      <span className="eyebrow">
        <span className="h-1 w-1 rounded-full bg-saffron" />
        Opportunities
      </span>
      <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-pearl sm:text-3xl">
        Rewards
      </h1>
      <p className="mt-2 max-w-xl text-sm text-pearl-dim">
        Independent, third-party platforms available during the campaign. Each sets its own
        terms, eligibility and payouts.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {platforms.map((platform) => (
          <PlatformCard key={platform.id} platform={platform} />
        ))}
      </div>
    </PageFade>
  )
}
