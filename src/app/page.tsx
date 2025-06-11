'use client';

import { CurrentWeatherCard } from '@/components/weather/CurrentWeatherCard'
import { WeatherDetails } from '@/components/weather/WeatherDetails'
import { ForecastCard } from '@/components/weather/ForecastCard'
import { SearchLocation } from '@/components/weather/SearchLocation'

export default function Home() {
  
  // Event handlers
  const handleLocationSelect = (location: any) => {
    console.log('✅ Selected location:', location);
  };

  const handleSearch = (query: string) => {
    console.log('🔍 Searching for:', query);
  };

  return (
    <main className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Weather App - Phase 3 Complete! ✨
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Weather - Spans 2 columns on large screens */}
          <div className="lg:col-span-2">
            <CurrentWeatherCard />
          </div>
          
          {/* Search Location */}
          <div>
            <SearchLocation 
              onLocationSelect={handleLocationSelect}
              onSearch={handleSearch}
            />
          </div>
          
          {/* Weather Details */}
          <div>
            <WeatherDetails />
          </div>
          
          {/* 7-Day Forecast - Spans 2 columns on large screens */}
          <div className="lg:col-span-2">
            <ForecastCard title="7-Day Forecast" />
            </div>
        </div>
      </div>
    </main>
  )
}