'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { 
  Droplets, 
  Wind, 
  Gauge, 
  Eye, 
  Sun, 
  Thermometer,
  CloudRain,
  Compass
} from 'lucide-react';

interface WeatherDetailsProps {
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  dewPoint: number;
  precipitation: number;
}

function WeatherDetails({
  humidity = 92,
  windSpeed = 6,
  windDirection = 230,
  pressure = 1013,
  visibility = 10,
  uvIndex = 3,
  dewPoint = 18,
  precipitation = 2.5
}: Partial<WeatherDetailsProps>) {

  // Convert wind direction to compass direction
  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  // Get UV Index description
  const getUVDescription = (uv: number) => {
    if (uv <= 2) return { text: 'Low', color: 'text-green-400' };
    if (uv <= 5) return { text: 'Moderate', color: 'text-yellow-400' };
    if (uv <= 7) return { text: 'High', color: 'text-orange-400' };
    if (uv <= 10) return { text: 'Very High', color: 'text-red-400' };
    return { text: 'Extreme', color: 'text-purple-400' };
  };

  const uvInfo = getUVDescription(uvIndex);

  const weatherMetrics = [
    {
      id: 'humidity',
      label: 'Humidity',
      value: `${humidity}%`,
      icon: Droplets,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      description: humidity > 80 ? 'Very humid' : humidity > 60 ? 'Moderate' : 'Dry'
    },
    {
      id: 'wind',
      label: 'Wind Speed',
      value: `${windSpeed} km/h`,
      icon: Wind,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      description: `${getWindDirection(windDirection)} direction`
    },
    {
      id: 'pressure',
      label: 'Pressure',
      value: `${pressure} mb`,
      icon: Gauge,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      description: pressure > 1020 ? 'High pressure' : pressure > 1000 ? 'Normal' : 'Low pressure'
    },
    {
      id: 'visibility',
      label: 'Visibility',
      value: `${visibility} km`,
      icon: Eye,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-400/10',
      description: visibility > 10 ? 'Excellent' : visibility > 5 ? 'Good' : 'Poor'
    },
    {
      id: 'uv',
      label: 'UV Index',
      value: uvIndex.toString(),
      icon: Sun,
      color: uvInfo.color,
      bgColor: 'bg-yellow-400/10',
      description: uvInfo.text
    },
    {
      id: 'dewpoint',
      label: 'Dew Point',
      value: `${dewPoint}°C`,
      icon: Thermometer,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
      description: dewPoint > 20 ? 'Uncomfortable' : dewPoint > 15 ? 'Comfortable' : 'Dry'
    },
    {
      id: 'precipitation',
      label: 'Precipitation',
      value: `${precipitation} mm`,
      icon: CloudRain,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-400/10',
      description: precipitation > 5 ? 'Heavy rain' : precipitation > 1 ? 'Light rain' : 'No rain'
    },
    {
      id: 'direction',
      label: 'Wind Direction',
      value: getWindDirection(windDirection),
      icon: Compass,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10',
      description: `${windDirection}° from north`
    }
  ];

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-white/10 rounded-xl">
          <Gauge className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-white text-lg font-semibold">Weather Details</h3>
          <p className="text-white/60 text-sm">Detailed atmospheric conditions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {weatherMetrics.map((metric) => {
          const IconComponent = metric.icon;
          
          return (
            <div
              key={metric.id}
              className="group relative overflow-hidden rounded-xl bg-white/5 p-4 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-2 right-2">
                  <IconComponent className="h-16 w-16 text-white" />
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <IconComponent className={`h-4 w-4 ${metric.color}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-white text-xl font-bold">
                      {metric.value}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-white/80 text-sm font-medium">
                    {metric.label}
                  </div>
                  <div className="text-white/60 text-xs">
                    {metric.description}
                  </div>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`absolute inset-0 ${metric.bgColor} blur-xl`}></div>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

export { WeatherDetails };