import './globals.css';
import Navbar from '../src/components/Navbar';

export const metadata = {
  title: 'Aetheris — Premium AI Employee Platform',
  description: 'Design, train, and deploy high-fidelity cognitive AI employees for your business.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-primary antialiased min-h-screen flex flex-col">
        {/* Floating Global Navbar */}
        <Navbar />
        {/* Page Content viewport wrapper */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
