// pages/api/dialogflow-webhook.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const body = req.body.queryResult;
  console.log("📩 Dialogflow request:", JSON.stringify(body, null, 2));

  const intentName = body.intent?.displayName;
  const lang = body.languageCode || "sv";
  let svar = lang.startsWith("en")
    ? "I’m sorry, I didn’t understand that."
    : "Jag förstod tyvärr inte. Kan du omformulera?";

  switch (intentName) {
    case "WELCOME":                     // event-trigger från df-messenger
    case "Default Welcome Intent":     // standard-intenten i Dialogflow
      svar = lang.startsWith("en")
        ? "Hello! Welcome to the Art Bot. How can I help you today?"
        : "Hej! Välkommen till Konstboten. Hur kan jag hjälpa dig idag?";
      break;

    case "GetTime":
      const now = new Date();
      svar = lang.startsWith("en")
        ? `The time is ${now.toLocaleTimeString("en-US")}.`
        : `Klockan är ${now.toLocaleTimeString("sv-SE")} just nu.`;
      break;

    // Lägg till fler case för dina egna intents...
    // case "YourCustomIntent":
    //   svar = "...";
    //   break;

    default:
      // fallback redan definierat ovan
      break;
  }

  return res.status(200).json({ fulfillmentText: svar });
}
