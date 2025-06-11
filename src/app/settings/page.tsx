import { GlassCard } from '@/components/ui/GlassCard';
import { Settings as SettingsIcon, User, Bell, Palette, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <SettingsIcon className="h-8 w-8" />
            Settings
          </h1>
          <p className="text-white/60">
            Manage your preferences and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </h2>
            <div className="text-white/60">
              Manage your user profile and preferences...
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </h2>
            <div className="text-white/60">
              Configure weather alerts and notifications...
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance
            </h2>
            <div className="text-white/60">
              Customize theme and display options...
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </h2>
            <div className="text-white/60">
              Data privacy and security settings...
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}