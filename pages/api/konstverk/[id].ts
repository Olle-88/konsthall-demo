import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      await prisma.konstverk.delete({ where: { id: Number(id) } });
      res.status(200).json({ message: "Konstverket borttaget." });
    } catch (error) {
      res.status(500).json({ error: "Kunde inte ta bort konstverket." });
    }
  } else if (req.method === "PUT") {
    const { titel, konstnar, beskrivning, bildUrl } = req.body;

    try {
      const uppdaterat = await prisma.konstverk.update({
        where: { id: Number(id) },
        data: { titel, konstnar, beskrivning, bildUrl },
      });
      res.status(200).json(uppdaterat);
    } catch (error) {
      res.status(500).json({ error: "Kunde inte uppdatera konstverket." });
    }
  } else {
    res.setHeader("Allow", ["DELETE", "PUT"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
