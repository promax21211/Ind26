import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/landing/Hero'
import HowItWorks from '../components/landing/HowItWorks'
import RewardsTeaser from '../components/landing/RewardsTeaser'

export default function Landing() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    // Wait a tick for the page to render before scrolling.
    const timeout = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
    return () => clearTimeout(timeout)
  }, [hash])

  return (
    <>
      <Hero />
      <HowItWorks />
      <RewardsTeaser />
    </>
  )
}
