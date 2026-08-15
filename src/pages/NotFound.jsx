import { Compass } from 'lucide-react'
import PageFade from '../components/ui/PageFade'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <PageFade className="container-page flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-ink-border bg-white/[0.03]">
        <Compass size={24} className="text-saffron-soft" />
      </div>
      <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-pearl">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-pearl-dim">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Button to="/" variant="primary" className="mt-7">
        Back to Home
      </Button>
    </PageFade>
  )
}
