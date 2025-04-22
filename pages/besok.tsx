// pages/besok.tsx
export default function Besok() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Inför ditt besök</h1>
      <p>
        Här kan du ta del av introduktioner, berättelser, quiz och videor som
        förbereder dig inför ett besök.
      </p>
    </>
  )
}

// ⚙️ Ge /besok en rosa bakgrund och mörk text
Besok.pageConfig = {
  bgClass: 'bg-pink-400',
  textClass: 'text-gray-900'
}
