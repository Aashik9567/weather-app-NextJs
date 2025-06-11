'use client';

import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Activity, Eye, Wind } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface WeatherRadarData {
  metric: string;
  current: number;
  average: number;
  fullMark: number;
}

interface WeatherRadarChartProps {
  humidity?: number;
  windSpeed?: number;
  pressure?: number;
  visibility?: number;
  uvIndex?: number;
  precipitation?: number;
  className?: string;
}

export function WeatherRadarChart({
  humidity = 65,
  windSpeed = 15,
  pressure = 1013,
  visibility = 10,
  uvIndex = 4,
  precipitation = 0,
  className
}: WeatherRadarChartProps) {
  
  // Normalize values to 0-100 scale for radar chart
  const normalizeValue = (value: number, max: number) => {
    return Math.min(100, (value / max) * 100);
  };

  const data: WeatherRadarData[] = [
    {
      metric: 'Humidity',
      current: humidity,
      average: 60,
      fullMark: 100,
    },
    {
      metric: 'Wind Speed',
      current: normalizeValue(windSpeed, 50), // Max 50 km/h
      average: normalizeValue(10, 50),
      fullMark: 100,
    },
    {
      metric: 'Pressure',
      current: normalizeValue(pressure - 950, 100), // 950-1050 range
      average: normalizeValue(1013 - 950, 100),
      fullMark: 100,
    },
    {
      metric: 'Visibility',
      current: normalizeValue(visibility, 20), // Max 20 km
      average: normalizeValue(15, 20),
      fullMark: 100,
    },
    {
      metric: 'UV Index',
      current: normalizeValue(uvIndex, 11), // Max UV 11
      average: normalizeValue(5, 11),
      fullMark: 100,
    },
    {
      metric: 'Precipitation',
      current: normalizeValue(precipitation, 50), // Max 50mm
      average: normalizeValue(5, 50),
      fullMark: 100,
    },
  ];

  const CustomTick = ({ payload, x, y, cx, cy, ...rest }: any) => {
    return (
      <g className="recharts-layer recharts-polar-angle-axis-tick">
        <text 
          x={x} 
          y={y} 
          className="recharts-text recharts-polar-angle-axis-tick-value" 
          textAnchor={x > cx ? 'start' : x < cx ? 'end' : 'middle'}
          fill="rgba(255,255,255,0.8)"
          fontSize="12"
        >
          <tspan>{payload.value}</tspan>
        </text>
      </g>
    );
  };

  return (
    <GlassCard className={`p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-sky-500/20 rounded-xl border border-sky-300/30">
          <Activity className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-white text-lg font-semibold">Weather Conditions Radar</h3>
          <p className="text-sky-100/70 text-sm">Multi-dimensional weather analysis</p>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
            <PolarGrid 
              stroke="rgba(255,255,255,0.2)" 
              strokeDasharray="2 2"
            />
            
            <PolarAngleAxis 
              dataKey="metric" 
              tick={<CustomTick />}
              className="text-white"
            />
            
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
              tickCount={6}
            />
            
            <Radar
              name="Current Conditions"
              dataKey="current"
              stroke="#0ea5e9"
              fill="#0ea5e9"
              fillOpacity={0.3}
              strokeWidth={2}
              dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
            />
            
            <Radar
              name="Average Conditions"
              dataKey="average"
              stroke="#38bdf8"
              fill="#38bdf8"
              fillOpacity={0.1}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#38bdf8', strokeWidth: 1, r: 2 }}
            />
            
            <Legend 
              wrapperStyle={{ 
                paddingTop: '20px',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.8)'
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Real Values */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 pt-4 border-t border-sky-300/20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
          <div>
            <div className="text-sky-200/60 text-xs">Humidity</div>
            <div className="text-white text-sm font-semibold">{humidity}%</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Wind className="h-3 w-3 text-sky-300" />
          <div>
            <div className="text-sky-200/60 text-xs">Wind</div>
            <div className="text-white text-sm font-semibold">{windSpeed} km/h</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
          <div>
            <div className="text-sky-200/60 text-xs">Pressure</div>
            <div className="text-white text-sm font-semibold">{pressure} mb</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Eye className="h-3 w-3 text-sky-300" />
          <div>
            <div className="text-sky-200/60 text-xs">Visibility</div>
            <div className="text-white text-sm font-semibold">{visibility} km</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div>
            <div className="text-sky-200/60 text-xs">UV Index</div>
            <div className="text-white text-sm font-semibold">{uvIndex}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <div>
            <div className="text-sky-200/60 text-xs">Rain</div>
            <div className="text-white text-sm font-semibold">{precipitation} mm</div>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="mt-3 text-center text-sky-200/50 text-xs">
        User: Aashik9567 | Analysis updated: 2025-06-11 09:55:41 UTC
      </div>
    </GlassCard>
  );
}