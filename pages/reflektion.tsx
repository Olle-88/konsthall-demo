
// pages/reflekt.tsx
import { useState } from "react"
import Head from "next/head"

// Fixar att TypeScript/JSX förstår <df-messenger>
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "df-messenger": any
    }
  }
}

export default function Reflekt() {
  const [namn, setNamn] = useState("")
  const [meddelande, setMeddelande] = useState("")
  const [skickad, setSkickad] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/api/reflektion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ namn, meddelande }),
    })

    if (res.ok) {
      setSkickad(true)
      setNamn("")
      setMeddelande("")
    } else {
      alert("Något gick fel")
    }
  }

  const inputClass =
    "w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"

  return (
    <>
      {/* Laddar in Dialogflow Messenger-scriptet */}
      <Head>
        <script
          src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"
          async
        ></script>
      </Head>

      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Reflektion & bidra</h1>
        <p className="mb-4">
          Dela med dig av dina tankar kring konstverken och utställningen.
        </p>

        {!skickad ? (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <input
              type="text"
              placeholder="Ditt namn"
              value={namn}
              onChange={(e) => setNamn(e.target.value)}
              className={inputClass}
              required
            />
            <textarea
              placeholder="Ditt meddelande"
              value={meddelande}
              onChange={(e) => setMeddelande(e.target.value)}
              className={inputClass}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Skicka reflektion
            </button>
          </form>
        ) : (
          <p className="text-green-400 mt-4">Tack för din reflektion!</p>
        )}
      </div>

      {/* Dialogflow chatbot längst ner till höger */}
      <df-messenger
        intent="WELCOME"
        chat-title="Konstboten"
        agent-id="c28d8b31-05a0-4078-b3b4-853f943e2c86"
        language-code="sv"
      ></df-messenger>
    </>
  )
}

// Layoutinställningar (om du använder pageConfig i layout-komponent)
Reflekt.pageConfig = {
  bgClass: "bg-[url('/images/reflektion-bg.jpg')] bg-cover bg-center",
  textClass: "text-white",
}
