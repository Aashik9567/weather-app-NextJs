'use client';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { format } from 'date-fns';
import { Thermometer, TrendingUp, TrendingDown } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface TemperatureDataPoint {
  time: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  hour: number;
}

interface TemperatureChartProps {
  data?: TemperatureDataPoint[];
  title?: string;
  showFeelsLike?: boolean;
  className?: string;
}

// Generate sample 24-hour temperature data
const generateTemperatureData = (): TemperatureDataPoint[] => {
  const baseTemp = 15; // Current London temp
  const data: TemperatureDataPoint[] = [];
  
  for (let i = 0; i < 24; i++) {
    const hour = i;
    const timeVariation = Math.sin((i - 6) * Math.PI / 12) * 8; // Temperature curve
    const randomVariation = (Math.random() - 0.5) * 3;
    const temp = Math.round((baseTemp + timeVariation + randomVariation) * 10) / 10;
    const feelsLike = Math.round((temp + (Math.random() - 0.5) * 4) * 10) / 10;
    const humidity = Math.round(65 + Math.sin(i * Math.PI / 12) * 20 + (Math.random() - 0.5) * 10);
    
    data.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      temperature: temp,
      feelsLike,
      humidity: Math.max(0, Math.min(100, humidity)),
      hour
    });
  }
  
  return data;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <GlassCard className="p-3 border border-sky-300/30">
        <div className="text-white text-sm font-medium mb-2">{label}</div>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sky-100/80">{entry.name}:</span>
            <span className="text-white font-semibold">
              {entry.value}°C
            </span>
          </div>
        ))}
      </GlassCard>
    );
  }
  return null;
};

export function TemperatureChart({ 
  data, 
  title = "24-Hour Temperature Trend",
  showFeelsLike = true,
  className 
}: TemperatureChartProps) {
  const chartData = data || generateTemperatureData();
  const currentTemp = chartData[new Date().getUTCHours()]?.temperature || 15;
  const prevTemp = chartData[Math.max(0, new Date().getUTCHours() - 1)]?.temperature || 15;
  const tempChange = currentTemp - prevTemp;

  return (
    <GlassCard className={`p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-500/20 rounded-xl border border-sky-300/30">
            <Thermometer className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold">{title}</h3>
            <p className="text-sky-100/70 text-sm">Real-time temperature monitoring</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-white text-2xl font-bold">{currentTemp}°C</div>
          <div className={`text-sm flex items-center gap-1 ${
            tempChange > 0 ? 'text-emerald-400' : tempChange < 0 ? 'text-red-400' : 'text-sky-300'
          }`}>
            {tempChange > 0 ? <TrendingUp className="h-3 w-3" /> : 
             tempChange < 0 ? <TrendingDown className="h-3 w-3" /> : null}
            {tempChange > 0 ? '+' : ''}{tempChange.toFixed(1)}°C
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="feelsLikeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
              interval={3}
            />
            
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
              domain={['dataMin - 2', 'dataMax + 2']}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Area
              type="monotone"
              dataKey="temperature"
              stroke="#0ea5e9"
              strokeWidth={3}
              fill="url(#temperatureGradient)"
              name="Temperature"
            />
            
            {showFeelsLike && (
              <Line
                type="monotone"
                dataKey="feelsLike"
                stroke="#38bdf8"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Feels Like"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-sky-300/20">
        <div className="text-center">
          <div className="text-sky-200/60 text-xs uppercase tracking-wide">Max Today</div>
          <div className="text-white font-semibold">
            {Math.max(...chartData.map(d => d.temperature)).toFixed(1)}°C
          </div>
        </div>
        <div className="text-center">
          <div className="text-sky-200/60 text-xs uppercase tracking-wide">Min Today</div>
          <div className="text-white font-semibold">
            {Math.min(...chartData.map(d => d.temperature)).toFixed(1)}°C
          </div>
        </div>
        <div className="text-center">
          <div className="text-sky-200/60 text-xs uppercase tracking-wide">Average</div>
          <div className="text-white font-semibold">
            {(chartData.reduce((sum, d) => sum + d.temperature, 0) / chartData.length).toFixed(1)}°C
          </div>
        </div>
      </div>

      {/* Timestamp */}
      <div className="mt-3 text-center text-sky-200/50 text-xs">
        User: Aashik9567 | Last updated: 2025-06-11 09:55:41 UTC
      </div>
    </GlassCard>
  );
}