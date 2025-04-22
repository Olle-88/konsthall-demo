// pages/api/images.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Mapp till public/images
  const imagesDir = path.join(process.cwd(), 'public', 'images')

  try {
    // Läs in alla filer i mappen
    const files = fs.readdirSync(imagesDir)
      // filtrera så att det bara blir bildfiler
      .filter((f) => /\.(jpe?g|png|gif|webp|avif)$/i.test(f))
    res.status(200).json(files)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Kunde inte läsa bilderna' })
  }
}
