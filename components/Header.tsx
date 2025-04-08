import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-900 via-slate-800 to-indigo-900 p-4 shadow-md flex justify-center gap-8">
      <Link href="/" className="text-white hover:text-indigo-300 transition-colors">Start</Link>
      <Link href="/besok" className="text-white hover:text-indigo-300 transition-colors">Inför besök</Link>
      <Link href="/utforska" className="text-white hover:text-indigo-300 transition-colors">Utforska</Link>
      <Link href="/reflektion" className="text-white hover:text-indigo-300 transition-colors">Reflektion</Link>
      <Link href="/kontakt" className="text-white hover:text-indigo-300 transition-colors">Kontakt</Link>
      <Link href="/admin-konstverk" className="text-white hover:text-indigo-300 transition-colors">Admin</Link>
    </header>
  );
}
