import { TemperatureChart } from '@/components/charts/TemperatureChart';
import { WeatherRadarChart } from '@/components/charts/WeatherRadarChart';
import { WeeklyForecastChart } from '@/components/charts/WeeklyForecastChart';
import { BarChart3, TrendingUp, Activity, Calendar } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export default function AnalyticsPage() {
  const currentTime = '2025-06-11 09:55:41';
  const currentUser = 'Aashik9567';

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <BarChart3 className="h-8 w-8" />
            Weather Analytics
          </h1>
          <p className="text-sky-100/80">
            Advanced weather data visualization and insights
          </p>
          <div className="mt-2 text-sky-200/60 text-sm flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              User: {currentUser}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              UTC: {currentTime}
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <GlassCard className="p-4 text-center">
            <div className="text-white text-2xl font-bold">15°C</div>
            <div className="text-sky-100/70 text-sm">Current Temperature</div>
            <div className="text-emerald-400 text-xs mt-1 flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +2.3°C from yesterday
            </div>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <div className="text-white text-2xl font-bold">65%</div>
            <div className="text-sky-100/70 text-sm">Humidity</div>
            <div className="text-sky-300 text-xs mt-1">Comfortable Range</div>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <div className="text-white text-2xl font-bold">15</div>
            <div className="text-sky-100/70 text-sm">Wind (km/h)</div>
            <div className="text-sky-300 text-xs mt-1">Light Breeze</div>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <div className="text-white text-2xl font-bold">1013</div>
            <div className="text-sky-100/70 text-sm">Pressure (mb)</div>
            <div className="text-emerald-400 text-xs mt-1">Stable</div>
          </GlassCard>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Temperature Chart */}
          <div className="lg:col-span-2">
            <TemperatureChart />
          </div>
          
          {/* Weather Radar */}
          <WeatherRadarChart 
            humidity={65}
            windSpeed={15}
            pressure={1013}
            visibility={10}
            uvIndex={4}
            precipitation={0}
          />
          
          {/* Additional Stats Card */}
          <GlassCard className="p-6">
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Today's Highlights
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-sky-500/10 rounded-lg">
                <div>
                  <div className="text-white text-sm font-medium">UV Index</div>
                  <div className="text-sky-200/70 text-xs">Moderate exposure</div>
                </div>
                <div className="text-orange-400 text-xl font-bold">4</div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-sky-500/10 rounded-lg">
                <div>
                  <div className="text-white text-sm font-medium">Visibility</div>
                  <div className="text-sky-200/70 text-xs">Clear conditions</div>
                </div>
                <div className="text-emerald-400 text-xl font-bold">10km</div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-sky-500/10 rounded-lg">
                <div>
                  <div className="text-white text-sm font-medium">Air Quality</div>
                  <div className="text-sky-200/70 text-xs">Good for outdoor activities</div>
                </div>
                <div className="text-emerald-400 text-xl font-bold">Good</div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-sky-500/10 rounded-lg">
                <div>
                  <div className="text-white text-sm font-medium">Feels Like</div>
                  <div className="text-sky-200/70 text-xs">Accounting for wind & humidity</div>
                </div>
                <div className="text-sky-300 text-xl font-bold">17°C</div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Weekly Forecast Chart */}
        <div className="mb-8">
          <WeeklyForecastChart />
        </div>

        {/* Data Summary */}
        <GlassCard className="p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Data Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-sky-200/60 mb-2">Data Source</div>
              <div className="text-white">WeatherAPI.com</div>
              <div className="text-sky-200/50 text-xs">Real-time updates every 5 minutes</div>
            </div>
            <div>
              <div className="text-sky-200/60 mb-2">Location</div>
              <div className="text-white">London, United Kingdom</div>
              <div className="text-sky-200/50 text-xs">51.5074°N, 0.1278°W</div>
            </div>
            <div>
              <div className="text-sky-200/60 mb-2">Last Updated</div>
              <div className="text-white">{currentTime}</div>
              <div className="text-sky-200/50 text-xs">User: {currentUser}</div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}