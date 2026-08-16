import { createContext, useContext, useEffect, useState } from 'react'

// Talks to the Pages Functions API (see /functions/api). Session state is
// held in an httpOnly cookie set by the server, so this context just mirrors
// it in memory for the UI. During plain `npm run dev` (no Functions running)
// these calls will fail harmlessly and the app behaves as signed out —
// use `wrangler pages dev` for full-stack testing (see README.md).

const AuthContext = createContext(null)

async function parseJson(res) {
  try {
    return await res.json()
  } catch {
    return {}
  }
}

export function AuthProvider({ children }) {
  const [account, setAccount] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    refreshSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function refreshSession() {
    try {
      const res = await fetch('/api/me', { credentials: 'include' })
      if (res.ok) {
        const data = await parseJson(res)
        setAccount(data.user)
        setIsAuthenticated(true)
      } else {
        setAccount(null)
        setIsAuthenticated(false)
      }
    } catch {
      setAccount(null)
      setIsAuthenticated(false)
    } finally {
      setInitializing(false)
    }
  }

  async function signup({ email, password, name, nickname, promoCode }) {
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, nickname, promoCode }),
      })
      const data = await parseJson(res)
      if (!res.ok) return { ok: false, message: data.error || 'Could not create your account.' }
      setAccount(data.user)
      setIsAuthenticated(true)
      return { ok: true }
    } catch {
      return { ok: false, message: 'Could not reach the server. Please try again.' }
    }
  }

  async function login({ email, password }) {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await parseJson(res)
      if (!res.ok) return { ok: false, message: data.error || 'Invalid email or password.' }
      setAccount(data.user)
      setIsAuthenticated(true)
      return { ok: true }
    } catch {
      return { ok: false, message: 'Could not reach the server. Please try again.' }
    }
  }

  async function logout() {
    try {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' })
    } catch {
      // Clear local state regardless of network failure.
    }
    setAccount(null)
    setIsAuthenticated(false)
  }

  const value = { account, isAuthenticated, initializing, signup, login, logout, refreshSession }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
