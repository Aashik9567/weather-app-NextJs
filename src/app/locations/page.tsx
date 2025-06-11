import { GlassCard } from '@/components/ui/GlassCard';
import { MapPin, Star, Plus, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Remove viewport from metadata and use the root layout viewport
export default function LocationsPage() {
  const currentTime = '2025-06-11 09:33:31';
  const currentUser = 'Aashik9567';

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <MapPin className="h-8 w-8" />
                My Locations
              </h1>
              <p className="text-sky-100/80">
                Manage your saved places and favorites
              </p>
              <div className="mt-2 text-sky-200/60 text-sm flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>User: {currentUser}</span>
                <Clock className="h-4 w-4 ml-2" />
                <span>UTC: {currentTime}</span>
              </div>
            </div>
            <Button variant="glass">
              <Plus className="h-4 w-4" />
              Add Location
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'London', country: 'United Kingdom', temp: '15°C', condition: 'Partly Cloudy', coords: '51.5074, -0.1278' },
            { name: 'New York', country: 'United States', temp: '22°C', condition: 'Sunny', coords: '40.7128, -74.0060' },
            { name: 'Tokyo', country: 'Japan', temp: '18°C', condition: 'Rainy', coords: '35.6762, 139.6503' },
          ].map((location, index) => (
            <GlassCard key={index} className="p-6 hover:bg-sky-500/15 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white font-semibold text-lg">{location.name}</h3>
                  <p className="text-sky-100/70 text-sm">{location.country}</p>
                  <p className="text-sky-200/50 text-xs font-mono mt-1">{location.coords}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="text-white text-2xl font-bold">{location.temp}</div>
                <div className="text-sky-100/90">{location.condition}</div>
                <div className="text-sky-200/60 text-xs">
                  Last updated: {currentTime}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlassCard className="p-4 text-center">
            <div className="text-white text-2xl font-bold">3</div>
            <div className="text-sky-100/70 text-sm">Saved Locations</div>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <div className="text-white text-2xl font-bold">47</div>
            <div className="text-sky-100/70 text-sm">API Requests Today</div>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <div className="text-white text-2xl font-bold">24/7</div>
            <div className="text-sky-100/70 text-sm">Real-time Updates</div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}