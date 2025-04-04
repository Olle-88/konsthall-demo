import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-100 p-4 shadow flex justify-center gap-6">
      <Link href="/" className="text-black hover:underline">Start</Link>
      <Link href="/besok" className="text-black hover:underline">Inför besök</Link>
      <Link href="/utforska" className="text-black hover:underline">Utforska</Link>
      <Link href="/reflektion" className="text-black hover:underline">Reflektion</Link>
      <Link href="/kontakt" className="text-black hover:underline">Kontakt</Link>
    </header>
  )
}
