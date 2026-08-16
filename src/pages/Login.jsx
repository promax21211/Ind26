import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Card from '../components/ui/Card'
import FormField from '../components/ui/FormField'
import Button from '../components/ui/Button'
import PageFade from '../components/ui/PageFade'
import { useAuth } from '../context/AuthContext'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')

  function validate() {
    const next = {}
    if (!email.trim()) next.email = 'Enter your email to continue.'
    else if (!EMAIL_RE.test(email)) next.email = 'Enter a valid email address.'
    if (!password) next.password = 'Enter your password to continue.'
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
      const result = await login({ email: email.trim(), password })
      if (result.ok) {
        navigate(location.state?.from || '/dashboard')
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
          <span className="h-1 w-1 rounded-full bg-flag-green" />
          Freedom79 Account
        </span>
        <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-pearl sm:text-3xl">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-pearl-dim">Sign in to continue exploring opportunities.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
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
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          {formError && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/5 px-3 py-2.5 text-sm text-red-400">
              {formError}
            </p>
          )}

          <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
            {loading ? 'Signing In' : 'Sign In'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-pearl-dim">
          Don&apos;t have an account?{' '}
          <Button variant="ghost" size="sm" to="/signup" className="!inline-flex !px-1.5 !py-1">
            Create Account
          </Button>
        </p>
      </Card>
    </PageFade>
  )
}
