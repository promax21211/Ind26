import { CheckCircle2, Ticket } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import PageFade from '../components/ui/PageFade'
import { useAuth } from '../context/AuthContext'

export default function SignupSuccess() {
  const { account } = useAuth()

  if (!account) {
    return (
      <PageFade className="w-full max-w-md text-center">
        <Card className="p-9">
          <h1 className="font-display text-xl font-semibold text-pearl">No account found yet</h1>
          <p className="mt-2 text-sm text-pearl-dim">
            Create an account first to see your confirmation here.
          </p>
          <Button to="/signup" variant="primary" className="mt-6">
            Create Account
          </Button>
        </Card>
      </PageFade>
    )
  }

  return (
    <PageFade className="w-full max-w-md text-center">
      <Card className="p-9 sm:p-11">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-flag-green/30 bg-flag-green/10">
          <CheckCircle2 size={26} className="text-emerald-400" />
        </div>

        <h1 className="mt-6 font-display text-2xl font-semibold tracking-tight text-pearl sm:text-3xl">
          Account Created
        </h1>
        <p className="mt-2 text-sm text-pearl-dim">Your account has been created successfully.</p>

        <div className="mt-7 flex items-center justify-between rounded-xl border border-ink-border bg-white/[0.03] px-4 py-3.5 text-left">
          <span className="flex items-center gap-2 text-sm text-pearl-dim">
            <Ticket size={16} className="text-saffron-soft" />
            Promo Code
          </span>
          <span className="font-mono text-sm font-medium tracking-wide text-pearl">
            {account.promoCode || 'Not applied'}
          </span>
        </div>

        <Button to="/dashboard" variant="primary" size="lg" className="mt-8 w-full">
          Go to Dashboard
        </Button>
      </Card>
    </PageFade>
  )
}
