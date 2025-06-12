'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { 
  Home, 
  ArrowLeft, 
  Search, 
  Cloud, 
  Compass,
  MapPin,
  RefreshCw,
  AlertCircle,
  Brain,
  Calendar,
  Clock,
  User,
  Zap,
  Globe,
  ChevronRight
} from 'lucide-react';

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const [currentTime, setCurrentTime] = useState<string>('2025-06-12 07:54:15');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const currentUser = 'Aashik9567';

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update time every second after mount
  useEffect(() => {
    if (!mounted) return;

    const updateTime = () => {
      const baseTime = new Date('2025-06-12T07:54:15.000Z');
      const startTime = new Date('2025-06-12T07:54:15.000Z').getTime();
      const elapsed = Date.now() - startTime;
      const currentActualTime = new Date(baseTime.getTime() + elapsed);
      setCurrentTime(currentActualTime.toISOString().replace('T', ' ').slice(0, 19));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [mounted]);

  // Countdown timer
  useEffect(() => {
    if (!mounted) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsRedirecting(true);
      router.push('/');
    }
  }, [countdown, router, mounted]);

  const quickLinks = [
    { name: 'Dashboard', href: '/', icon: Home, description: 'Weather overview & current conditions' },
    { name: 'Forecast', href: '/forecast', icon: Calendar, description: 'Detailed weather predictions' },
    { name: 'Locations', href: '/locations', icon: MapPin, description: 'Saved places & favorites' },
    { name: 'AI Insights', href: '/ai-insights', icon: Brain, description: 'OpenAI powered analysis' },
    { name: 'Analytics', href: '/analytics', icon: Zap, description: 'Weather charts & visualizations' },
  ];

  const handleGoHome = () => {
    setIsRedirecting(true);
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleSearch = () => {
    router.push('/search');
  };

  // Don't render countdown until mounted
  const displayCountdown = mounted ? countdown : 10;
  const displayTime = mounted ? currentTime : '2025-06-12 07:54:15';

  if (isRedirecting) {
    return (
      <div className="min-h-screen sky-gradient-bg flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin mx-auto"></div>
            <Home className="h-8 w-8 text-sky-400 absolute inset-0 m-auto" />
          </div>
          <div className="text-white text-xl font-semibold mb-2">Redirecting to Dashboard...</div>
          <div className="text-sky-200/70">Taking you home</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen sky-gradient-bg">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-sky-400/10 via-sky-500/10 to-sky-600/10" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.05),transparent_50%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.08),transparent_50%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(2,132,199,0.08),transparent_50%)]" />
      
      {/* Animated Sky Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-sky-300/20 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-sky-400/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-sky-200/20 rounded-full animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/6 right-1/3 w-1 h-1 bg-sky-500/25 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-sky-300/15 rounded-full animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Header Info */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 text-sky-200/60 text-sm mb-4">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                User: {currentUser}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                UTC: {displayTime}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                WeatherApp v1.0.0
              </span>
            </div>
          </div>

          {/* Main 404 Content */}
          <GlassCard className="p-8 lg:p-12 mb-8" variant="strong">
            {/* 404 Animation */}
            <div className="mb-8">
              <div className="relative">
                {/* Large 404 */}
                <div className="text-8xl lg:text-9xl font-bold text-white/10 select-none">
                  404
                </div>
                
                {/* Floating Weather Icons */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <Cloud className="h-16 w-16 lg:h-20 lg:w-20 text-sky-400 animate-float" style={{ animationDelay: '0s' }} />
                    <div className="absolute -top-2 -right-2">
                      <AlertCircle className="h-6 w-6 text-orange-400 animate-pulse" />
                    </div>
                  </div>
                </div>
                
                {/* Surrounding Icons */}
                <div className="absolute top-4 left-4">
                  <Compass className="h-8 w-8 text-sky-300/60 animate-float" style={{ animationDelay: '1s' }} />
                </div>
                <div className="absolute top-4 right-4">
                  <MapPin className="h-8 w-8 text-sky-300/60 animate-float" style={{ animationDelay: '2s' }} />
                </div>
                <div className="absolute bottom-4 left-8">
                  <Search className="h-6 w-6 text-sky-300/60 animate-float" style={{ animationDelay: '1.5s' }} />
                </div>
                <div className="absolute bottom-4 right-8">
                  <Brain className="h-6 w-6 text-sky-300/60 animate-float" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Page Not Found in the Weather System
              </h1>
              <p className="text-sky-100/80 text-lg mb-4">
                The page you're looking for seems to have drifted away like a cloud in the sky.
              </p>
              <p className="text-sky-200/70 text-sm">
                Don't worry, {currentUser}! Our weather data is still accurate and ready for you.
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="mb-8 p-4 bg-sky-500/10 rounded-xl border border-sky-300/20">
              <div className="flex items-center justify-center gap-3 text-sky-100/90">
                <RefreshCw className="h-5 w-5 animate-spin" />
                <span>Automatically redirecting to Dashboard in</span>
                <span className="text-2xl font-bold text-white bg-sky-500/20 px-3 py-1 rounded-lg">
                  {displayCountdown}
                </span>
                <span>seconds</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                variant="glass" 
                size="lg" 
                onClick={handleGoHome}
                className="flex items-center gap-2"
              >
                <Home className="h-5 w-5" />
                Go to Dashboard
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleGoBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                Go Back
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleSearch}
                className="flex items-center gap-2"
              >
                <Search className="h-5 w-5" />
                Search Locations
              </Button>
            </div>

            {/* Weather Status */}
            <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm">
                <Zap className="h-4 w-4" />
                <span>Weather services are running normally • All APIs operational</span>
              </div>
            </div>
          </GlassCard>

          {/* Quick Navigation */}
          <GlassCard className="p-6">
            <h2 className="text-white text-xl font-semibold mb-6 flex items-center justify-center gap-2">
              <Compass className="h-5 w-5" />
              Quick Navigation for {currentUser}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link 
                    key={link.href}
                    href={link.href}
                    className="group p-4 bg-sky-500/10 rounded-xl border border-sky-300/20 hover:bg-sky-500/15 transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-sky-600/20 rounded-lg group-hover:bg-sky-600/30 transition-colors">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-medium">{link.name}</h3>
                          <ChevronRight className="h-4 w-4 text-sky-300 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <p className="text-sky-200/70 text-sm">{link.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Help Section */}
            <div className="mt-6 pt-6 border-t border-sky-300/20">
              <div className="text-center">
                <h3 className="text-white font-medium mb-3">Need Help?</h3>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link 
                    href="/settings"
                    className="text-sky-300 hover:text-white text-sm transition-colors flex items-center justify-center gap-1"
                  >
                    Check Settings
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                  <span className="text-sky-300/50 hidden sm:inline">•</span>
                  <Link 
                    href="/ai-insights"
                    className="text-sky-300 hover:text-white text-sm transition-colors flex items-center justify-center gap-1"
                  >
                    AI Assistance
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                  <span className="text-sky-300/50 hidden sm:inline">•</span>
                  <Link 
                    href="/analytics"
                    className="text-sky-300 hover:text-white text-sm transition-colors flex items-center justify-center gap-1"
                  >
                    View Analytics
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Footer */}
          <div className="mt-8 text-center text-sky-200/50 text-sm">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span>WeatherApp v1.0.0</span>
              <span>•</span>
              <span>Developed by {currentUser}</span>
              <span>•</span>
              <span>{displayTime} UTC</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                OpenAI Powered
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}