import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
  title: 'Converse-AI — Build an AI that talks like you',
  description: 'Create a personalized AI chatbot by defining its purpose, personality, and behavior — in minutes.',
  keywords: ['AI Chatbot Builder', 'Converse AI', 'Custom AI Chatbot', 'AI Platform'],
  authors: [{ name: 'Converse-AI' }],
  themeColor: '#000000',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} dark`}>
      <body className="bg-[#000000] text-[#F5F5F7] font-sans antialiased min-h-screen selection:bg-[#2563EB]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
