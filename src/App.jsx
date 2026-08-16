import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PublicLayout from './components/layout/PublicLayout'
import AuthLayout from './components/layout/AuthLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import ProtectedRoute from './components/ui/ProtectedRoute'

import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import SignupSuccess from './pages/SignupSuccess'
import Dashboard from './pages/Dashboard'
import DashboardRewards from './pages/DashboardRewards'
import Account from './pages/Account'
import DiscordVerification from './pages/DiscordVerification'
import Admin from './pages/Admin'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup-success" element={<SignupSuccess />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/rewards" element={<DashboardRewards />} />
          <Route path="/dashboard/account" element={<Account />} />
          <Route path="/dashboard/discord" element={<DiscordVerification />} />
        </Route>

        {/* Internal preview, intentionally not linked from public nav. */}
        <Route path="/admin" element={<Admin />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}
