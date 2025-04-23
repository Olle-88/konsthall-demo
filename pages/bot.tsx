// pages/bot.tsx
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

      {/* Dialogflow-botten dyker upp nere i hörnet */}
      <df-messenger
        intent="WELCOME"
        chat-title="Konstboten"
        agent-id="c28d8b31-05a0-4078-b3b4-853f943e2c86"
        language-code="sv"
      />
    </>
  )
}

BotPage.pageConfig = {
  bgClass: "bg-[url('/images/reflektion-bg.jpg')] bg-cover bg-center",
  textClass: "text-white",
}
