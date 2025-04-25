// components/Layout.tsx
import Header from './Header';
import Footer from './Footer';
import { useEffect, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  bgClass?: string;
  textClass?: string;
}

export default function Layout({ children, bgClass = "bg-gray-50", textClass = "text-black" }: LayoutProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.body.appendChild(script);

    const dfMessenger = document.createElement('df-messenger');
    dfMessenger.setAttribute('intent', 'WELCOME');
    dfMessenger.setAttribute('chat-title', 'Info');
    dfMessenger.setAttribute('agent-id', 'c28d8b31-05a0-4078-b3b4-853f943e2c86');
    dfMessenger.setAttribute('language-code', 'sv');
    document.body.appendChild(dfMessenger);

    return () => {
      document.body.removeChild(script);
      if (document.body.contains(dfMessenger)) {
        document.body.removeChild(dfMessenger);
      }
    };
  }, []);

  return (
    <div className={`flex flex-col min-h-screen ${bgClass} ${textClass}`}>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
