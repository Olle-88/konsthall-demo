import Head from "next/head";

export default function BotPage() {
  return (
    <>
      <Head>
        <script
          src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"
          async
        />
      </Head>
      <df-messenger
        intent="WELCOME"
        chat-title="Konstboten"
        agent-id="c28d8b31-05a0-4078-b3b4-853f943e2c86"
        language-code="en"
      />
    </>
  );
}
