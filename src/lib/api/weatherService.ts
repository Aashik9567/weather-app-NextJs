import { WeatherApiResponse, LocationSearchResult, WeatherData, ForecastData, WeatherError } from '@/lib/types/weather';

class WeatherService {
  private baseUrl: string;
  private apiKey: string;
  private timeout: number;

  constructor() {
    this.baseUrl = process.env.WEATHER_API_BASE_URL || 'http://api.weatherapi.com/v1';
    this.apiKey = process.env.WEATHER_API_KEY || '';
    this.timeout = parseInt(process.env.WEATHER_API_TIMEOUT || '10000');
    
    if (!this.apiKey) {
      console.warn('⚠️ Weather API key not found. Please add WEATHER_API_KEY to your .env.local file');
    } else {
      console.log('✅ Weather API initialized successfully');
    }
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    console.log(`🌤️ Making weather API request: ${url.replace(this.apiKey, '***API_KEY***')}`);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'WeatherApp/1.0.0 (Aashik9567)',
        },
        signal: controller.signal,
        next: { revalidate: parseInt(process.env.WEATHER_CACHE_DURATION || '300') },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Weather API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        
        throw new WeatherError(
          response.status,
          errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log('✅ Weather API response received successfully');
      return data;

    } catch (error) {
      if (error instanceof WeatherError) {
        throw error;
      }
      
      if (error.name === 'AbortError') {
        console.error('⏰ Weather API request timeout');
        throw new WeatherError(408, 'Request timeout. Please try again.');
      }
      
      console.error('❌ Weather API request failed:', error);
      throw new WeatherError(
        500,
        'Failed to fetch weather data. Please check your internet connection.'
      );
    }
  }

  // Get current weather for a location
  async getCurrentWeather(location: string): Promise<WeatherData> {
    const endpoint = `/current.json?key=${this.apiKey}&q=${encodeURIComponent(location)}&aqi=yes`;
    const response = await this.makeRequest<WeatherApiResponse>(endpoint);
    
    return this.transformCurrentWeather(response);
  }

  // Get weather forecast for a location
  async getForecast(location: string, days: number = 7): Promise<{ current: WeatherData; forecast: ForecastData[] }> {
    const endpoint = `/forecast.json?key=${this.apiKey}&q=${encodeURIComponent(location)}&days=${days}&aqi=yes&alerts=yes`;
    const response = await this.makeRequest<WeatherApiResponse>(endpoint);
    
    return {
      current: this.transformCurrentWeather(response),
      forecast: this.transformForecast(response.forecast?.forecastday || [])
    };
  }

  // Search for locations
  async searchLocations(query: string): Promise<LocationSearchResult[]> {
    if (!query || query.length < 2) return [];
    
    const endpoint = `/search.json?key=${this.apiKey}&q=${encodeURIComponent(query)}`;
    const response = await this.makeRequest<LocationSearchResult[]>(endpoint);
    
    return response;
  }

  // Get weather by coordinates
  async getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    const location = `${lat},${lon}`;
    return this.getCurrentWeather(location);
  }

  // Test API connection
  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      console.log('🧪 Testing Weather API connection...');
      await this.getCurrentWeather('London');
      return {
        success: true,
        message: 'Weather API connection successful!'
      };
    } catch (error: any) {
      console.error('❌ Weather API connection test failed:', error);
      return {
        success: false,
        message: error.message || 'Connection test failed'
      };
    }
  }

  // Transform API response to app format
  private transformCurrentWeather(response: WeatherApiResponse): WeatherData {
    const { location, current } = response;
    
    // Calculate dew point more accurately
    const dewPoint = this.calculateDewPoint(current.temp_c, current.humidity);
    
    return {
      location: location.name,
      country: location.country,
      region: location.region,
      temperature: Math.round(current.temp_c),
      condition: current.condition.text,
      conditionCode: current.condition.code,
      feelsLike: Math.round(current.feelslike_c),
      humidity: current.humidity,
      windSpeed: Math.round(current.wind_kph),
      windDirection: current.wind_degree,
      windDir: current.wind_dir,
      pressure: Math.round(current.pressure_mb),
      visibility: Math.round(current.vis_km),
      uvIndex: current.uv,
      precipitation: current.precip_mm,
      dewPoint: Math.round(dewPoint),
      cloud: current.cloud,
      localTime: location.localtime,
      isDay: current.is_day === 1,
      lastUpdated: current.last_updated,
    };
  }

  private transformForecast(forecastDays: any[]): ForecastData[] {
    return forecastDays.map(day => ({
      date: day.date,
      condition: day.day.condition.text,
      conditionCode: day.day.condition.code,
      maxTemp: Math.round(day.day.maxtemp_c),
      minTemp: Math.round(day.day.mintemp_c),
      humidity: day.day.avghumidity,
      windSpeed: Math.round(day.day.maxwind_kph),
      precipitation: day.day.totalprecip_mm,
      chanceOfRain: day.day.daily_chance_of_rain,
      uvIndex: day.day.uv,
      sunrise: day.astro.sunrise,
      sunset: day.astro.sunset,
      moonPhase: day.astro.moon_phase,
    }));
  }

  // Calculate dew point using Magnus formula
  private calculateDewPoint(temperature: number, humidity: number): number {
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temperature) / (b + temperature)) + Math.log(humidity / 100);
    return (b * alpha) / (a - alpha);
  }

  // Map weather condition codes to our icon system
  mapConditionToIcon(conditionCode: number, isDay: boolean): string {
    // Your existing condition mapping logic
    const conditionMap: { [key: number]: { day: string; night: string } } = {
      1000: { day: 'sunny', night: 'clear-night' },
      1003: { day: 'partly-cloudy', night: 'partly-cloudy-night' },
      1006: { day: 'cloudy', night: 'cloudy' },
      1009: { day: 'cloudy', night: 'cloudy' },
      1030: { day: 'fog', night: 'fog' },
      1063: { day: 'drizzle', night: 'drizzle' },
      1066: { day: 'snow', night: 'snow' },
      1180: { day: 'rain', night: 'rain' },
      1183: { day: 'rain', night: 'rain' },
      1186: { day: 'rain', night: 'rain' },
      1189: { day: 'rain', night: 'rain' },
      1192: { day: 'heavy-rain', night: 'heavy-rain' },
      1195: { day: 'heavy-rain', night: 'heavy-rain' },
      1273: { day: 'thunderstorm', night: 'thunderstorm' },
      1276: { day: 'thunderstorm', night: 'thunderstorm' },
      // Add more mappings as needed
    };

    const mapping = conditionMap[conditionCode];
    if (!mapping) {
      return isDay ? 'sunny' : 'clear-night';
    }

    return isDay ? mapping.day : mapping.night;
  }
}

// Create singleton instance
export const weatherService = new WeatherService();

// Custom error class
export class WeatherError extends Error {
  constructor(public code: number, message: string) {
    super(message);
    this.name = 'WeatherError';
  }
}