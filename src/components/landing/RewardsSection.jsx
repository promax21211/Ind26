import { motion } from 'framer-motion'
import PlatformCard from '../ui/PlatformCard'
import { platforms } from '../../data/platforms'

export default function RewardsSection() {
  return (
    <section id="rewards" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-green-glow" />
      <div className="container-page relative">
        <div className="max-w-xl">
          <span className="eyebrow">
            <span className="h-1 w-1 rounded-full bg-saffron" />
            Opportunities
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-pearl sm:text-4xl">
            Rewards &amp; opportunities
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-pearl-dim sm:text-base">
            A curated list of independent, third-party platforms. Each one sets its own terms,
            eligibility and payouts.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <PlatformCard platform={platform} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
