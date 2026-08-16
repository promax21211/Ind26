import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarClock, Users } from 'lucide-react'
import Button from '../ui/Button'
import ChakraMotif from '../ui/ChakraMotif'
import Countdown from '../ui/Countdown'

export default function Hero() {
  const [totalUsers, setTotalUsers] = useState(null)

  useEffect(() => {
    fetch('/api/stats')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data?.totalUsers && setTotalUsers(data.totalUsers))
      .catch(() => {})
  }, [])

  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-14 sm:pb-28 sm:pt-20">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] sm:-right-20 sm:-top-20">
        <ChakraMotif className="h-full w-full" opacity={0.16} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-saffron-glow" />

      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <span className="eyebrow">
            <span className="h-1 w-1 rounded-full bg-saffron" />
            79 Years of Independence
          </span>

          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-pearl sm:text-6xl">
            Independence
            <br />
            <span className="bg-gradient-to-r from-saffron via-pearl to-flag-green bg-clip-text text-transparent">
              Rewards 2026
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-pearl-dim sm:text-lg">
            Mark India's 79th Independence Day by exploring a curated set of earning
            opportunities, reward platforms, gift-card opportunities and promotional offers —
            all in one place, for the duration of the campaign.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button to="/signup" size="lg" variant="primary">
              Get Started
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => document.getElementById('rewards')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Rewards
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-pearl-faint">
            <span className="flex items-center gap-2">
              <CalendarClock size={15} />
              Campaign ends 16 August 2026
            </span>
            {totalUsers > 0 && (
              <span className="flex items-center gap-2">
                <Users size={15} />
                {totalUsers.toLocaleString()} {totalUsers === 1 ? 'member has' : 'members have'} joined
              </span>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14"
        >
          <p className="eyebrow mb-4">Campaign closes in</p>
          <Countdown />
        </motion.div>
      </div>
    </section>
  )
}
