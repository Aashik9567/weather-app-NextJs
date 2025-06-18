import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { NotificationProvider } from '@/components/notifications/NotificationContext';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WeatherApp - AI Weather Dashboard | Aashik9567',
  description: 'Modern weather application with AI insights and real-time forecasting. Built by Aashik9567 on 2025-06-18 06:31:50 UTC',
  keywords: ['weather', 'forecast', 'AI', 'dashboard', 'Aashik9567', 'NextJS', 'React', 'Vercel'],
  authors: [{ name: 'Aashik9567', url: 'https://github.com/Aashik9567' }],
  creator: 'Aashik9567',
  publisher: 'Aashik9567',
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://weatherapp-aashik9567.vercel.app',
    title: 'WeatherApp - AI Weather Dashboard',
    description: 'Modern weather application with AI insights by Aashik9567',
    siteName: 'WeatherApp by Aashik9567',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WeatherApp by Aashik9567 - AI Weather Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Aashik9567',
    creator: '@Aashik9567',
    title: 'WeatherApp by Aashik9567',
    description: 'AI-Enhanced Weather Dashboard with real-time forecasting',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // REMOVED: All favicon and manifest references to prevent 404 errors
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0ea5e9',
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
      <head>
        {/* Removed favicon links to prevent 404 errors */}
        <meta name="build-time" content="2025-06-18T06:31:50Z" />
        <meta name="author" content="Aashik9567" />
      </head>
      <body className={inter.className}>
        <NotificationProvider>
          <NotificationCenter />
          <div className="min-h-screen sky-gradient-bg">
            {/* Background effects */}
            <div className="fixed inset-0 bg-gradient-to-br from-sky-400/10 via-sky-500/10 to-sky-600/10" />
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.05),transparent_50%)]" />
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.08),transparent_50%)]" />
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(2,132,199,0.08),transparent_50%)]" />
            
            {/* Floating particles */}
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
        </NotificationProvider>
      </body>
    </html>
  );
}