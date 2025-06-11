import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WeatherApp - Live Weather Dashboard | Aashik9567',
  description: 'Real-time weather data with AI insights by Aashik9567',
  keywords: ['weather', 'forecast', 'AI', 'dashboard', 'real-time', 'Aashik9567'],
  authors: [{ name: 'Aashik9567', url: 'https://github.com/Aashik9567' }],
};

// Separate viewport export to fix the warning
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({
  children,
  modal,
}: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="min-h-screen sky-gradient-bg">
          <div className="fixed inset-0 bg-gradient-to-br from-sky-400/10 via-sky-500/10 to-sky-600/10" />
          <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.05),transparent_50%)]" />
          <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.08),transparent_50%)]" />
          <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(2,132,199,0.08),transparent_50%)]" />
          
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-sky-300/20 rounded-full animate-float" style={{ animationDelay: '0s' }} />
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-sky-400/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-sky-200/20 rounded-full animate-float" style={{ animationDelay: '4s' }} />
          </div>
          
          <div className="relative z-10 flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-auto lg:ml-0">
              <div className="h-full pt-16 lg:pt-0">
                {children}
              </div>
            </main>
          </div>

          {modal}
        </div>
      </body>
    </html>
  );
}