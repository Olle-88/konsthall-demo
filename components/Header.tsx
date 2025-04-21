// components/Header.tsx
import Link from 'next/link'

export default function Header() {
  const navItems = [
    { href: '/', label: 'Start' },
    { href: '/besok', label: 'Inför besök' },
    { href: '/utforska', label: 'Utforska' },
    { href: '/reflektion', label: 'Reflektion' },
    { href: '/kontakt', label: 'Kontakt' },
    { href: '/admin-konstverk', label: 'Admin' },
  ]

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-indigo-900 via-slate-800 to-indigo-900 shadow-md">
      <nav className="max-w-6xl mx-auto flex items-center px-6 py-3 space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-white hover:text-blue-300 transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
