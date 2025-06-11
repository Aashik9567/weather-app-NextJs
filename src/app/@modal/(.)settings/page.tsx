'use client';

import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { X, Settings, Thermometer, Bell, Palette, User, Globe, Clock, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SettingsModal() {
  const router = useRouter();
  const [tempUnit, setTempUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [currentTime, setCurrentTime] = useState<string>('2025-06-11 09:40:08');
  const [notifications, setNotifications] = useState({
    alerts: true,
    forecasts: true,
    severe: false,
  });

  // Update time based on your provided timestamp
  useEffect(() => {
    const updateTime = () => {
      const baseTime = new Date('2025-06-11T09:40:08.000Z');
      const startTime = new Date('2025-06-11T09:40:08.000Z').getTime();
      const elapsed = Date.now() - startTime;
      const currentActualTime = new Date(baseTime.getTime() + elapsed);
      setCurrentTime(currentActualTime.toISOString().replace('T', ' ').slice(0, 19));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSave = () => {
    console.log('💾 Saving settings:', { tempUnit, notifications, timestamp: currentTime });
    router.back();
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <GlassCard className="w-full max-w-2xl max-h-[90vh] overflow-auto" variant="strong">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-500/20 rounded-xl border border-sky-300/30">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-white text-xl font-semibold">Settings</h2>
                <p className="text-sky-100/70 text-sm">
                  Customize your weather experience
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="p-2 hover:bg-sky-400/20 text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* User Profile */}
            <div className="p-4 bg-sky-500/10 rounded-xl border border-sky-300/20">
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <User className="h-4 w-4" />
                User Profile
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">Aashik9567</div>
                  <div className="text-sky-100/70 text-sm">Premium User • Active since 2025</div>
                  <div className="text-sky-200/60 text-xs flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3" />
                    <span>Current session: {currentTime}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <div className="text-emerald-400 text-xs mt-1">Online</div>
                </div>
              </div>
            </div>

            {/* Current Session Info */}
            <div className="p-4 bg-sky-600/10 rounded-xl border border-sky-400/20">
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Session Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-sky-200/60">Current User</div>
                  <div className="text-white font-medium">Aashik9567</div>
                </div>
                <div>
                  <div className="text-sky-200/60">UTC Time</div>
                  <div className="text-white font-medium font-mono">{currentTime}</div>
                </div>
                <div>
                  <div className="text-sky-200/60">Session Type</div>
                  <div className="text-emerald-400 font-medium">Premium</div>
                </div>
                <div>
                  <div className="text-sky-200/60">API Status</div>
                  <div className="text-emerald-400 font-medium">Active</div>
                </div>
              </div>
            </div>

            {/* Temperature Unit */}
            <div>
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <Thermometer className="h-4 w-4" />
                Temperature Unit
              </h3>
              <div className="flex gap-2">
                <Button 
                  variant={tempUnit === 'celsius' ? 'glass' : 'outline'} 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setTempUnit('celsius')}
                >
                  Celsius (°C)
                </Button>
                <Button 
                  variant={tempUnit === 'fahrenheit' ? 'glass' : 'outline'} 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setTempUnit('fahrenheit')}
                >
                  Fahrenheit (°F)
                </Button>
              </div>
              <p className="text-sky-200/50 text-xs mt-2">
                Currently using: {tempUnit === 'celsius' ? 'Celsius' : 'Fahrenheit'}
              </p>
            </div>

            {/* Notifications */}
            <div>
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 bg-sky-500/10 rounded-lg hover:bg-sky-500/15 transition-colors cursor-pointer border border-sky-300/10">
                  <div>
                    <div className="text-white text-sm font-medium">Weather Alerts</div>
                    <div className="text-sky-100/60 text-xs">Get notified about weather changes</div>
                  </div>
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-sky-500 bg-sky-500/10 border-sky-300/30 rounded focus:ring-sky-500 focus:ring-2" 
                    checked={notifications.alerts}
                    onChange={(e) => setNotifications(prev => ({ ...prev, alerts: e.target.checked }))}
                  />
                </label>
                
                <label className="flex items-center justify-between p-3 bg-sky-500/10 rounded-lg hover:bg-sky-500/15 transition-colors cursor-pointer border border-sky-300/10">
                  <div>
                    <div className="text-white text-sm font-medium">Daily Forecasts</div>
                    <div className="text-sky-100/60 text-xs">Morning weather summary</div>
                  </div>
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-sky-500 bg-sky-500/10 border-sky-300/30 rounded focus:ring-sky-500 focus:ring-2" 
                    checked={notifications.forecasts}
                    onChange={(e) => setNotifications(prev => ({ ...prev, forecasts: e.target.checked }))}
                  />
                </label>
                
                <label className="flex items-center justify-between p-3 bg-sky-500/10 rounded-lg hover:bg-sky-500/15 transition-colors cursor-pointer border border-sky-300/10">
                  <div>
                    <div className="text-white text-sm font-medium">Severe Weather Warnings</div>
                    <div className="text-sky-100/60 text-xs">Critical weather alerts only</div>
                  </div>
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-sky-500 bg-sky-500/10 border-sky-300/30 rounded focus:ring-sky-500 focus:ring-2" 
                    checked={notifications.severe}
                    onChange={(e) => setNotifications(prev => ({ ...prev, severe: e.target.checked }))}
                  />
                </label>
              </div>
            </div>

            {/* Theme */}
            <div>
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Appearance Theme
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Auto
                </Button>
                <Button variant="glass" size="sm" className="flex-1">
                  Sky Blue
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Light
                </Button>
              </div>
              <p className="text-sky-200/50 text-xs mt-2">
                Current theme: Sky Blue Gradient
              </p>
            </div>

            {/* API Usage */}
            <div className="p-4 bg-gradient-to-r from-sky-500/10 to-emerald-500/10 border border-sky-400/20 rounded-xl">
              <h3 className="text-sky-300 font-medium mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                API Usage Today
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-sky-100/70">Weather requests</span>
                  <span className="text-white font-medium">52 / 1000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sky-100/70">Location searches</span>
                  <span className="text-white font-medium">18 / 500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sky-100/70">User</span>
                  <span className="text-emerald-400 font-medium">Aashik9567</span>
                </div>
                <div className="w-full bg-sky-500/20 rounded-full h-2 mt-2">
                  <div className="bg-gradient-to-r from-sky-500 to-emerald-500 h-2 rounded-full" style={{ width: '5.2%' }}></div>
                </div>
                <div className="text-xs text-sky-200/60 text-center mt-1">
                  Updated: {currentTime}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-sky-300/20">
              <Button variant="glass" className="flex-1" onClick={handleSave}>
                <Zap className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button 
                variant="outline" 
                onClick={handleClose}
                className="border-sky-300/30 hover:bg-sky-500/10"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}