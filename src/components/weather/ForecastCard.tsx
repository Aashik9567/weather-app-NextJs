'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { WeatherIcon } from '@/components/ui/WeatherIcon';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';

interface ForecastDay {
  date: string;
  condition: string;
  maxTemp: number;
  minTemp: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
}

interface ForecastCardProps {
  forecast?: ForecastDay[];  // Add ? to make it optional
  title?: string;
}

function ForecastCard({
  forecast = [
    { date: '2025-06-11', condition: 'sunny', maxTemp: 25, minTemp: 18, humidity: 65, windSpeed: 12, precipitation: 0 },
    { date: '2025-06-12', condition: 'partly-cloudy', maxTemp: 23, minTemp: 16, humidity: 70, windSpeed: 8, precipitation: 10 },
    { date: '2025-06-13', condition: 'rain', maxTemp: 20, minTemp: 14, humidity: 85, windSpeed: 15, precipitation: 75 },
    { date: '2025-06-14', condition: 'thunderstorm', maxTemp: 22, minTemp: 15, humidity: 90, windSpeed: 20, precipitation: 90 },
    { date: '2025-06-15', condition: 'cloudy', maxTemp: 19, minTemp: 13, humidity: 75, windSpeed: 10, precipitation: 30 },
    { date: '2025-06-16', condition: 'partly-cloudy', maxTemp: 24, minTemp: 17, humidity: 60, windSpeed: 14, precipitation: 5 },
    { date: '2025-06-17', condition: 'sunny', maxTemp: 27, minTemp: 19, humidity: 55, windSpeed: 11, precipitation: 0 },
  ],
  title = "7-Day Forecast"
}: ForecastCardProps) {

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (date.toDateString() === today.toDateString()) {
        return 'Today';
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow';
      } else {
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      }
    } catch {
      return 'Unknown';
    }
  };

  // Get precipitation probability color
  const getPrecipitationColor = (precipitation: number) => {
    if (precipitation >= 70) return 'text-blue-400';
    if (precipitation >= 40) return 'text-yellow-400';
    if (precipitation >= 10) return 'text-orange-400';
    return 'text-gray-400';
  };

  return (
    <GlassCard className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-white/10 rounded-xl">
          <Calendar className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-white text-lg font-semibold">{title}</h3>
          <p className="text-white/60 text-sm">Extended weather outlook</p>
        </div>
      </div>

      {/* Forecast List */}
      <div className="space-y-3">
        {forecast.map((day, index) => (
          <div
            key={day.date}
            className="group relative overflow-hidden rounded-xl bg-white/5 p-4 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              
              {/* Date */}
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium text-sm">
                  {formatDate(day.date)}
                </div>
                <div className="text-white/60 text-xs mt-1">
                  {index === 0 ? 'Current conditions' : `Day ${index + 1}`}
                </div>
              </div>

              {/* Weather Icon */}
              <div className="flex-shrink-0 mx-4">
                <WeatherIcon 
                  condition={day.condition} 
                  size="md" 
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Temperature Range */}
              <div className="flex items-center gap-2 min-w-[80px] justify-end">
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-red-400" />
                    <span className="text-white font-semibold text-sm">
                      {day.maxTemp}°
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingDown className="h-3 w-3 text-blue-400" />
                    <span className="text-white/70 text-sm">
                      {day.minTemp}°
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Info (Mobile Hidden, Desktop Visible) */}
              <div className="hidden lg:flex flex-col items-end ml-4 min-w-[100px]">
                <div className="flex items-center gap-4 text-xs text-white/60">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
                    <span>{day.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full opacity-60"></div>
                    <span>{day.windSpeed}km/h</span>
                  </div>
                </div>
                <div className={`text-xs mt-1 ${getPrecipitationColor(day.precipitation)}`}>
                  {day.precipitation}% rain
                </div>
              </div>
            </div>

            {/* Mobile Additional Info (Expandable) */}
            <div className="lg:hidden mt-3 pt-3 border-t border-white/10">
              <div className="flex justify-between text-xs text-white/60">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
                  <span>Humidity: {day.humidity}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full opacity-60"></div>
                  <span>Wind: {day.windSpeed}km/h</span>
                </div>
                <div className={`${getPrecipitationColor(day.precipitation)}`}>
                  Rain: {day.precipitation}%
                </div>
              </div>
            </div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-xl"></div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

export { ForecastCard };