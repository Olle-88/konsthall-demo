// pages/bot.tsx
// @ts-nocheck
import Head from "next/head"

export default function BotPage() {
  return (
    <>
      <Head>
        {/* Ladda in Dialogflow Messenger-scriptet */}
        <script
          src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"
          async
        />
      </Head>

      {/* Nu hoppar TS-typen för <df-messenger> över */}
      <df-messenger
        intent="WELCOME"
        chat-title="Konstboten"
        agent-id="c28d8b31-05a0-4078-b3b4-853f943e2c86"
        language-code="sv"
        environment="draft"
      />
    </>
  )
}

// (Din pageConfig om du behöver)
BotPage.pageConfig = {
  bgClass: "bg-[url('/images/reflektion-bg.jpg')] bg-cover bg-center",
  textClass: "text-white",
}
