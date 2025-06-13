'use client';

import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { WeeklyForecastChart } from '@/components/charts/WeeklyForecastChart';
import { TemperatureChart } from '@/components/charts/TemperatureChart';
import { 
  Calendar, 
  TrendingUp, 
  Cloud, 
  Sun, 
  CloudRain, 
  Snowflake,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Users,
  Clock,
  RefreshCw,
  MapPin,
  Zap,
  Brain,
  ArrowUp,
  ArrowDown,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface HourlyForecast {
  time: string;
  hour: number;
  temperature: number;
  condition: string;
  precipitation: number;
  windSpeed: number;
  humidity: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface DailyForecast {
  date: string;
  day: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  precipitation: number;
  windSpeed: number;
  humidity: number;
  sunrise: string;
  sunset: string;
  moonPhase: string;
  uvIndex: number;
  icon: React.ComponentType<{ className?: string }>;
}

export default function ForecastPage() {
  const [mounted, setMounted] = useState(false);
  const [currentTimestamp, setCurrentTimestamp] = useState('2025-06-13 16:04:01');
  const [selectedView, setSelectedView] = useState<'hourly' | 'daily' | 'extended'>('daily');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('London, United Kingdom');

  const currentUser = 'Aashik9567';

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update timestamp with your current time: 2025-06-13 16:04:01
  useEffect(() => {
    if (!mounted) return;

    const updateTimestamp = () => {
      const baseTime = new Date('2025-06-13T16:04:01.000Z');
      const startTime = new Date('2025-06-13T16:04:01.000Z').getTime();
      const elapsed = Date.now() - startTime;
      const currentActualTime = new Date(baseTime.getTime() + elapsed);
      setCurrentTimestamp(currentActualTime.toISOString().replace('T', ' ').slice(0, 19));
    };

    updateTimestamp();
    const timer = setInterval(updateTimestamp, 1000);
    return () => clearInterval(timer);
  }, [mounted]);

  const displayTimestamp = mounted ? currentTimestamp : '2025-06-13 16:04:01';

  // Generate sample hourly forecast for next 24 hours
  const generateHourlyForecast = (): HourlyForecast[] => {
    const hours: HourlyForecast[] = [];
    const baseTemp = 15;
    const icons = [Sun, Cloud, CloudRain, Wind];
    const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'];
    
    for (let i = 0; i < 24; i++) {
      const date = new Date();
      date.setHours(date.getHours() + i);
      const hour = date.getHours();
      const timeVariation = Math.sin((hour - 6) * Math.PI / 12) * 6;
      const temp = Math.round((baseTemp + timeVariation + (Math.random() - 0.5) * 3) * 10) / 10;
      const conditionIndex = Math.floor(Math.random() * conditions.length);
      
      hours.push({
        time: `${hour.toString().padStart(2, '0')}:00`,
        hour,
        temperature: temp,
        condition: conditions[conditionIndex],
        precipitation: Math.round(Math.random() * 30),
        windSpeed: Math.round(10 + Math.random() * 15),
        humidity: Math.round(60 + Math.random() * 25),
        icon: icons[conditionIndex]
      });
    }
    
    return hours;
  };

  // Generate sample 10-day forecast
  const generateDailyForecast = (): DailyForecast[] => {
    const days: DailyForecast[] = [];
    const dayNames = ['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'];
    const icons = [Sun, Cloud, CloudRain, Wind, Snowflake];
    const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Snow Showers'];
    const moonPhases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon'];
    
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const baseTemp = 15 + Math.sin(i * 0.5) * 8;
      const conditionIndex = Math.floor(Math.random() * conditions.length);
      
      days.push({
        date: date.toISOString().split('T')[0],
        day: dayNames[i],
        maxTemp: Math.round(baseTemp + 3 + Math.random() * 4),
        minTemp: Math.round(baseTemp - 3 + Math.random() * 4),
        condition: conditions[conditionIndex],
        precipitation: Math.round(Math.random() * 40),
        windSpeed: Math.round(8 + Math.random() * 12),
        humidity: Math.round(55 + Math.random() * 30),
        sunrise: `06:${30 + Math.floor(Math.random() * 30)}`,
        sunset: `19:${15 + Math.floor(Math.random() * 30)}`,
        moonPhase: moonPhases[Math.floor(Math.random() * moonPhases.length)],
        uvIndex: Math.floor(Math.random() * 8) + 1,
        icon: icons[conditionIndex]
      });
    }
    
    return days;
  };

  const hourlyData = generateHourlyForecast();
  const dailyData = generateDailyForecast();

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const getUVColor = (uvIndex: number) => {
    if (uvIndex <= 2) return 'text-green-400';
    if (uvIndex <= 5) return 'text-yellow-400';
    if (uvIndex <= 7) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <Calendar className="h-8 w-8" />
                Weather Forecast
              </h1>
              <p className="text-sky-100/80">
                Detailed weather predictions and AI-powered insights
              </p>
              <div className="mt-2 text-sky-200/60 text-sm flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  User: {currentUser}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  UTC: {displayTimestamp}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {selectedLocation}
                </span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
                loading={isLoading}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="mb-6">
          <div className="flex gap-2 p-1 bg-sky-500/10 rounded-xl border border-sky-300/20">
            {(['hourly', 'daily', 'extended'] as const).map((view) => (
              <Button
                key={view}
                variant={selectedView === view ? 'glass' : 'ghost'}
                size="sm"
                onClick={() => setSelectedView(view)}
                className="flex-1 capitalize"
              >
                {view === 'hourly' && <Clock className="h-4 w-4 mr-2" />}
                {view === 'daily' && <Calendar className="h-4 w-4 mr-2" />}
                {view === 'extended' && <TrendingUp className="h-4 w-4 mr-2" />}
                {view} Forecast
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <GlassCard className="p-4 text-center">
            <div className="text-white text-2xl font-bold">18°C</div>
            <div className="text-sky-100/70 text-sm">Today's High</div>
            <div className="text-emerald-400 text-xs mt-1 flex items-center justify-center gap-1">
              <ArrowUp className="h-3 w-3" />
              +3°C from yesterday
            </div>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <div className="text-white text-2xl font-bold">8°C</div>
            <div className="text-sky-100/70 text-sm">Tonight's Low</div>
            <div className="text-blue-400 text-xs mt-1 flex items-center justify-center gap-1">
              <ArrowDown className="h-3 w-3" />
              -2°C from last night
            </div>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <div className="text-white text-2xl font-bold">15%</div>
            <div className="text-sky-100/70 text-sm">Rain Chance</div>
            <div className="text-sky-300 text-xs mt-1">Low probability</div>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <div className="text-white text-2xl font-bold">12km/h</div>
            <div className="text-sky-100/70 text-sm">Wind Speed</div>
            <div className="text-sky-300 text-xs mt-1">Light breeze</div>
          </GlassCard>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Forecast View */}
          <div className="lg:col-span-2">
            
            {/* Hourly Forecast */}
            {selectedView === 'hourly' && (
              <GlassCard className="p-6">
                <h2 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  24-Hour Hourly Forecast
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                  {hourlyData.map((hour, index) => {
                    const Icon = hour.icon;
                    return (
                      <div 
                        key={index}
                        className="p-4 bg-sky-500/10 rounded-xl border border-sky-300/20 hover:bg-sky-500/15 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-white font-medium">{hour.time}</div>
                          <Icon className="h-6 w-6 text-sky-300" />
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-sky-200/70">Temp:</span>
                            <span className="text-white font-medium">{hour.temperature}°C</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sky-200/70">Rain:</span>
                            <span className="text-blue-400">{hour.precipitation}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sky-200/70">Wind:</span>
                            <span className="text-green-400">{hour.windSpeed}km/h</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sky-200/70">Humidity:</span>
                            <span className="text-sky-300">{hour.humidity}%</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 text-xs text-sky-200/60">
                          {hour.condition}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 text-center text-sky-200/50 text-xs">
                  Hourly data for {currentUser} • Updated: {displayTimestamp} UTC
                </div>
              </GlassCard>
            )}

            {/* Daily Forecast */}
            {selectedView === 'daily' && (
              <GlassCard className="p-6">
                <h2 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  10-Day Daily Forecast
                </h2>
                
                <div className="space-y-4">
                  {dailyData.map((day, index) => {
                    const Icon = day.icon;
                    return (
                      <div 
                        key={index}
                        className="p-4 bg-sky-500/10 rounded-xl border border-sky-300/20 hover:bg-sky-500/15 transition-all duration-300"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                          {/* Day & Icon */}
                          <div className="flex items-center gap-3">
                            <Icon className="h-8 w-8 text-sky-300" />
                            <div>
                              <div className="text-white font-medium">{day.day}</div>
                              <div className="text-sky-200/60 text-sm">{day.date}</div>
                            </div>
                          </div>
                          
                          {/* Temperature */}
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-white text-lg font-bold">{day.maxTemp}°</span>
                              <span className="text-sky-300/70">/</span>
                              <span className="text-sky-300 text-lg">{day.minTemp}°</span>
                            </div>
                            <div className="text-sky-200/60 text-xs">{day.condition}</div>
                          </div>
                          
                          {/* Weather Details */}
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center gap-1">
                              <Droplets className="h-3 w-3 text-blue-400" />
                              <span className="text-sky-200/70">{day.precipitation}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Wind className="h-3 w-3 text-green-400" />
                              <span className="text-sky-200/70">{day.windSpeed}km/h</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3 text-purple-400" />
                              <span className="text-sky-200/70">{day.humidity}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Sun className="h-3 w-3 text-yellow-400" />
                              <span className={cn("text-sm", getUVColor(day.uvIndex))}>UV {day.uvIndex}</span>
                            </div>
                          </div>
                          
                          {/* Sun & Moon */}
                          <div className="text-right text-sm">
                            <div className="text-sky-200/70">☀️ {day.sunrise}</div>
                            <div className="text-sky-200/70">🌙 {day.sunset}</div>
                            <div className="text-sky-300/60 text-xs">{day.moonPhase}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 text-center text-sky-200/50 text-xs">
                  10-day forecast for {currentUser} • Updated: {displayTimestamp} UTC
                </div>
              </GlassCard>
            )}

            {/* Extended Forecast with Charts */}
            {selectedView === 'extended' && (
              <div className="space-y-6">
                <TemperatureChart />
                <WeeklyForecastChart />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Weather Alerts */}
            <GlassCard className="p-6">
              <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Weather Alerts
              </h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium mb-1">
                    <Cloud className="h-4 w-4" />
                    Weather Advisory
                  </div>
                  <div className="text-yellow-200/90 text-xs">
                    Cloudy conditions expected throughout the week. No severe weather anticipated.
                  </div>
                </div>
                
                <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mb-1">
                    <Sun className="h-4 w-4" />
                    All Clear
                  </div>
                  <div className="text-emerald-200/90 text-xs">
                    No severe weather warnings in effect for your area.
                  </div>
                </div>
              </div>
            </GlassCard>
            
            {/* AI Insights */}
            <GlassCard className="p-6">
              <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Weather Insights
              </h3>
              
              <div className="space-y-4">
                <div className="p-3 bg-sky-500/10 rounded-lg border border-sky-300/20">
                  <div className="text-sky-300 text-sm font-medium mb-2">Pattern Analysis</div>
                  <div className="text-sky-100/90 text-xs leading-relaxed">
                    AI detects a stable high-pressure system bringing consistent weather for the next 5 days.
                  </div>
                </div>
                
                <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-300/20">
                  <div className="text-purple-300 text-sm font-medium mb-2">Recommendation</div>
                  <div className="text-purple-100/90 text-xs leading-relaxed">
                    Perfect conditions for outdoor activities this weekend. Plan your adventures!
                  </div>
                </div>
              </div>
              
              <Button variant="glass" size="sm" className="w-full mt-4">
                View All AI Insights
              </Button>
            </GlassCard>

            {/* Weather Stats */}
            <GlassCard className="p-6">
              <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Weather Statistics
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-sky-200/70">Average Temp (Week)</span>
                    <span className="text-white font-medium">14°C</span>
                  </div>
                  <div className="w-full bg-sky-500/20 rounded-full h-2">
                    <div className="bg-sky-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-sky-200/70">Rainfall Probability</span>
                    <span className="text-white font-medium">25%</span>
                  </div>
                  <div className="w-full bg-blue-500/20 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-sky-200/70">Wind Intensity</span>
                    <span className="text-white font-medium">Moderate</span>
                  </div>
                  <div className="w-full bg-green-500/20 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sky-200/50 text-xs">
          <div>Enhanced forecast data for {currentUser} • Powered by AI & real-time analysis</div>
          <div>Last updated: {displayTimestamp} UTC • Location: {selectedLocation}</div>
        </div>
      </div>
    </div>
  );
}