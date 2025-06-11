'use client';

import { cn } from '@/lib/utils/cn';

interface WeatherIconProps {
  condition: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animated?: boolean;
}

const weatherIcons = {
  'clear-day': {
    icon: '☀️',
    gradient: 'from-yellow-400 to-orange-500',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <circle cx="12" cy="12" r="5" fill="url(#sunGradient)" />
        <g stroke="url(#sunGradient)" strokeWidth="2" strokeLinecap="round">
          <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </g>
        <defs>
          <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  'clear-night': {
    icon: '🌙',
    gradient: 'from-indigo-400 to-purple-500',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="url(#moonGradient)" />
        <defs>
          <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  'partly-cloudy-day': {
    icon: '⛅',
    gradient: 'from-blue-400 to-yellow-400',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <circle cx="12" cy="8" r="3" fill="url(#partlyCloudyGradient)" />
        <path d="M6 16h12a4 4 0 0 0 0-8 6 6 0 0 0-12 0 4 4 0 0 0 0 8z" fill="url(#cloudGradient)" opacity="0.8" />
        <defs>
          <linearGradient id="partlyCloudyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5E7EB" />
            <stop offset="100%" stopColor="#9CA3AF" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  'cloudy': {
    icon: '☁️',
    gradient: 'from-gray-400 to-gray-600',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M6 16h12a4 4 0 0 0 0-8 6 6 0 0 0-12 0 4 4 0 0 0 0 8z" fill="url(#cloudyGradient)" />
        <path d="M4 20h16a2 2 0 0 0 0-4 4 4 0 0 0-8 0 2 2 0 0 0 0 4z" fill="url(#cloudyGradient)" opacity="0.7" />
        <defs>
          <linearGradient id="cloudyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5E7EB" />
            <stop offset="100%" stopColor="#6B7280" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  'rain': {
    icon: '🌧️',
    gradient: 'from-blue-400 to-blue-600',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M6 16h12a4 4 0 0 0 0-8 6 6 0 0 0-12 0 4 4 0 0 0 0 8z" fill="url(#rainCloudGradient)" />
        <g stroke="url(#rainDropGradient)" strokeWidth="2" strokeLinecap="round">
          <path d="M8 19v2m4-4v2m4-2v2" />
        </g>
        <defs>
          <linearGradient id="rainCloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9CA3AF" />
            <stop offset="100%" stopColor="#4B5563" />
          </linearGradient>
          <linearGradient id="rainDropGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  'heavy-rain': {
    icon: '🌧️',
    gradient: 'from-blue-500 to-blue-700',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M6 16h12a4 4 0 0 0 0-8 6 6 0 0 0-12 0 4 4 0 0 0 0 8z" fill="url(#heavyRainCloudGradient)" />
        <g stroke="url(#heavyRainDropGradient)" strokeWidth="2" strokeLinecap="round">
          <path d="M7 19v3m3-5v3m4-3v3m3-5v3" />
        </g>
        <defs>
          <linearGradient id="heavyRainCloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6B7280" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
          <linearGradient id="heavyRainDropGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>
      </svg>
    )
  }
};

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-16 h-16',
  xl: 'w-20 h-20'
};

export function WeatherIcon({ 
  condition, 
  size = 'md', 
  className, 
  animated = false 
}: WeatherIconProps) {
  const weatherData = weatherIcons[condition as keyof typeof weatherIcons] || weatherIcons['clear-day'];
  
  return (
    <div 
      className={cn(
        sizeClasses[size],
        'relative flex items-center justify-center',
        animated && 'animate-pulse',
        className
      )}
    >
      {/* SVG Icon */}
      <div className="w-full h-full">
        {weatherData.svg}
      </div>
      
      {/* Animated effects for specific conditions */}
      {animated && (condition === 'rain' || condition === 'heavy-rain') && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{
                left: `${30 + i * 20}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}