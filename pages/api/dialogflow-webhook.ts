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
  console.log("▶ queryText:", body.queryText);
  console.log("▶ intent.displayName:", body.intent?.displayName);

  // Extract intent och språk
  const intentName = body.intent?.displayName;
  const lang = body.languageCode || "sv";

  // Default‐fallback (om inget case matchar)
  let svar = lang.startsWith("en")
    ? "I’m sorry, I didn’t understand that. Could you rephrase?"
    : "Jag förstod tyvärr inte. Kan du omformulera?";

  switch (intentName) {
    // Välkomst‐intents
    case "WELCOME":
    case "Default Welcome Intent":
    case "Välkommen":
      svar = lang.startsWith("en")
        ? "Hello! Welcome to the Art Bot. How can I help you today?"
        : "Hej! Välkommen till Konstboten. Hur kan jag hjälpa dig idag?";
      break;

    // Klock‐intent
    case "GetTime":
      const now = new Date();
      svar = lang.startsWith("en")
        ? `The time is ${now.toLocaleTimeString("en-US")}.`
        : `Klockan är ${now.toLocaleTimeString("sv-SE")} just nu.`;
      break;

    // Dina egna custom‐intents
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

    // ** Fallback‐intent **
    // Bör finnas med webhook enabled i Dialogflow
    case "For Unknown Questions (FallBack)":  // Exakt som det står i Dialogflow-Console
    case "Default Fallback Intent":          // Om du låter Dialogflow skriva standardnamnet
      svar = lang.startsWith("en")
        ? "Sorry, I’m still not sure what you mean. Try asking in another way?"
        : "Jag är ledsen, jag är fortfarande osäker på vad du menar. Prova att fråga på ett annat sätt?";
      break;
  }

  // Returnera svaret
  return res.status(200).json({ fulfillmentText: svar });
}
