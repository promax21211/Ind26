import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { getIcon } from '../../lib/icons'
import { platforms } from '../../data/platforms'

export default function RewardsTeaser() {
  return (
    <section id="rewards" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-green-glow" />
      <div className="container-page relative">
        <div className="mx-auto max-w-xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-1 w-1 rounded-full bg-saffron" />
            Opportunities
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-pearl sm:text-4xl">
            Rewards &amp; opportunities
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-pearl-dim sm:text-base">
            {platforms.length} curated third-party platforms are waiting — create a free
            account to see the full list and open each one.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="mx-auto mt-10 max-w-xl p-8 text-center sm:p-11">
            <div className="flex justify-center -space-x-3">
              {platforms.map((platform) => {
                const Icon = getIcon(platform.icon)
                return (
                  <div
                    key={platform.id}
                    className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-void bg-ink-light"
                    title={platform.name}
                  >
                    <Icon size={20} className="text-pearl-faint" strokeWidth={1.75} />
                  </div>
                )
              })}
            </div>

            <div className="mx-auto mt-6 flex h-9 w-9 items-center justify-center rounded-full border border-ink-border bg-white/[0.03]">
              <Lock size={15} className="text-saffron-soft" />
            </div>

            <h3 className="mt-4 font-display text-lg font-semibold text-pearl">
              Locked until you create an account
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-pearl-dim">
              Platform names, descriptions and outbound links unlock right after signup —
              it takes under a minute.
            </p>

            <Button to="/signup" variant="primary" size="lg" className="mx-auto mt-6">
              Create Free Account
            </Button>
            <p className="mt-4 text-sm text-pearl-dim">
              Already have an account?{' '}
              <Button variant="ghost" size="sm" to="/login" className="!inline-flex !px-1.5 !py-1">
                Sign In
              </Button>
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
