import { GlassCard } from '@/components/ui/GlassCard';
import { Calendar, Clock, TrendingUp } from 'lucide-react';

export default function SidebarContent() {
  return (
    <div className="w-80 p-4 space-y-4">
      {/* Quick Stats */}
      <GlassCard className="p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Quick Stats
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Locations Saved</span>
            <span className="text-white font-medium">3</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Weather Alerts</span>
            <span className="text-yellow-400 font-medium">1 Active</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Data Updates</span>
            <span className="text-green-400 font-medium">Real-time</span>
          </div>
        </div>
      </GlassCard>

      {/* Recent Activity */}
      <GlassCard className="p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Recent Activity
        </h3>
        <div className="space-y-2 text-sm">
          <div className="text-white/60">
            <span className="text-white">Searched</span> New York
            <div className="text-xs text-white/40">2 minutes ago</div>
          </div>
          <div className="text-white/60">
            <span className="text-white">Added</span> Paris to favorites
            <div className="text-xs text-white/40">1 hour ago</div>
          </div>
          <div className="text-white/60">
            <span className="text-white">Viewed</span> 7-day forecast
            <div className="text-xs text-white/40">3 hours ago</div>
          </div>
        </div>
      </GlassCard>

      {/* Upcoming Events */}
      <GlassCard className="p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Weather Alerts
        </h3>
        <div className="space-y-2 text-sm">
          <div className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="text-yellow-400 font-medium">Rain Expected</div>
            <div className="text-white/60 text-xs">Tomorrow, 2 PM - 5 PM</div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}