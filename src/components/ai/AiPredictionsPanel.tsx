'use client';

import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { 
  Brain, 
  RefreshCw, 
  TrendingUp, 
  Cloud, 
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  Gauge
} from 'lucide-react';
import { WeatherAI, WeatherPrediction } from '@/lib/ai/weatherAnalyzer';
import { cn } from '@/lib/utils/cn';

interface AIPredictionsPanelProps {
  currentWeather?: any;
  className?: string;
}

export function AIPredictionsPanel({ 
  currentWeather = {
    temperature: 15,
    humidity: 65,
    pressure: 1013,
    windSpeed: 15,
    visibility: 10,
    precipitation: 0
  },
  className 
}: AIPredictionsPanelProps) {
  const [predictions, setPredictions] = useState<WeatherPrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('2025-06-11 10:05:22');

  const weatherAI = new WeatherAI('Aashik9567');

  useEffect(() => {
    generatePredictions();
  }, []);

  const generatePredictions = async () => {
    setIsLoading(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newPredictions = weatherAI.generatePredictions(currentWeather);
    setPredictions(newPredictions);
    setLastUpdated(new Date().toISOString().replace('T', ' ').slice(0, 19));
    setIsLoading(false);
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 0.8) return 'text-emerald-400';
    if (probability >= 0.6) return 'text-sky-400';
    if (probability >= 0.4) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getConditionIcon = (condition: string) => {
    if (condition.toLowerCase().includes('rain')) return CloudRain;
    if (condition.toLowerCase().includes('cloud')) return Cloud;
    if (condition.toLowerCase().includes('clear') || condition.toLowerCase().includes('sunny')) return Sun;
    if (condition.toLowerCase().includes('wind')) return Wind;
    return Cloud;
  };

  return (
    <GlassCard className={cn('p-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-500/20 rounded-xl border border-sky-300/30">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold">AI Weather Predictions</h3>
            <p className="text-sky-100/70 text-sm">Machine learning powered forecasting</p>
          </div>
        </div>
        
        <Button
          variant="glass"
          size="sm"
          onClick={generatePredictions}
          loading={isLoading}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          {isLoading ? 'Analyzing...' : 'Refresh'}
        </Button>
      </div>

      {/* Current Conditions Summary */}
      <div className="mb-6 p-4 bg-sky-500/10 rounded-xl border border-sky-300/20">
        <h4 className="text-white font-medium mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Current Analysis Input
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-red-400" />
            <span className="text-sky-200/70">Temperature:</span>
            <span className="text-white font-medium">{currentWeather.temperature}°C</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-400" />
            <span className="text-sky-200/70">Humidity:</span>
            <span className="text-white font-medium">{currentWeather.humidity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-purple-400" />
            <span className="text-sky-200/70">Pressure:</span>
            <span className="text-white font-medium">{currentWeather.pressure}mb</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-green-400" />
            <span className="text-sky-200/70">Wind:</span>
            <span className="text-white font-medium">{currentWeather.windSpeed}km/h</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-sky-400" />
            <span className="text-sky-200/70">Visibility:</span>
            <span className="text-white font-medium">{currentWeather.visibility}km</span>
          </div>
          <div className="flex items-center gap-2">
            <CloudRain className="h-4 w-4 text-sky-300" />
            <span className="text-sky-200/70">Rain:</span>
            <span className="text-white font-medium">{currentWeather.precipitation}mm</span>
          </div>
        </div>
      </div>

      {/* AI Predictions */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-sky-500/10 rounded-xl border border-sky-300/20 animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-sky-500/30 rounded-lg"></div>
                <div>
                  <div className="w-32 h-4 bg-sky-500/30 rounded mb-1"></div>
                  <div className="w-24 h-3 bg-sky-500/20 rounded"></div>
                </div>
              </div>
              <div className="w-full h-3 bg-sky-500/20 rounded mb-2"></div>
              <div className="w-3/4 h-3 bg-sky-500/20 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {predictions.map((prediction, index) => {
            const ConditionIcon = getConditionIcon(prediction.condition);
            
            return (
              <div 
                key={index}
                className="p-4 bg-sky-500/10 rounded-xl border border-sky-300/20 hover:bg-sky-500/15 transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-sky-600/20 rounded-lg">
                    <ConditionIcon className="h-5 w-5 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-white font-medium">{prediction.condition}</h5>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          'text-sm font-bold',
                          getProbabilityColor(prediction.probability)
                        )}>
                          {Math.round(prediction.probability * 100)}%
                        </span>
                        <span className="text-sky-200/60 text-xs">confidence</span>
                      </div>
                    </div>
                    
                    <div className="text-sky-100/80 text-sm mb-2">
                      <span className="font-medium">Timeframe:</span> {prediction.timeframe}
                    </div>
                    
                    <p className="text-sky-200/70 text-xs leading-relaxed">
                      <strong>AI Analysis:</strong> {prediction.reasoning}
                    </p>
                  </div>
                </div>

                {/* Probability Bar */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-sky-200/60 text-xs w-16">Likelihood:</span>
                  <div className="flex-1 bg-sky-500/20 rounded-full h-2">
                    <div 
                      className={cn(
                        'h-2 rounded-full transition-all duration-500',
                        prediction.probability >= 0.8 ? 'bg-emerald-500' :
                        prediction.probability >= 0.6 ? 'bg-sky-500' :
                        prediction.probability >= 0.4 ? 'bg-yellow-500' :
                        'bg-orange-500'
                      )}
                      style={{ width: `${prediction.probability * 100}%` }}
                    />
                  </div>
                  <span className="text-sky-200/60 text-xs w-8">
                    {Math.round(prediction.probability * 100)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* AI Model Info */}
      <div className="mt-6 pt-4 border-t border-sky-300/20">
        <div className="text-center text-sky-200/50 text-xs space-y-1">
          <div>AI Model: WeatherNet v2.1.4 | Trained on 2.3M data points</div>
          <div>User: Aashik9567 | Last updated: {lastUpdated} UTC</div>
          <div>Processing: Real-time atmospheric pattern analysis</div>
        </div>
      </div>
    </GlassCard>
  );
}