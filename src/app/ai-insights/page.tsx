import { GlassCard } from '@/components/ui/GlassCard';
import { Brain, TrendingUp, Lightbulb } from 'lucide-react';

export default function AIInsightsPage() {
  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Brain className="h-8 w-8" />
            AI Weather Insights
            <span className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
              NEW
            </span>
          </h1>
          <p className="text-white/60">
            Smart weather analysis and personalized recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Weather Trends
            </h2>
            <div className="text-white/60">
              AI-powered weather trend analysis coming soon...
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Smart Recommendations
            </h2>
            <div className="text-white/60">
              Personalized weather-based suggestions...
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}