import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata = {
  title: 'Converse-AI — Build an AI that talks like you',
  description: 'Create a personalized AI chatbot by defining its purpose, personality, and behavior — in minutes.',
  keywords: ['AI Chatbot Builder', 'Converse AI', 'Custom AI Chatbot', 'AI Platform'],
  authors: [{ name: 'Converse-AI' }],
  themeColor: '#020205',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="bg-[#020205] text-[#F5F5F7] font-sans antialiased min-h-screen selection:bg-[#7C3AED]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
