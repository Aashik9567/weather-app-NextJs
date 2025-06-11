'use client';

import { useEffect, useState } from 'react';
import { CurrentWeatherCard } from '@/components/weather/CurrentWeatherCard';
import { WeatherDetails } from '@/components/weather/WeatherDetails';
import { ForecastCard } from '@/components/weather/ForecastCard';
import { SearchLocation } from '@/components/weather/SearchLocation';
import { useWeather } from '@/hooks/useWeather';
import { LocationSearchResult } from '@/lib/types/weather';
import { Home, BarChart3 } from 'lucide-react';

export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState('London');
  
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
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Home className="h-8 w-8 text-white" />
            <h1 className="text-4xl font-bold text-white">
              Weather Dashboard
            </h1>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-white/60">
              Real-time weather data • Enhanced search • GPS support
            </p>
            <div className="text-white/40 text-sm">
              User: Aashik9567 | UTC: {new Date().toISOString().replace('T', ' ').slice(0, 19)}
            </div>
          </div>
          {loading && (
            <div className="mt-2 text-white/50 text-sm flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
              Loading weather data...
            </div>
          )}
        </div>
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Weather */}
          <div className="lg:col-span-2">
            {current ? (
              <CurrentWeatherCard 
                {...current}
                onRefresh={handleRefresh}
                isLoading={isLoading}
              />
            ) : (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white/60">Loading current weather...</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Search Location */}
          <div>
            <SearchLocation 
              onLocationSelect={handleLocationSelect}
              onLocationByCoords={handleLocationByCoords}
              onSearch={handleSearch}
              currentLocation={current ? `${current.location}, ${current.country}` : selectedLocation}
            />
          </div>
          
          {/* Weather Details */}
          <div>
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
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-white/60 text-sm">Loading details...</p>
                </div>
              </div>
            )}
          </div>
          
          {/* 7-Day Forecast */}
          <div className="lg:col-span-2">
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
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-white/60 text-sm">Loading forecast...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}