import { useState } from 'react'
import { MessageCircle, Info } from 'lucide-react'
import PageFade from '../components/ui/PageFade'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'

export default function DiscordVerification() {
  const { account } = useAuth()
  const [showNotice, setShowNotice] = useState(false)
  const verified = account?.discordStatus === 'verified'

  return (
    <PageFade className="max-w-2xl">
      <span className="eyebrow">
        <span className="h-1 w-1 rounded-full bg-flag-green" />
        Community
      </span>
      <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-pearl sm:text-3xl">
        Discord Verification
      </h1>
      <p className="mt-2 text-sm text-pearl-dim">
        Connect your Discord account to verify your participation.
      </p>

      <Card className="mt-8 p-7 text-center sm:p-9">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-ink-border bg-white/[0.03]">
          <MessageCircle size={24} className="text-pearl-faint" />
        </div>

        <div className="mt-5 flex justify-center">
          <Badge tone={verified ? 'green' : 'neutral'} dot>
            {verified ? 'Verified' : 'Not Verified'}
          </Badge>
        </div>

        <Button
          variant="primary"
          size="lg"
          className="mx-auto mt-6"
          onClick={() => setShowNotice(true)}
          disabled={verified}
        >
          {verified ? 'Verified with Discord' : 'Verify with Discord'}
        </Button>

        {showNotice && !verified && (
          <p className="mt-4 text-sm text-pearl-dim">
            Discord verification isn&apos;t connected yet. Check back once it launches.
          </p>
        )}
      </Card>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-ink-border bg-white/[0.02] p-4 sm:p-5">
        <Info size={17} className="mt-0.5 flex-none text-pearl-faint" />
        <p className="text-sm leading-relaxed text-pearl-faint">
          This is a preview of the verification screen. Discord verification will be connected to
          your account soon — this button does not sign you into Discord yet.
        </p>
      </div>
    </PageFade>
  )
}
