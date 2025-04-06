
import { useState } from "react";

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <div className="text-white p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Välkommen till Konsthall Tornedalen</h1>
      <p className="mb-6">En plats där konst, kultur och natur möts.</p>

      <h2 className="text-xl font-semibold mb-2">🎥 Virtuell introduktion</h2>
      {!started ? (
        <button
          onClick={() => setStarted(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
        >
          ▶️ Starta digital rundtur
        </button>
      ) : (
        <div className="aspect-w-16 aspect-h-9 mt-4">
          <iframe
            className="w-full h-64"
            src="https://www.youtube.com/embed/xm3YgoEiEDc?autoplay=1"
            title="Digital rundtur"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <h2 className="text-xl font-semibold mt-6 mb-2">🏞 Tips på utflykter</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>Promenera längs Torne älv</li>
        <li>Besök Kukkolaforsen</li>
        <li>Åk skidor i närliggande skogsspår</li>
        <li>Se midnattssolen i juni</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">🌲 Naturupplevelser</h2>
      <p>
        Konsthallen ligger mitt i Tornedalens unika natur – rikt på skogar, älvar och vildmark. En plats där du kan känna både stillhet och kreativitet.
      </p>
    </div>
  );
}
