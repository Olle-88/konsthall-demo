// pages/kontakt.tsx
export default function Kontakt() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Kontakt & event</h1>
      <p>
        Hör av dig till oss, eller ta del av våra kommande utställningar och evenemang.
      </p>
    </>
  )
}

// Sätt upp bakgrunds‑ och textklasser just för denna sida:
Kontakt.pageConfig = {
  bgClass: 'bg-blue-800',   // t.ex. mörkblå bakgrund
  textClass: 'text-white'   // vit text
}
