// pages/api/dialogflow-webhook.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Endast POST tillåtet
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  // Hämta payload
  const body = req.body.queryResult;
  console.log("📩 Dialogflow request:", JSON.stringify(body, null, 2));

  // Extract intent och språk
  const intentName = body.intent?.displayName;
  const lang = body.languageCode || "sv";

  // Default-svar (fallback)
  let svar = lang.startsWith("en")
    ? "I’m sorry, I didn’t understand that."
    : "Jag förstod tyvärr inte. Kan du omformulera?";

  // Hantera specifika intents
  switch (intentName) {
    case "WELCOME":                // triggas av df-messenger med intent="WELCOME"
    case "Default Welcome Intent": // triggas av standard Welcome Intent i Dialogflow
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

    // Exempel på hur du lägger till egna intents:
    case "FindGalleryIntent":
      svar = lang.startsWith("en")
        ? "Our gallery is located at Main Street 123."
        : "Konsthallen ligger på Storgatan 123.";
      break;

    case "ShowArtworksIntent":
      svar = lang.startsWith("en")
        ? "We currently have three exhibitions: A, B and C."
        : "Vi har just nu tre utställningar: A, B och C.";
      break;

    // Lägg till fler case för varje nytt intent...
    // case "YourCustomIntentName":
    //   svar = lang.startsWith("en") ? "..." : "...";
    //   break;

    default:
      // Om inget case matchar används det fallback-svar vi satte ovan
      break;
  }

  // Returnera svaret till Dialogflow
  return res.status(200).json({ fulfillmentText: svar });
}
