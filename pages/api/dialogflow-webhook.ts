// pages/api/dialogflow-webhook.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  // Logga indata för felsökning
  console.log("📩 Dialogflow request:", JSON.stringify(req.body, null, 2));

  const intent = req.body.queryResult?.intent?.displayName;
  let svar = "Jag förstod tyvärr inte. Kan du omformulera?";

  if (intent === "Default Welcome Intent") {
    svar = "Hej! Välkommen till Konstboten. Hur kan jag hjälpa dig idag?";
  } else if (intent === "GetTime") {
    const tid = new Date().toLocaleTimeString("sv-SE");
    svar = `Klockan är ${tid} just nu.`;
  }
  // ...lägg till fler intents efter behov...

  return res.status(200).json({
    fulfillmentText: svar
  });
}
