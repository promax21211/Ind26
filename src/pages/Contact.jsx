import { Mail } from 'lucide-react'
import PageFade from '../components/ui/PageFade'

export default function Contact() {
  return (
    <PageFade className="container-page max-w-3xl py-16 sm:py-24">
      <span className="eyebrow">
        <span className="h-1 w-1 rounded-full bg-flag-green" />
        Get in touch
      </span>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-pearl">Contact</h1>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-pearl-dim">
        Questions about the Independence Day 2026 campaign, your account, or a listed platform?
        Reach out and the Freedom79 team will get back to you.
      </p>
      <div className="mt-6 inline-flex items-center gap-2.5 rounded-xl border border-ink-border bg-white/[0.03] px-4 py-3 text-sm text-pearl-dim">
        <Mail size={16} className="text-saffron-soft" />
        support@freedom79.example
      </div>
    </PageFade>
  )
}
