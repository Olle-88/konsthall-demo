// components/Layout.tsx
import Header from './Header';
import Footer from './Footer';
import { useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    // Add a useEffect to load the Dialogflow script
    useEffect(() => {
        // Create script element for Dialogflow Messenger
        const script = document.createElement('script');
        script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
        script.async = true;
        document.body.appendChild(script);

        // Create the df-messenger element
        const dfMessenger = document.createElement('df-messenger');
        dfMessenger.setAttribute('intent', 'WELCOME');
        dfMessenger.setAttribute('chat-title', 'Info');
        dfMessenger.setAttribute('agent-id', 'c28d8b31-05a0-4078-b3b4-853f943e2c86');
        dfMessenger.setAttribute('language-code', 'sv');
        document.body.appendChild(dfMessenger);

        // Cleanup function to remove the elements when component unmounts
        return () => {
            document.body.removeChild(script);
            if (document.body.contains(dfMessenger)) {
                document.body.removeChild(dfMessenger);
            }
        };
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-black">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}