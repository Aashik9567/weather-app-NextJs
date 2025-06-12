'use client';

import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { 
  Brain, 
  Zap, 
  User, 
  Clock, 
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  RefreshCw,
  Cpu,
  Globe
} from 'lucide-react';
import { useOpenAI } from '@/hooks/useOpenAi';
import { cn } from '@/lib/utils/cn';

interface OpenAIInsightCardProps {
  weatherData: any;
  userLocation?: string;
  className?: string;
}

export function OpenAIInsightCard({ 
  weatherData, 
  userLocation = 'London, UK',
  className 
}: OpenAIInsightCardProps) {
  const { insight, loading, error, generateInsight, tokensUsedToday } = useOpenAI();
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentTimestamp, setCurrentTimestamp] = useState('2025-06-12 08:22:43');

  const currentUser = 'Aashik9567';

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update timestamp with your current time: 2025-06-12 08:22:43
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

  useEffect(() => {
    if (mounted) {
      // Generate initial insight after mount
      generateInsight(weatherData, userLocation);
    }
  }, [mounted]);

  useEffect(() => {
    if (!autoRefresh || !mounted) return;

    const interval = setInterval(() => {
      generateInsight(weatherData, userLocation);
    }, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, [autoRefresh, weatherData, userLocation, generateInsight, mounted]);

  const handleRefresh = () => {
    generateInsight(weatherData, userLocation);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-emerald-400';
    if (confidence >= 0.8) return 'text-sky-400';
    if (confidence >= 0.7) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 0.9) return 'bg-emerald-500';
    if (confidence >= 0.8) return 'bg-sky-500';
    if (confidence >= 0.7) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const displayTimestamp = mounted ? currentTimestamp : '2025-06-12 08:22:43';

  return (
    <GlassCard className={cn('p-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-sky-500 rounded-xl shadow-lg">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold flex items-center gap-2">
              OpenAI Weather Analysis
              <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full">
                LIVE
              </span>
            </h3>
            <p className="text-sky-100/70 text-sm">Powered by GPT-3.5 Turbo</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={cn(
              'text-xs',
              autoRefresh ? 'text-emerald-400' : 'text-sky-300'
            )}
          >
            {autoRefresh ? 'Auto-Refresh ON' : 'Auto-Refresh OFF'}
          </Button>
          
          <Button
            variant="glass"
            size="sm"
            onClick={handleRefresh}
            loading={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            {loading ? 'Analyzing...' : 'Refresh'}
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin mx-auto mb-4"></div>
              <Brain className="h-6 w-6 text-sky-400 absolute inset-0 m-auto" />
            </div>
            <div className="text-white font-medium mb-1">OpenAI is analyzing weather data...</div>
            <div className="text-sky-200/70 text-sm">Using GPT-3.5 Turbo for intelligent insights</div>
            <div className="text-sky-300/60 text-xs mt-2">
              User: {currentUser} | {displayTimestamp} UTC
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <div className="flex items-center gap-2 text-red-400 mb-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-medium">OpenAI Analysis Error</span>
          </div>
          <div className="text-red-300 text-sm mb-3">{error}</div>
          <div className="text-red-200/60 text-xs mb-3">
            User: {currentUser} | Failed at: {displayTimestamp} UTC
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            Try Again
          </Button>
        </div>
      )}

      {/* AI Insight Content */}
      {insight && !loading && (
        <div className="space-y-6">
          {/* Main Analysis */}
          <div>
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Weather Analysis for {currentUser}
            </h4>
            <div className="p-4 bg-sky-500/10 rounded-xl border border-sky-300/20">
              <p className="text-sky-100/90 leading-relaxed">{insight.analysis}</p>
            </div>
          </div>

          {/* Prediction */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium flex items-center gap-2">
                <Brain className="h-4 w-4" />
                6-Hour Prediction
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-sky-200/70 text-xs">Confidence:</span>
                <span className={cn('font-bold text-sm', getConfidenceColor(insight.confidence))}>
                  {Math.round(insight.confidence * 100)}%
                </span>
              </div>
            </div>
            <div className="p-4 bg-sky-500/10 rounded-xl border border-sky-300/20 mb-3">
              <p className="text-sky-100/90 leading-relaxed">{insight.prediction}</p>
            </div>
            {/* Confidence Bar */}
            <div className="flex items-center gap-2">
              <span className="text-sky-200/60 text-xs w-16">Accuracy:</span>
              <div className="flex-1 bg-sky-500/20 rounded-full h-2">
                <div 
                  className={cn('h-2 rounded-full transition-all duration-500', getConfidenceBg(insight.confidence))}
                  style={{ width: `${insight.confidence * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div>
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              AI Recommendation for {currentUser}
            </h4>
            <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <p className="text-emerald-100/90 leading-relaxed">{insight.recommendation}</p>
            </div>
          </div>

          {/* Alert (if any) */}
          {insight.alert && (
            <div>
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                Weather Alert
              </h4>
              <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                <p className="text-orange-100/90 leading-relaxed">{insight.alert}</p>
              </div>
            </div>
          )}

          {/* AI Reasoning */}
          <div>
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              AI Reasoning
            </h4>
            <div className="p-4 bg-sky-500/10 rounded-xl border border-sky-300/20">
              <p className="text-sky-200/80 text-sm leading-relaxed italic">
                "{insight.reasoning}"
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="pt-4 border-t border-sky-300/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3 text-sky-400" />
                <span className="text-sky-200/70">User:</span>
                <span className="text-white font-medium">{currentUser}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-sky-400" />
                <span className="text-sky-200/70">Generated:</span>
                <span className="text-white font-medium font-mono">{insight.timestamp}</span>
              </div>
              <div className="flex items-center gap-1">
                <Brain className="h-3 w-3 text-emerald-400" />
                <span className="text-sky-200/70">Model:</span>
                <span className="text-emerald-400 font-medium">{insight.model}</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-yellow-400" />
                <span className="text-sky-200/70">Tokens:</span>
                <span className="text-yellow-400 font-medium">{insight.tokensUsed}</span>
              </div>
            </div>
            
            <div className="mt-3 text-center text-sky-200/50 text-xs">
              <div className="flex items-center justify-center gap-4">
                <span className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  Location: {userLocation}
                </span>
                <span>Daily Tokens Used: {tokensUsedToday}</span>
                <span>Current Time: {displayTimestamp} UTC</span>
                <span>OpenAI Free Tier</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  );
}