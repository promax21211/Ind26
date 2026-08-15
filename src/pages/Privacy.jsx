import PageFade from '../components/ui/PageFade'

export default function Privacy() {
  return (
    <PageFade className="container-page max-w-3xl py-16 sm:py-24">
      <span className="eyebrow">
        <span className="h-1 w-1 rounded-full bg-saffron" />
        Legal
      </span>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-pearl">Privacy Policy</h1>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-pearl-dim">
        This is a placeholder privacy policy for the Freedom79 preview build. Freedom79 currently
        stores an account email, a securely hashed password, an optional promo code and a Discord
        verification status. Passwords are never stored or shown in plain text. A full privacy
        policy — covering data retention, third-party platform links and contact details for data
        requests — will be published before the campaign accepts real user accounts.
      </p>
    </PageFade>
  )
}
