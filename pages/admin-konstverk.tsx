'use client'
import { useState, useEffect } from 'react'

type Verk = {
  id: number
  titel: string
  konstnar: string
  beskrivning: string
  bildUrl?: string
}

export default function AdminKonstverk() {
  const [verkList, setVerkList] = useState<Verk[]>([])
  const [images, setImages] = useState<string[]>([])
  const [formData, setFormData] = useState({
    titel: '',
    konstnar: '',
    beskrivning: '',
    bildUrl: '',
  })
  const [editId, setEditId] = useState<number | null>(null)
  const [editData, setEditData] = useState(formData)

  // Hämta konstverk
  async function fetchVerk() {
    const res = await fetch('/api/konstverk')
    setVerkList(await res.json())
  }
  // Hämta bildlista
  async function fetchImages() {
    const res = await fetch('/api/images')
    setImages(await res.json())
  }

  useEffect(() => {
    fetchVerk()
    fetchImages()
  }, [])

  // Skapa, Edit, Delete ... (samma logik som innan)
  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    await fetch('/api/konstverk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    setFormData({ titel: '', konstnar: '', beskrivning: '', bildUrl: '' })
    fetchVerk()
  }
  async function handleDelete(id: number) {
    await fetch(`/api/konstverk/${id}`, { method: 'DELETE' })
    fetchVerk()
  }
  function startEdit(v: Verk) {
    setEditId(v.id)
    setEditData({
      titel: v.titel,
      konstnar: v.konstnar,
      beskrivning: v.beskrivning,
      bildUrl: v.bildUrl || '',
    })
  }
  async function saveEdit(id: number) {
    await fetch(`/api/konstverk/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData),
    })
    setEditId(null)
    fetchVerk()
  }
  function cancelEdit() {
    setEditId(null)
  }

  const inputClass =
    'w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500'

  return (
    <div className="p-6 max-w-2xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">🖼️ Admin – Hantera konstverk</h1>

      {/* --- Lägg till --- */}
      <form onSubmit={handleCreate} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Titel"
          value={formData.titel}
          onChange={(e) =>
            setFormData({ ...formData, titel: e.target.value })
          }
          required
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Konstnär"
          value={formData.konstnar}
          onChange={(e) =>
            setFormData({ ...formData, konstnar: e.target.value })
          }
          required
          className={inputClass}
        />
        <textarea
          placeholder="Beskrivning"
          value={formData.beskrivning}
          onChange={(e) =>
            setFormData({ ...formData, beskrivning: e.target.value })
          }
          required
          className={inputClass}
        />

        {/* Dynamisk dropdown */}
        <select
          value={formData.bildUrl}
          onChange={(e) =>
            setFormData({ ...formData, bildUrl: e.target.value })
          }
          className={inputClass}
        >
          <option value="">Ingen bild</option>
          {images.map((f) => (
            <option key={f} value={`/images/${f}`}>
              {f}
            </option>
          ))}
        </select>

        {/* Preview */}
        {formData.bildUrl && (
          <img
            src={formData.bildUrl}
            alt="Preview"
            className="w-32 h-32 object-cover rounded mb-2 border"
          />
        )}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          ➕ Lägg till konstverk
        </button>
      </form>

      {/* --- Lista med edit/delete --- */}
      <ul className="space-y-6">
        {verkList.map((v) => (
          <li key={v.id} className="border-b border-white/20 pb-4">
            {editId === v.id ? (
              <div className="space-y-3">
                {/* Samma inputs som ovan, men bound till editData */}
                <input
                  type="text"
                  value={editData.titel}
                  onChange={(e) =>
                    setEditData({ ...editData, titel: e.target.value })
                  }
                  className={inputClass}
                />
                <input
                  type="text"
                  value={editData.konstnar}
                  onChange={(e) =>
                    setEditData({ ...editData, konstnar: e.target.value })
                  }
                  className={inputClass}
                />
                <textarea
                  value={editData.beskrivning}
                  onChange={(e) =>
                    setEditData({ ...editData, beskrivning: e.target.value })
                  }
                  className={inputClass}
                />
                <select
                  value={editData.bildUrl}
                  onChange={(e) =>
                    setEditData({ ...editData, bildUrl: e.target.value })
                  }
                  className={inputClass}
                >
                  <option value="">Ingen bild</option>
                  {images.map((f) => (
                    <option key={f} value={`/images/${f}`}>
                      {f}
                    </option>
                  ))}
                </select>
                {editData.bildUrl && (
                  <img
                    src={editData.bildUrl}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded mb-2 border"
                  />
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(v.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    💾 Spara
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition"
                  >
                    ❌ Avbryt
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold">{v.titel}</h2>
                {v.bildUrl && (
                  <img
                    src={v.bildUrl}
                    alt={v.titel}
                    className="w-32 h-32 object-cover rounded mb-2 border"
                  />
                )}
                <p className="italic mb-1">av {v.konstnar}</p>
                <p className="mb-2">{v.beskrivning}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(v)}
                    className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition"
                  >
                    ✏️ Redigera
                  </button>
                  <button
                    onClick={() => handleDelete(v.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    🗑️ Ta bort
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Per‑sida‑konfig för Layout
AdminKonstverk.pageConfig = {
  bgClass: 'bg-gray-900',
  textClass: 'text-white',
}
