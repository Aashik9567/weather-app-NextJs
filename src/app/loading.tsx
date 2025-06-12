import { Cloud, Sun, Moon } from 'lucide-react';

export default function Loading() {
  const currentTime = '2025-06-12 07:49:08';
  const currentUser = 'Aashik9567';

  return (
    <div className="min-h-screen sky-gradient-bg flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gradient-to-br from-sky-400/10 via-sky-500/10 to-sky-600/10" />
      
      <div className="relative z-10 text-center">
        {/* Animated Weather Icons */}
        <div className="relative mb-8">
          <div className="flex items-center justify-center gap-4">
            <Sun className="h-8 w-8 text-yellow-400 animate-float" style={{ animationDelay: '0s' }} />
            <Cloud className="h-12 w-12 text-sky-400 animate-float" style={{ animationDelay: '0.5s' }} />
            <Moon className="h-8 w-8 text-sky-300 animate-float" style={{ animationDelay: '1s' }} />
          </div>
          
          {/* Loading Spinner */}
          <div className="mt-6">
            <div className="w-16 h-16 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin mx-auto"></div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-white text-2xl font-semibold mb-2">
          Loading WeatherApp...
        </h2>
        <p className="text-sky-200/70 mb-4">
          Fetching the latest weather data for {currentUser}
        </p>
        
        {/* Time Display */}
        <div className="text-sky-300/60 text-sm">
          {currentTime} UTC
        </div>
      </div>
    </div>
  );
}