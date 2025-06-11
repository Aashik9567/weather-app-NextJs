'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { WeatherIcon } from '@/components/ui/WeatherIcon';
import { MapPin, Calendar, Clock } from 'lucide-react';

interface CurrentWeatherProps {
  location: string;
  country: string;
  temperature: number;
  condition: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  localTime: string;
  isDay: boolean;
}

function CurrentWeatherCard({
  location = "London",
  country = "United Kingdom",
  temperature = 24,
  condition = "Heavy Rain",
  feelsLike = 22,
  humidity = 92,
  windSpeed = 6,
  pressure = 1013,
  visibility = 10,
  uvIndex = 3,
  localTime = "2025-06-11 06:40:28",
  isDay = true
}: Partial<CurrentWeatherProps>) {
  
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
        time: "06:40 AM",
        date: "Tuesday, Jun 11"
      };
    }
  };

  const { time, date } = formatTime(localTime);

  return (
    <GlassCard className="p-8 col-span-full lg:col-span-2">
      {/* Header - Location and Time */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
        <div className="mb-4 lg:mb-0">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-white/60" />
            <span className="text-white/80 text-sm font-medium">
              {location}, {country}
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
          </div>
        </div>
      </div>

      {/* Main Weather Display */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        
        {/* Temperature and Condition */}
        <div className="flex items-start gap-6 mb-6 lg:mb-0">
          {/* Weather Icon */}
          <div className="flex-shrink-0">
            <WeatherIcon 
              condition={condition} 
              size="xl" 
              animated={true}
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
              <p className="text-white text-lg font-medium capitalize">
                {condition}
              </p>
              <p className="text-white/60 text-sm">
                Feels like {feelsLike}°C
              </p>
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
              <div className="w-2 h-2 bg-yellow-400 rounded-full opacity-60"></div>
            </div>
            <div className="text-white text-lg font-semibold">{uvIndex}</div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export { CurrentWeatherCard };