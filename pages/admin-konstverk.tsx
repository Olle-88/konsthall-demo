import { useEffect, useState } from "react";

export default function AdminKonstverk() {
  const [konstverk, setKonstverk] = useState([]);
  const [formData, setFormData] = useState({
    titel: "",
    konstnar: "",
    beskrivning: "",
    bildUrl: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    titel: "",
    konstnar: "",
    beskrivning: "",
    bildUrl: "",
  });

  const hämtaVerk = async () => {
    const res = await fetch("/api/konstverk");
    const data = await res.json();
    setKonstverk(data);
  };

  useEffect(() => {
    hämtaVerk();
  }, []);

  const skapaVerk = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/konstverk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({ titel: "", konstnar: "", beskrivning: "", bildUrl: "" });
      hämtaVerk();
    } else {
      alert("Misslyckades med att skapa konstverk.");
    }
  };

  const taBort = async (id: number) => {
    await fetch(`/api/konstverk/${id}`, { method: "DELETE" });
    hämtaVerk();
  };

  const sparaRedigering = async (id: number) => {
    const res = await fetch(`/api/konstverk/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });

    if (res.ok) {
      setEditId(null);
      hämtaVerk();
    } else {
      alert("Kunde inte uppdatera konstverk.");
    }
  };

  const inputClass =
    "w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <main className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">🖼️ Admin – Hantera konstverk</h1>

      {/* Skapa nytt konstverk */}
      <form onSubmit={skapaVerk} className="space-y-2 max-w-md mb-6">
        <input
          type="text"
          placeholder="Titel"
          value={formData.titel}
          onChange={(e) => setFormData({ ...formData, titel: e.target.value })}
          required
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Konstnär"
          value={formData.konstnar}
          onChange={(e) => setFormData({ ...formData, konstnar: e.target.value })}
          required
          className={inputClass}
        />
        <textarea
          placeholder="Beskrivning"
          value={formData.beskrivning}
          onChange={(e) => setFormData({ ...formData, beskrivning: e.target.value })}
          required
          className={inputClass}
        ></textarea>
        <input
          type="text"
          placeholder="Bild-URL (valfritt)"
          value={formData.bildUrl}
          onChange={(e) => setFormData({ ...formData, bildUrl: e.target.value })}
          className={inputClass}
        />
        <button type="submit" className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
          ➕ Lägg till konstverk
        </button>
      </form>

      {/* Lista med redigerbara konstverk */}
      <ul className="space-y-6">
        {konstverk.map((verk: any) => (
          <li key={verk.id} className="border-b border-white/20 pb-2">
            {editId === verk.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editData.titel}
                  onChange={(e) => setEditData({ ...editData, titel: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="text"
                  value={editData.konstnar}
                  onChange={(e) => setEditData({ ...editData, konstnar: e.target.value })}
                  className={inputClass}
                />
                <textarea
                  value={editData.beskrivning}
                  onChange={(e) => setEditData({ ...editData, beskrivning: e.target.value })}
                  className={inputClass}
                ></textarea>
                <input
                  type="text"
                  value={editData.bildUrl}
                  onChange={(e) => setEditData({ ...editData, bildUrl: e.target.value })}
                  className={inputClass}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => sparaRedigering(verk.id)}
                    className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                  >
                    💾 Spara
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-700"
                  >
                    ❌ Avbryt
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="font-bold">{verk.titel} – {verk.konstnar}</p>
                <p>{verk.beskrivning}</p>
                {verk.bildUrl && (
                  <img src={verk.bildUrl} alt={verk.titel} className="w-32 mt-2" />
                )}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      setEditId(verk.id);
                      setEditData({
                        titel: verk.titel,
                        konstnar: verk.konstnar,
                        beskrivning: verk.beskrivning,
                        bildUrl: verk.bildUrl || "",
                      });
                    }}
                    className="bg-yellow-600 px-3 py-1 rounded text-sm hover:bg-yellow-700"
                  >
                    ✏️ Redigera
                  </button>
                  <button
                    onClick={() => taBort(verk.id)}
                    className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    🗑️ Ta bort
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
