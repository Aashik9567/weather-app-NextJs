'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Calendar, TrendingUp, CloudRain } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { WeatherIcon } from '@/components/ui/WeatherIcon';

interface DayForecast {
  day: string;
  date: string;
  maxTemp: number;
  minTemp: number;
  precipitation: number;
  condition: string;
  conditionCode?: number;
}

interface WeeklyForecastChartProps {
  forecast?: DayForecast[];
  className?: string;
}

const generateWeeklyForecast = (): DayForecast[] => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const conditions = [
    { condition: 'Sunny', code: 1000 },
    { condition: 'Partly Cloudy', code: 1003 },
    { condition: 'Cloudy', code: 1006 },
    { condition: 'Rainy', code: 1183 },
  ];
  
  const baseDate = new Date('2025-06-11');
  
  return days.map((day, index) => {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + index);
    
    const conditionData = conditions[Math.floor(Math.random() * conditions.length)];
    const baseTemp = 15 + (Math.random() - 0.5) * 10;
    
    return {
      day,
      date: date.toISOString().split('T')[0],
      maxTemp: Math.round(baseTemp + 5 + Math.random() * 5),
      minTemp: Math.round(baseTemp - 5 + Math.random() * 5),
      precipitation: Math.round(Math.random() * 20),
      condition: conditionData.condition,
      conditionCode: conditionData.code
    };
  });
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <GlassCard className="p-3 border border-sky-300/30">
        <div className="text-white text-sm font-medium mb-2">{label}</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sky-100/80">Max Temp:</span>
            <span className="text-red-400 font-semibold">{data.maxTemp}°C</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sky-100/80">Min Temp:</span>
            <span className="text-blue-400 font-semibold">{data.minTemp}°C</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sky-100/80">Rain:</span>
            <span className="text-sky-300 font-semibold">{data.precipitation}%</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sky-100/80">Condition:</span>
            <span className="text-white font-semibold">{data.condition}</span>
          </div>
        </div>
      </GlassCard>
    );
  }
  return null;
};

export function WeeklyForecastChart({ 
  forecast, 
  className 
}: WeeklyForecastChartProps) {
  const data = forecast || generateWeeklyForecast();
  
  // Calculate temperature range for bar chart
  const chartData = data.map(day => ({
    ...day,
    tempRange: day.maxTemp - day.minTemp,
    tempBase: day.minTemp
  }));

  const maxTemp = Math.max(...data.map(d => d.maxTemp));
  const minTemp = Math.min(...data.map(d => d.minTemp));
  const avgPrecipitation = data.reduce((sum, d) => sum + d.precipitation, 0) / data.length;

  return (
    <GlassCard className={`p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-500/20 rounded-xl border border-sky-300/30">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold">7-Day Temperature Forecast</h3>
            <p className="text-sky-100/70 text-sm">Daily high/low temperature trends</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-white text-sm">
            Range: {minTemp}°C - {maxTemp}°C
          </div>
          <div className="text-sky-200/70 text-xs">
            Avg. Rain: {avgPrecipitation.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Weather Icons Row */}
      <div className="flex justify-between mb-4 px-4">
        {data.map((day, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <WeatherIcon 
              condition={day.condition}
              conditionCode={day.conditionCode}
              size="sm"
              isDay={true}
            />
            <div className="text-sky-200/60 text-xs">{day.day}</div>
          </div>
        ))}
      </div>

      {/* Temperature Chart */}
      <div className="h-48 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
            />
            
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
              domain={[minTemp - 2, maxTemp + 2]}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            {/* Min Temperature Base */}
            <Bar dataKey="tempBase" fill="transparent" />
            
            {/* Temperature Range */}
            <Bar dataKey="tempRange" stackId="temp" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`url(#temperatureGradient-${index})`}
                />
              ))}
            </Bar>
            
            <defs>
              {chartData.map((_, index) => (
                <linearGradient 
                  key={index}
                  id={`temperatureGradient-${index}`} 
                  x1="0" 
                  y1="0" 
                  x2="0" 
                  y2="1"
                >
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.8}/>
                </linearGradient>
              ))}
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Details */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {data.map((day, index) => (
          <div key={index} className="p-2 bg-sky-500/10 rounded-lg border border-sky-300/20">
            <div className="text-sky-200/60 text-xs mb-1">{day.day}</div>
            <div className="text-red-400 text-sm font-semibold">{day.maxTemp}°</div>
            <div className="text-blue-400 text-sm font-semibold">{day.minTemp}°</div>
            <div className="text-sky-300 text-xs mt-1">
              <CloudRain className="h-3 w-3 inline mr-1" />
              {day.precipitation}%
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-sky-300/20">
        <div className="text-center">
          <div className="text-sky-200/60 text-xs uppercase tracking-wide">Warmest</div>
          <div className="text-red-400 font-semibold">{maxTemp}°C</div>
          <div className="text-sky-200/50 text-xs">
            {data.find(d => d.maxTemp === maxTemp)?.day}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sky-200/60 text-xs uppercase tracking-wide">Coolest</div>
          <div className="text-blue-400 font-semibold">{minTemp}°C</div>
          <div className="text-sky-200/50 text-xs">
            {data.find(d => d.minTemp === minTemp)?.day}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sky-200/60 text-xs uppercase tracking-wide">Avg Rain</div>
          <div className="text-sky-300 font-semibold">{avgPrecipitation.toFixed(1)}%</div>
          <div className="text-sky-200/50 text-xs">This Week</div>
        </div>
      </div>

      {/* Timestamp */}
      <div className="mt-3 text-center text-sky-200/50 text-xs">
        User: Aashik9567 | Forecast updated: 2025-06-11 09:55:41 UTC
      </div>
    </GlassCard>
  );
}