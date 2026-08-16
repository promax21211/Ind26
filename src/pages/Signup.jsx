import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import Card from '../components/ui/Card'
import FormField from '../components/ui/FormField'
import Button from '../components/ui/Button'
import PageFade from '../components/ui/PageFade'
import { useAuth } from '../context/AuthContext'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()

  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')

  function validate() {
    const next = {}
    if (!name.trim()) next.name = 'Enter your name to continue.'

    if (!email.trim()) next.email = 'Enter your email to continue.'
    else if (!EMAIL_RE.test(email)) next.email = 'Enter a valid email address.'

    if (!password) next.password = 'Create a password to continue.'
    else if (password.length < 8) next.password = 'Use at least 8 characters.'

    return next
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError('')
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setLoading(true)
    try {
      const result = await signup({ email: email.trim(), password, name: name.trim(), nickname, promoCode })
      if (result.ok) {
        navigate('/signup-success')
      } else {
        setFormError(result.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageFade className="w-full max-w-md">
      <Card className="p-7 sm:p-9">
        <span className="eyebrow">
          <span className="h-1 w-1 rounded-full bg-saffron" />
          Freedom79 Account
        </span>
        <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-pearl sm:text-3xl">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-pearl-dim">
          Join the Independence Day 2026 campaign to explore available opportunities.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          <FormField
            id="name"
            label="Name"
            autoComplete="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
          />

          <FormField
            id="nickname"
            label="Nickname"
            optional
            autoComplete="nickname"
            placeholder="What should we call you?"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <FormField
            id="email"
            label="Gmail"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <FormField
            id="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            hint={!errors.password ? 'At least 8 characters.' : undefined}
          />

          <FormField
            id="promoCode"
            label="Promo Code"
            optional
            placeholder="IND26FREEDOM"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="[&_input]:tracking-widest [&_input]:uppercase [&_input::placeholder]:tracking-widest [&_input::placeholder]:normal-case"
          />

          {formError && <p className="text-sm text-red-400">{formError}</p>}

          <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
            {loading ? 'Creating Account' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-ink-border bg-white/[0.02] p-3.5">
          <ShieldCheck size={16} className="mt-0.5 flex-none text-flag-green" />
          <p className="text-xs leading-relaxed text-pearl-faint">
            Your password is securely protected and is never displayed in plain text, including
            to Freedom79 staff.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-pearl-dim">
          Already have an account?{' '}
          <Button variant="ghost" size="sm" to="/login" className="!inline-flex !px-1.5 !py-1">
            Sign In
          </Button>
        </p>
      </Card>
    </PageFade>
  )
}
