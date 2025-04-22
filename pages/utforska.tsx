// pages/utforska.tsx
import { useEffect, useState } from 'react'
import Comments from '@/components/Comments'

type Art = {
  id: number
  titel: string
  konstnar: string
  beskrivning: string
  bildUrl?: string
}

export default function Utforska() {
  const [artworks, setArtworks] = useState<Art[]>([])

  useEffect(() => {
    fetch('/api/konstverk')
      .then((res) => res.json())
      .then((data: Art[]) => setArtworks(data))
      .catch(console.error)
  }, [])

  return (
    <>
      {/* --- Presentation av nya konstverk --- */}
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Nya konstverk</h1>
        {artworks.length === 0 ? (
          <p>Hämtar konstverk…</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {artworks.map((v) => (
              <div
                key={v.id}
                className="bg-white/10 p-4 rounded-lg shadow-lg flex flex-col"
              >
                {v.bildUrl && (
                  <img
                    src={v.bildUrl}
                    alt={v.titel}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}
                <h2 className="text-xl font-semibold">{v.titel}</h2>
                <p className="italic text-sm mb-2">av {v.konstnar}</p>
                <p className="text-sm">{v.beskrivning}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- Kommentarer via Utterances --- */}
      <section>
        <h1 className="text-3xl font-bold mb-4">Kommentarer</h1>
        <Comments />
      </section>
    </>
  )
}

// Per‑sida‑bakgrundskonfig (valfritt)
Utforska.pageConfig = {
  bgClass: "bg-[url('/images/utforska-bg.jpg')] bg-cover bg-center",
  textClass: 'text-white',
}
