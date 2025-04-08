import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { namn, meddelande } = req.body;

    if (!namn || !meddelande) {
      return res.status(400).json({ error: "Alla fält måste fyllas i." });
    }

    try {
      const reflektion = await prisma.reflektion.create({
        data: { namn, meddelande },
      });

      return res.status(201).json(reflektion);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Något gick fel." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
