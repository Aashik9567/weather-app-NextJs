'use client';

import { useEffect, useState } from 'react';
import { CurrentWeatherCard } from '@/components/weather/CurrentWeatherCard';
import { WeatherDetails } from '@/components/weather/WeatherDetails';
import { ForecastCard } from '@/components/weather/ForecastCard';
import { SearchLocation } from '@/components/weather/SearchLocation';
import { useWeather } from '@/hooks/useWeather';
import { LocationSearchResult } from '@/lib/types/weather';
import { Home, BarChart3, Users } from 'lucide-react';

export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState('London');
  const [mounted, setMounted] = useState(false);
  const [currentTimestamp, setCurrentTimestamp] = useState('2025-06-12 07:54:15');
  
  const {
    current,
    forecast,
    loading,
    error,
    fetchWeather,
    fetchWeatherByCoords,
    refreshWeather,
    isLoading
  } = useWeather({
    location: selectedLocation,
    autoFetch: true,
    refreshInterval: 5
  });

  // Prevent hydration mismatch by only showing time after mount
  useEffect(() => {
    setMounted(true);
    
    // Update timestamp based on your provided time
    const updateTimestamp = () => {
      const baseTime = new Date('2025-06-12T07:54:15.000Z');
      const startTime = new Date('2025-06-12T07:54:15.000Z').getTime();
      const elapsed = Date.now() - startTime;
      const currentActualTime = new Date(baseTime.getTime() + elapsed);
      setCurrentTimestamp(currentActualTime.toISOString().replace('T', ' ').slice(0, 19));
    };

    updateTimestamp();
    const timer = setInterval(updateTimestamp, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLocationSelect = (location: LocationSearchResult) => {
    console.log('✅ Selected location:', location);
    const locationString = `${location.name}, ${location.country}`;
    setSelectedLocation(locationString);
    fetchWeather(locationString);
  };

  const handleLocationByCoords = (lat: number, lon: number) => {
    console.log('📍 Using coordinates:', { lat, lon });
    setSelectedLocation(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
    fetchWeatherByCoords(lat, lon);
  };

  const handleSearch = (query: string) => {
    console.log('🔍 Searching for:', query);
  };

  const handleRefresh = () => {
    console.log('🔄 Refreshing weather data...');
    refreshWeather();
  };

  // Don't render timestamp until mounted to prevent hydration mismatch
  const displayTimestamp = mounted ? currentTimestamp : '2025-06-12 07:54:15';

  if (error) {
    return (
      <div className="p-4 lg:p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-2">Weather Data Error</h1>
          <p className="text-white/60 mb-4 max-w-md">{error}</p>
          <button 
            onClick={handleRefresh}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Home className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
            <h1 className="text-2xl lg:text-4xl font-bold text-white">
              Weather Dashboard
            </h1>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
            <p className="text-sky-100/80 text-sm lg:text-base">
              Real-time weather data • Enhanced search • GPS support
            </p>
            <div className="text-sky-200/70 text-xs lg:text-sm">
              <span className="inline-flex items-center gap-1">
                <Users className="h-3 w-3" />
                User: Aashik9567
              </span>
              <span className="mx-2">|</span>
              <span>UTC: {displayTimestamp}</span>
            </div>
          </div>
          {loading && (
            <div className="mt-2 text-sky-300/70 text-sm flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-sky-300/30 border-t-sky-300/80 rounded-full animate-spin"></div>
              Loading weather data...
            </div>
          )}
        </div>
        
        {/* Main Grid - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Current Weather - Full width on mobile, 2 cols on desktop */}
          <div className="lg:col-span-2 order-1">
            {current ? (
              <CurrentWeatherCard 
                {...current}
                onRefresh={handleRefresh}
                isLoading={isLoading}
              />
            ) : (
              <div className="bg-sky-500/10 backdrop-blur-sm rounded-xl p-6 lg:p-8 flex items-center justify-center border border-sky-300/20">
                <div className="text-center">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 border-2 border-sky-300/30 border-t-sky-300/80 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-sky-100/70">Loading current weather...</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Search Location - Order 2 on mobile */}
          <div className="order-2">
            <SearchLocation 
              onLocationSelect={handleLocationSelect}
              onLocationByCoords={handleLocationByCoords}
              onSearch={handleSearch}
              currentLocation={current ? `${current.location}, ${current.country}` : selectedLocation}
            />
          </div>
          
          {/* Weather Details - Order 4 on mobile, order 3 on desktop */}
          <div className="order-4 lg:order-3">
            {current ? (
              <WeatherDetails 
                humidity={current.humidity}
                windSpeed={current.windSpeed}
                windDirection={current.windDirection}
                pressure={current.pressure}
                visibility={current.visibility}
                uvIndex={current.uvIndex}
                dewPoint={current.dewPoint}
                precipitation={current.precipitation}
              />
            ) : (
              <div className="bg-sky-500/10 backdrop-blur-sm rounded-xl p-4 lg:p-6 flex items-center justify-center border border-sky-300/20">
                <div className="text-center">
                  <div className="w-4 h-4 lg:w-6 lg:h-6 border-2 border-sky-300/30 border-t-sky-300/80 rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-sky-100/70 text-sm">Loading details...</p>
                </div>
              </div>
            )}
          </div>
          
          {/* 7-Day Forecast - Order 3 on mobile, spans 2 cols on desktop */}
          <div className="lg:col-span-2 order-3 lg:order-4">
            {forecast ? (
              <ForecastCard 
                forecast={forecast.map(day => ({
                  date: day.date,
                  condition: day.condition,
                  maxTemp: day.maxTemp,
                  minTemp: day.minTemp,
                  humidity: day.humidity,
                  windSpeed: day.windSpeed,
                  precipitation: day.chanceOfRain
                }))}
              />
            ) : (
              <div className="bg-sky-500/10 backdrop-blur-sm rounded-xl p-4 lg:p-6 flex items-center justify-center border border-sky-300/20">
                <div className="text-center">
                  <div className="w-4 h-4 lg:w-6 lg:h-6 border-2 border-sky-300/30 border-t-sky-300/80 rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-sky-100/70 text-sm">Loading forecast...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Footer - Mobile Friendly */}
        <div className="mt-6 lg:mt-8 p-4 lg:p-6 bg-sky-500/10 rounded-xl border border-sky-300/20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-white text-lg lg:text-xl font-bold">15°C</div>
              <div className="text-sky-200/70 text-xs lg:text-sm">Current</div>
            </div>
            <div>
              <div className="text-white text-lg lg:text-xl font-bold">15km/h</div>
              <div className="text-sky-200/70 text-xs lg:text-sm">Wind</div>
            </div>
            <div>
              <div className="text-white text-lg lg:text-xl font-bold">65%</div>
              <div className="text-sky-200/70 text-xs lg:text-sm">Humidity</div>
            </div>
            <div>
              <div className="text-white text-lg lg:text-xl font-bold">1013mb</div>
              <div className="text-sky-200/70 text-xs lg:text-sm">Pressure</div>
            </div>
          </div>
          
          {/* User info in footer */}
          <div className="mt-4 pt-4 border-t border-sky-300/20 text-center text-sky-200/60 text-xs">
            <div>Weather data for Aashik9567 • Last updated: {displayTimestamp} UTC</div>
          </div>
        </div>
      </div>
    </div>
  );
}