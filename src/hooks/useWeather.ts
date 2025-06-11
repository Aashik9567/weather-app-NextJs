'use client';

import { useState, useEffect, useCallback } from 'react';
import { WeatherData, ForecastData } from '@/lib/types/weather';

interface UseWeatherOptions {
  location?: string;
  autoFetch?: boolean;
  refreshInterval?: number; // in minutes
}

interface WeatherState {
  current: WeatherData | null;
  forecast: ForecastData[] | null;
  loading: boolean;
  error: string | null;
}

export function useWeather(options: UseWeatherOptions = {}) {
  const { location = 'London', autoFetch = true, refreshInterval = 5 } = options;
  
  const [state, setState] = useState<WeatherState>({
    current: null,
    forecast: null,
    loading: false,
    error: null,
  });

  const fetchWeather = useCallback(async (searchLocation?: string) => {
    const targetLocation = searchLocation || location;
    
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Fetch both current weather and forecast
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(`/api/weather/current?location=${encodeURIComponent(targetLocation)}`),
        fetch(`/api/weather/forecast?location=${encodeURIComponent(targetLocation)}&days=7`)
      ]);

      if (!currentResponse.ok || !forecastResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();

      if (!currentData.success || !forecastData.success) {
        throw new Error(
          currentData.error?.message || 
          forecastData.error?.message || 
          'Unknown error occurred'
        );
      }

      setState({
        current: currentData.data,
        forecast: forecastData.data.forecast,
        loading: false,
        error: null,
      });

    } catch (error: any) {
      console.error('Weather fetch error:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to fetch weather data',
      }));
    }
  }, [location]);

  const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(`/api/weather/current?lat=${lat}&lon=${lon}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error?.message || 'Unknown error occurred');
      }

      // Also fetch forecast for this location
      await fetchWeather(`${lat},${lon}`);

    } catch (error: any) {
      console.error('Weather fetch by coords error:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to fetch weather data',
      }));
    }
  }, [fetchWeather]);

  const refreshWeather = useCallback(() => {
    fetchWeather();
  }, [fetchWeather]);

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch) {
      fetchWeather();
    }
  }, [autoFetch, fetchWeather]);

  // Auto-refresh interval
  useEffect(() => {
    if (refreshInterval > 0 && autoFetch) {
      const interval = setInterval(() => {
        fetchWeather();
      }, refreshInterval * 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [refreshInterval, autoFetch, fetchWeather]);

  return {
    ...state,
    fetchWeather,
    fetchWeatherByCoords,
    refreshWeather,
    isLoading: state.loading,
  };
}