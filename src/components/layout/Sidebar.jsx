import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Gift, UserCircle, MessageCircle, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const ITEMS = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard, end: true },
  { label: 'Rewards', to: '/dashboard/rewards', icon: Gift },
  { label: 'My Account', to: '/dashboard/account', icon: UserCircle },
  { label: 'Discord Verification', to: '/dashboard/discord', icon: MessageCircle },
]

export default function Sidebar({ onNavigate }) {
  const { account, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    onNavigate?.()
    navigate('/')
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-ink-border px-5 py-5">
        <p className="truncate text-sm font-medium text-pearl">{account?.email || 'Guest'}</p>
        <p className="mt-0.5 text-xs text-pearl-faint">Freedom79 member</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Dashboard">
        {ITEMS.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-saffron/10 text-saffron-soft'
                  : 'text-pearl-dim hover:bg-white/[0.04] hover:text-pearl'
              }`
            }
          >
            <Icon size={17} strokeWidth={1.85} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-ink-border px-3 py-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-pearl-dim transition-colors hover:bg-white/[0.04] hover:text-pearl"
        >
          <LogOut size={17} strokeWidth={1.85} />
          Logout
        </button>
      </div>
    </div>
  )
}
