'use client';

import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { OpenAIInsightCard } from '@/components/ai/OpenAiInsightCard'; // Correct casing
import { AIPredictionsPanel } from '@/components/ai/AiPredictionsPanel';
import { SmartRecommendations } from '@/components/ai/Smart';
import { 
  Brain, 
  Zap, 
  Users, 
  Clock,
  RefreshCw,
  Settings,
  BarChart3,
  Globe,
  Cpu
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { i } from 'framer-motion/client';

export default function AIInsightsPage() {
  const [mounted, setMounted] = useState(false);
  const [currentTimestamp, setCurrentTimestamp] = useState('2025-06-12 08:22:43');
  
  const currentUser = 'Aashik9567';
  
  const currentWeather = {
    temperature: 15,
    humidity: 65,
    pressure: 1013,
    windSpeed: 15,
    visibility: 10,
    precipitation: 0,
    uvIndex: 4
  };

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update timestamp
  useEffect(() => {
    if (!mounted) return;

    const updateTimestamp = () => {
      const baseTime = new Date('2025-06-12T08:22:43.000Z');
      const startTime = new Date('2025-06-12T08:22:43.000Z').getTime();
      const elapsed = Date.now() - startTime;
      const currentActualTime = new Date(baseTime.getTime() + elapsed);
      setCurrentTimestamp(currentActualTime.toISOString().replace('T', ' ').slice(0, 19));
    };

    updateTimestamp();
    const timer = setInterval(updateTimestamp, 1000);
    return () => clearInterval(timer);
  }, [mounted]);

  const displayTimestamp = mounted ? currentTimestamp : '2025-06-12 08:22:43';

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <Brain className="h-8 w-8" />
                AI Weather Insights
                <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-sky-500 text-white text-sm font-bold rounded-full">
                  OpenAI Powered
                </span>
              </h1>
              <p className="text-sky-100/80">
                Real OpenAI GPT-3.5 Turbo analysis and predictions
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
                  <Cpu className="h-4 w-4" />
                  OpenAI GPT-3.5 Turbo
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  Free Tier
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* OpenAI Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <GlassCard className="p-4 text-center">
            <div className="text-white text-2xl font-bold">GPT-3.5</div>
            <div className="text-sky-100/70 text-sm">Turbo Model</div>
            <div className="text-emerald-400 text-xs mt-1">Latest Version</div>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <div className="text-white text-2xl font-bold">Free</div>
            <div className="text-sky-100/70 text-sm">Tier Usage</div>
            <div className="text-emerald-400 text-xs mt-1">No Cost</div>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <div className="text-white text-2xl font-bold">~500</div>
            <div className="text-sky-100/70 text-sm">Tokens per Analysis</div>
            <div className="text-sky-300 text-xs mt-1">Optimized Usage</div>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <div className="text-white text-2xl font-bold">0.8s</div>
            <div className="text-sky-100/70 text-sm">Response Time</div>
            <div className="text-emerald-400 text-xs mt-1 flex items-center justify-center gap-1">
              <Zap className="h-3 w-3" />
              Real-time AI
            </div>
          </GlassCard>
        </div>

        {/* Main OpenAI Insight */}
        <div className="mb-8">
          <OpenAIInsightCard 
            weatherData={currentWeather}
            userLocation="London, United Kingdom"
          />
        </div>

        {/* Additional AI Components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AIPredictionsPanel currentWeather={currentWeather} />
          <SmartRecommendations 
            weatherData={currentWeather}
            userLocation="London, United Kingdom"
          />
        </div>
      </div>
    </div>
  );
}