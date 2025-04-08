import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const reflektioner = await prisma.reflektion.findMany();
    res.status(200).json({
      status: "✅ Databasen funkar!",
      antal: reflektioner.length,
    });
  } catch (error: any) {
    console.error("❌ DB-Fel:", error); // Loggar felet till Vercel logs
    res.status(500).json({
      status: "❌ Fel vid anslutning till databasen",
      error: error.message || String(error),
    });
  }
}
