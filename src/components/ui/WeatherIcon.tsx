'use client';

import { cn } from '@/lib/utils/cn';

interface WeatherIconProps {
  condition: string;
  conditionCode?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
  isDay?: boolean;
}

export function WeatherIcon({ 
  condition, 
  conditionCode,
  size = 'md', 
  animated = false, 
  className,
  isDay = true 
}: WeatherIconProps) {
  
  // Map WeatherAPI condition codes to our display
  const getWeatherDisplay = (code?: number, conditionText?: string, isDayTime?: boolean) => {
    // If we have condition code, use it for precise mapping
    if (code) {
      const conditionMap: { [key: number]: { icon: string; color: string; bgColor: string } } = {
        // Clear/Sunny
        1000: { 
          icon: isDayTime ? '☀️' : '🌙', 
          color: isDayTime ? 'text-yellow-400' : 'text-blue-300',
          bgColor: isDayTime ? 'bg-yellow-400/20' : 'bg-blue-400/20'
        },
        // Partly Cloudy
        1003: { 
          icon: isDayTime ? '⛅' : '☁️', 
          color: 'text-gray-300',
          bgColor: 'bg-gray-400/20'
        },
        // Cloudy/Overcast
        1006: { icon: '☁️', color: 'text-gray-400', bgColor: 'bg-gray-500/20' },
        1009: { icon: '☁️', color: 'text-gray-500', bgColor: 'bg-gray-600/20' },
        // Fog/Mist
        1030: { icon: '🌫️', color: 'text-gray-400', bgColor: 'bg-gray-400/20' },
        1135: { icon: '🌫️', color: 'text-gray-400', bgColor: 'bg-gray-400/20' },
        1147: { icon: '🌫️', color: 'text-gray-400', bgColor: 'bg-gray-400/20' },
        // Drizzle
        1063: { icon: '🌦️', color: 'text-blue-400', bgColor: 'bg-blue-400/20' },
        1150: { icon: '🌦️', color: 'text-blue-400', bgColor: 'bg-blue-400/20' },
        1153: { icon: '🌦️', color: 'text-blue-400', bgColor: 'bg-blue-400/20' },
        1168: { icon: '🌦️', color: 'text-blue-400', bgColor: 'bg-blue-400/20' },
        1171: { icon: '🌦️', color: 'text-blue-400', bgColor: 'bg-blue-400/20' },
        // Light Rain
        1180: { icon: '🌧️', color: 'text-blue-500', bgColor: 'bg-blue-500/20' },
        1183: { icon: '🌧️', color: 'text-blue-500', bgColor: 'bg-blue-500/20' },
        1240: { icon: '🌧️', color: 'text-blue-500', bgColor: 'bg-blue-500/20' },
        // Moderate Rain
        1186: { icon: '🌧️', color: 'text-blue-600', bgColor: 'bg-blue-600/20' },
        1189: { icon: '🌧️', color: 'text-blue-600', bgColor: 'bg-blue-600/20' },
        1243: { icon: '🌧️', color: 'text-blue-600', bgColor: 'bg-blue-600/20' },
        // Heavy Rain
        1192: { icon: '🌧️', color: 'text-blue-700', bgColor: 'bg-blue-700/20' },
        1195: { icon: '🌧️', color: 'text-blue-700', bgColor: 'bg-blue-700/20' },
        1246: { icon: '🌧️', color: 'text-blue-800', bgColor: 'bg-blue-800/20' },
        // Snow
        1066: { icon: '❄️', color: 'text-blue-200', bgColor: 'bg-blue-200/20' },
        1210: { icon: '❄️', color: 'text-blue-200', bgColor: 'bg-blue-200/20' },
        1213: { icon: '❄️', color: 'text-blue-200', bgColor: 'bg-blue-200/20' },
        1216: { icon: '🌨️', color: 'text-blue-300', bgColor: 'bg-blue-300/20' },
        1219: { icon: '🌨️', color: 'text-blue-300', bgColor: 'bg-blue-300/20' },
        1222: { icon: '🌨️', color: 'text-blue-400', bgColor: 'bg-blue-400/20' },
        1225: { icon: '🌨️', color: 'text-blue-500', bgColor: 'bg-blue-500/20' },
        1255: { icon: '🌨️', color: 'text-blue-300', bgColor: 'bg-blue-300/20' },
        1258: { icon: '🌨️', color: 'text-blue-400', bgColor: 'bg-blue-400/20' },
        // Thunderstorm
        1087: { icon: '⛈️', color: 'text-purple-400', bgColor: 'bg-purple-400/20' },
        1273: { icon: '⛈️', color: 'text-purple-500', bgColor: 'bg-purple-500/20' },
        1276: { icon: '⛈️', color: 'text-purple-600', bgColor: 'bg-purple-600/20' },
        1279: { icon: '⛈️', color: 'text-purple-500', bgColor: 'bg-purple-500/20' },
        1282: { icon: '⛈️', color: 'text-purple-600', bgColor: 'bg-purple-600/20' },
      };
      
      const mapping = conditionMap[code];
      if (mapping) return mapping;
    }
    
    // Fallback to text-based matching
    const text = conditionText?.toLowerCase() || condition.toLowerCase();
    
    if (text.includes('sunny') || text.includes('clear')) {
      return { 
        icon: isDayTime ? '☀️' : '🌙', 
        color: isDayTime ? 'text-yellow-400' : 'text-blue-300',
        bgColor: isDayTime ? 'bg-yellow-400/20' : 'bg-blue-400/20'
      };
    }
    if (text.includes('partly cloudy') || text.includes('partly')) {
      return { icon: '⛅', color: 'text-gray-300', bgColor: 'bg-gray-400/20' };
    }
    if (text.includes('cloudy') || text.includes('overcast')) {
      return { icon: '☁️', color: 'text-gray-400', bgColor: 'bg-gray-500/20' };
    }
    if (text.includes('rain') || text.includes('drizzle')) {
      return { icon: '🌧️', color: 'text-blue-500', bgColor: 'bg-blue-500/20' };
    }
    if (text.includes('snow') || text.includes('blizzard')) {
      return { icon: '❄️', color: 'text-blue-200', bgColor: 'bg-blue-200/20' };
    }
    if (text.includes('thunder') || text.includes('storm')) {
      return { icon: '⛈️', color: 'text-purple-500', bgColor: 'bg-purple-500/20' };
    }
    if (text.includes('fog') || text.includes('mist')) {
      return { icon: '🌫️', color: 'text-gray-400', bgColor: 'bg-gray-400/20' };
    }
    
    // Default fallback
    return { 
      icon: isDayTime ? '☀️' : '🌙', 
      color: 'text-gray-400', 
      bgColor: 'bg-gray-400/20' 
    };
  };

  const weather = getWeatherDisplay(conditionCode, condition, isDay);
  
  const sizeClasses = {
    sm: 'text-lg w-6 h-6',
    md: 'text-2xl w-8 h-8',
    lg: 'text-4xl w-12 h-12',
    xl: 'text-6xl w-16 h-16'
  };

  return (
    <div className={cn(
      'relative flex items-center justify-center rounded-xl transition-all duration-300',
      sizeClasses[size],
      weather.bgColor,
      animated && 'hover:scale-110 hover:rotate-6',
      className
    )}>
      <span 
        className={cn(
          'font-bold transition-colors duration-300',
          weather.color
        )}
        title={`${condition}${conditionCode ? ` (Code: ${conditionCode})` : ''}`}
      >
        {weather.icon}
      </span>
      
      {/* Animated rain drops for rain conditions */}
      {animated && (condition.toLowerCase().includes('rain') || conditionCode && [1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(conditionCode)) && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1 left-1 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="absolute top-2 right-2 w-1 h-1 bg-blue-500 rounded-full opacity-80 animate-bounce" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-blue-300 rounded-full opacity-70 animate-bounce" style={{ animationDelay: '1s' }} />
        </div>
      )}
    </div>
  );
}