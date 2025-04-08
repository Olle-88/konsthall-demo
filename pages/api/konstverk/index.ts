import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const verk = await prisma.konstverk.findMany({ orderBy: { createdAt: "desc" } });
      res.status(200).json(verk);
    } catch (error) {
      res.status(500).json({ error: "Kunde inte hämta konstverk" });
    }
  } else if (req.method === "POST") {
    const { titel, konstnar, beskrivning, bildUrl } = req.body;

    if (!titel || !konstnar || !beskrivning) {
      return res.status(400).json({ error: "Titel, konstnär och beskrivning krävs." });
    }

    try {
      const nyttVerk = await prisma.konstverk.create({
        data: { titel, konstnar, beskrivning, bildUrl },
      });
      res.status(201).json(nyttVerk);
    } catch (error) {
      res.status(500).json({ error: "Kunde inte skapa konstverk." });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
