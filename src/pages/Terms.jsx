import PageFade from '../components/ui/PageFade'

export default function Terms() {
  return (
    <PageFade className="container-page max-w-3xl py-16 sm:py-24">
      <span className="eyebrow">
        <span className="h-1 w-1 rounded-full bg-saffron" />
        Legal
      </span>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-pearl">Terms of Use</h1>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-pearl-dim">
        This is a placeholder terms page for the Freedom79 preview build. Freedom79 is an
        Independence Day 2026 campaign available until 16 August 2026. It lists independent,
        third-party platforms; Freedom79 does not control their offers, eligibility or payouts,
        and does not guarantee any reward. Each linked platform has its own terms, which apply
        once you leave Freedom79. Full terms of use will be published before the campaign accepts
        real user accounts.
      </p>
    </PageFade>
  )
}
