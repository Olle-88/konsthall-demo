// components/Layout.tsx
import { ReactNode, CSSProperties } from 'react'
import { useRouter } from 'next/router'
import Header from './Header'
import Footer from './Footer'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useRouter()

  // Sätt bakgrund
  const style: CSSProperties = {}
  if (pathname === '/') {
    style.backgroundImage = "url('/images/bakgrund-startsida.jpg')"
    style.backgroundSize = 'cover'
    style.backgroundPosition = 'center'
  } else if (pathname === '/besok') {
    style.backgroundColor = '#f472b6'
  }

  return (
    <div className="relative flex flex-col min-h-screen" style={style}>
      {pathname === '/' && (
        <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none" />
      )}

      {/* flytta ner under header */}
      <div className="relative z-10 flex flex-col flex-grow pt-16">
        <Header />

        <main className="flex-grow p-6 max-w-3xl mx-auto text-white">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  )
}
