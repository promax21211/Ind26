import { motion } from 'framer-motion'
import { Info } from 'lucide-react'

const STEPS = [
  {
    number: '01',
    title: 'Create an Account',
    body: 'Create your account using your email and a password.',
  },
  {
    number: '02',
    title: 'Explore Opportunities',
    body: 'Browse the available third-party platforms.',
  },
  {
    number: '03',
    title: 'Start Exploring',
    body: "Open the relevant platform and follow its own terms and requirements.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-xl">
          <span className="eyebrow">
            <span className="h-1 w-1 rounded-full bg-flag-green" />
            The Process
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-pearl sm:text-4xl">
            How it works
          </h2>
        </div>

        <div className="relative mt-14 grid gap-8 sm:grid-cols-3 sm:gap-6">
          <div className="absolute left-0 right-0 top-[26px] hidden h-px bg-gradient-to-r from-saffron/40 via-pearl/20 to-flag-green/40 sm:block" />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-ink-border bg-void font-mono text-sm text-saffron-soft">
                {step.number}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-pearl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-pearl-dim">{step.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex items-start gap-3 rounded-2xl border border-ink-border bg-white/[0.02] p-4 sm:p-5">
          <Info size={17} className="mt-0.5 flex-none text-pearl-faint" />
          <p className="text-sm leading-relaxed text-pearl-faint">
            Third-party platforms have their own rules, terms and eligibility requirements.
            Freedom79 does not control or guarantee their offers — review each platform before
            participating.
          </p>
        </div>
      </div>
    </section>
  )
}
