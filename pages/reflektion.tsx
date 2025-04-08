

import { useState } from "react";

export default function Reflekt() {
  const [namn, setNamn] = useState("");
  const [meddelande, setMeddelande] = useState("");
  const [skickad, setSkickad] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/reflektion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ namn, meddelande }),
    });

    if (res.ok) {
      setSkickad(true);
      setNamn("");
      setMeddelande("");
    } else {
      alert("Något gick fel");
    }
  };

  const inputClass =
    "w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <main className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Reflektion & bidra</h1>
      <p className="mb-4">Dela med dig av dina tankar kring konstverken och utställningen.</p>

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
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Skicka reflektion
          </button>
        </form>
      ) : (
        <p className="text-green-400 mt-4">Tack för din reflektion!</p>
      )}
    </main>
  );
}
