import { GlassCard } from '@/components/ui/GlassCard';
import { Calendar, TrendingUp, Cloud } from 'lucide-react';

export default function ForecastPage() {
  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Calendar className="h-8 w-8" />
            Weather Forecast
          </h1>
          <p className="text-white/60">
            Detailed weather predictions and trends
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GlassCard className="p-6">
              <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                10-Day Forecast
              </h2>
              <div className="text-white/60">
                Extended forecast view will be implemented here...
              </div>
            </GlassCard>
          </div>

          <div>
            <GlassCard className="p-6">
              <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                Hourly Details
              </h2>
              <div className="text-white/60">
                Hourly forecast details...
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}