'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { WeatherIcon } from '@/components/ui/WeatherIcon';
import { MapPin, Calendar, Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

interface CurrentWeatherProps {
  location: string;
  country: string;
  region?: string;
  temperature: number;
  condition: string;
  conditionCode?: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDir?: string;
  pressure: number;
  visibility: number;
  uvIndex: number;
  precipitation?: number;
  cloud?: number;
  localTime: string;
  isDay: boolean;
  lastUpdated?: string;
  onRefresh?: () => void;
  isLoading?: boolean;
}

export function CurrentWeatherCard({
  location,
  country,
  region,
  temperature,
  condition,
  conditionCode,
  feelsLike,
  humidity,
  windSpeed,
  windDir,
  pressure,
  visibility,
  uvIndex,
  precipitation = 0,
  cloud = 0,
  localTime,
  isDay,
  lastUpdated,
  onRefresh,
  isLoading = false
}: CurrentWeatherProps) {
  
  // Format time display
  const formatTime = (timeString: string) => {
    try {
      const date = new Date(timeString);
      return {
        time: date.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        date: date.toLocaleDateString('en-US', { 
          weekday: 'long',
          month: 'short', 
          day: 'numeric' 
        })
      };
    } catch {
      return {
        time: "Unknown",
        date: "Unknown"
      };
    }
  };

  const formatLastUpdated = (timeString?: string) => {
    if (!timeString) return '';
    try {
      const date = new Date(timeString);
      const now = new Date();
      const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      
      if (diffMinutes < 1) return 'Just now';
      if (diffMinutes < 60) return `${diffMinutes}m ago`;
      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      return date.toLocaleDateString();
    } catch {
      return '';
    }
  };

  const { time, date } = formatTime(localTime);
  const lastUpdateText = formatLastUpdated(lastUpdated);

  // Get UV Index description and color
  const getUVInfo = (uv: number) => {
    if (uv <= 2) return { text: 'Low', color: 'text-green-400' };
    if (uv <= 5) return { text: 'Moderate', color: 'text-yellow-400' };
    if (uv <= 7) return { text: 'High', color: 'text-orange-400' };
    if (uv <= 10) return { text: 'Very High', color: 'text-red-400' };
    return { text: 'Extreme', color: 'text-purple-400' };
  };

  const uvInfo = getUVInfo(uvIndex);

  return (
    <GlassCard className="p-8 col-span-full lg:col-span-2">
      {/* Header - Location, Time, and Refresh */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
        <div className="mb-4 lg:mb-0 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-white/60" />
            <span className="text-white/80 text-sm font-medium">
              {location}{region && region !== location && `, ${region}`}, {country}
            </span>
          </div>
          <div className="flex items-center gap-4 text-white/60 text-xs">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{time}</span>
            </div>
            {lastUpdateText && (
              <div className="text-white/40">
                Updated {lastUpdateText}
              </div>
            )}
          </div>
        </div>
        
        {/* Refresh Button */}
        {onRefresh && (
          <Button
            variant="glass"
            size="sm"
            onClick={onRefresh}
            loading={isLoading}
            className="self-start"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        )}
      </div>

      {/* Main Weather Display */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        
        {/* Temperature and Condition */}
        <div className="flex items-start gap-6 mb-6 lg:mb-0">
          {/* Weather Icon */}
          <div className="flex-shrink-0">
            <WeatherIcon 
              condition={condition}
              conditionCode={conditionCode}
              size="xl" 
              animated={true}
              isDay={isDay}
              className="drop-shadow-2xl"
            />
          </div>
          
          {/* Temperature and Details */}
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight">
                {temperature}°
              </span>
              <span className="text-white/60 text-lg mb-2">C</span>
            </div>
            
            <div className="space-y-1">
              <p className="text-white text-lg font-medium">
                {condition}
              </p>
              <p className="text-white/60 text-sm">
                Feels like {feelsLike}°C
              </p>
              {windDir && (
                <p className="text-white/50 text-xs">
                  Wind: {windSpeed} km/h {windDir}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4 lg:min-w-[240px]">
          <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white/60 text-xs uppercase tracking-wide">Humidity</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
            </div>
            <div className="text-white text-lg font-semibold">{humidity}%</div>
          </div>
          
          <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white/60 text-xs uppercase tracking-wide">Wind</span>
              <div className="w-2 h-2 bg-green-400 rounded-full opacity-60"></div>
            </div>
            <div className="text-white text-lg font-semibold">{windSpeed} km/h</div>
          </div>
          
          <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white/60 text-xs uppercase tracking-wide">Pressure</span>
              <div className="w-2 h-2 bg-purple-400 rounded-full opacity-60"></div>
            </div>
            <div className="text-white text-lg font-semibold">{pressure} mb</div>
          </div>
          
          <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white/60 text-xs uppercase tracking-wide">UV Index</span>
              <div className={cn("w-2 h-2 rounded-full opacity-60", 
                uvIndex <= 2 ? 'bg-green-400' : 
                uvIndex <= 5 ? 'bg-yellow-400' : 
                uvIndex <= 7 ? 'bg-orange-400' : 'bg-red-400'
              )}></div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-white text-lg font-semibold">{uvIndex}</span>
              <span className={cn("text-xs", uvInfo.color)}>
                {uvInfo.text}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Bar */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex flex-wrap items-center gap-4 text-white/50 text-xs">
          <div className="flex items-center gap-1">
            <span>Visibility:</span>
            <span className="text-white/70">{visibility}km</span>
          </div>
          {precipitation > 0 && (
            <div className="flex items-center gap-1">
              <span>Precipitation:</span>
              <span className="text-white/70">{precipitation}mm</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <span>Cloud Cover:</span>
            <span className="text-white/70">{cloud}%</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{isDay ? '☀️ Day' : '🌙 Night'}</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}