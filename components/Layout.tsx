// components/Layout.tsx
import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

type LayoutProps = {
  children: ReactNode
  bgClass?: string
  textClass?: string
}

export default function Layout({
  children,
  bgClass = '',
  textClass = 'text-white',
}: LayoutProps) {
  return (
    <div className={`relative flex flex-col min-h-screen ${bgClass}`}>
      {/* Overlay om bakgrunden är en bild */}
      {bgClass.startsWith('bg-[url') && (
        <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none" />
      )}

      <div className={`relative z-10 flex flex-col flex-grow pt-16 ${textClass}`}>
        <Header />
        <main className="flex-grow p-6 max-w-3xl mx-auto">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
