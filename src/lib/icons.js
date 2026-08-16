// Explicit icon registry so components can look up an icon by name (as
// stored in platforms.js / passed as a prop) without importing the entire
// lucide-react library, which otherwise bloats the production bundle.
import {
  Gift,
  Cpu,
  Coins,
  Award,
  BookOpen,
  Sparkles,
  LayoutGrid,
  Ticket,
  MessageCircle,
  Users,
  UserPlus,
  ShieldCheck,
  Activity,
} from 'lucide-react'

export const ICONS = {
  Gift,
  Cpu,
  Coins,
  Award,
  BookOpen,
  Sparkles,
  LayoutGrid,
  Ticket,
  MessageCircle,
  Users,
  UserPlus,
  ShieldCheck,
  Activity,
}

export function getIcon(name, fallback = Sparkles) {
  return ICONS[name] || fallback
}
