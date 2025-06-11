import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Optimize font loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Weather App - Beautiful Weather Dashboard',
  description: 'A modern, glass-morphism weather application built with Next.js and Tailwind CSS. Get real-time weather updates with a stunning user interface.',
  keywords: 'weather, forecast, dashboard, glass morphism, modern UI, Next.js',
  authors: [{ name: 'Aashik9567' }],
  creator: 'Aashik9567',
  applicationName: 'Weather App',
  
  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Weather App - Beautiful Weather Dashboard',
    description: 'A modern weather app with glass morphism design',
    creator: '@Aashik9567',
    images: ['https://media.licdn.com/dms/image/v2/D4E03AQF40PBb21Mq-Q/profile-displayphoto-shrink_400_400/B4EZcl1bTrH0Ag-/0/1748686452967?e=1755129600&v=beta&t=dQRiYgCKfxZVmDbrt-OJjBFUI_8v4OfAIdT0AdkzUm8'],
  },
  
  // Icons only
  icons: {
    icon: '/favicon.ico',
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
  },
}

// SEPARATE viewport export (Next.js 14+ requirement)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#2B5CE6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Essential preconnects only */}
        <link rel="preconnect" href="https://api.weatherapi.com" />
      </head>
      
      <body className={inter.className}>
        {/* Main application wrapper */}
        <div id="app-root" className="relative min-h-screen overflow-x-hidden">
          
          {/* Background decorations (floating clouds) */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-10 left-10 w-20 h-12 bg-white/5 rounded-full blur-xl animate-float" 
                 style={{ animationDelay: '0s' }} />
            <div className="absolute top-32 right-20 w-16 h-10 bg-white/5 rounded-full blur-xl animate-float" 
                 style={{ animationDelay: '2s' }} />
            <div className="absolute top-64 left-1/3 w-24 h-14 bg-white/5 rounded-full blur-xl animate-float" 
                 style={{ animationDelay: '4s' }} />
            <div className="absolute bottom-32 right-10 w-18 h-11 bg-white/5 rounded-full blur-xl animate-float" 
                 style={{ animationDelay: '1s' }} />
          </div>
          
          {/* Main content area */}
          <main className="relative z-10">
            {children}
          </main>
          
        </div>
        
        {/* Development indicator (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 left-4 z-50 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-lg px-3 py-1 text-xs text-green-300">
            Development Mode
          </div>
        )}
      </body>
    </html>
  )
}