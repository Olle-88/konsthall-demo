import Link from 'next/link';

export default function TelegramButton() {
  return (
    <div className="text-center my-4">
      <p className="mb-4 text-lg">Du behöver ha Telegram-appen installerad för att chatta med oss.</p>
      <Link href="https://t.me/Konst123bot" target="_blank">
        <button className="bg-[#0088cc] text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-[#0077b3] transition duration-300">
          Chatta med oss via Telegram
        </button>
      </Link>
    </div>
  );
}
