'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { 
  Home,
  Calendar,
  MapPin,
  Settings,
  Brain,
  BarChart3,
  Search,
  Clock,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  User,
  Bell,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Grid3X3,
  Target,
  Camera
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  description?: string;
  category: 'main' | 'features' | 'account';
  isModal?: boolean;
}

const navigation: NavigationItem[] = [
  // Main Navigation
  { 
    name: 'Dashboard', 
    href: '/', 
    icon: Home, 
    description: 'Overview & current weather',
    category: 'main' 
  },
  { 
    name: 'Forecast', 
    href: '/forecast', 
    icon: Calendar, 
    description: 'Detailed weather predictions',
    category: 'main' 
  },
  { 
    name: 'Locations', 
    href: '/locations', 
    icon: MapPin, 
    badge: '3',
    description: 'Saved places & favorites',
    category: 'main' 
  },

  // Features
  { 
    name: 'AI Insights', 
    href: '/ai-insights', 
    icon: Brain, 
    badge: 'NEW',
    description: 'Smart weather analysis',
    category: 'features' 
  },
  { 
    name: 'Analytics', 
    href: '/analytics', 
    icon: BarChart3, 
    description: 'Weather trends & patterns',
    category: 'features' 
  },
  // Account
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: Settings, 
    description: 'App preferences',
    category: 'account',
    isModal: true
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null); // Start with null to prevent hydration mismatch
  const [weatherTheme, setWeatherTheme] = useState<'day' | 'night'>('day');
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false); // Track if we're on client

  // Set isClient to true after mount to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update time with your current timestamp: 2025-06-11 09:33:31
  useEffect(() => {
    if (!isClient) return; // Only run on client to prevent hydration mismatch

    const updateTime = () => {
      // Base time from your provided timestamp
      const baseTime = new Date('2025-06-11T09:33:31.000Z');
      const startTime = new Date('2025-06-11T09:33:31.000Z').getTime();
      const elapsed = Date.now() - startTime;
      const currentActualTime = new Date(baseTime.getTime() + elapsed);
      
      setCurrentTime(currentActualTime);
      
      const hour = currentActualTime.getUTCHours();
      setWeatherTheme(hour >= 6 && hour < 18 ? 'day' : 'night');
    };

    updateTime(); // Initial call
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [isClient]);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const formatTime = (date: Date) => {
    return {
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC'
      }),
      date: date.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric',
        timeZone: 'UTC'
      }),
      fullDate: date.toISOString().replace('T', ' ').slice(0, 19)
    };
  };

  // Only format time if we have currentTime and are on client
  const timeData = currentTime && isClient ? formatTime(currentTime) : {
    time: '09:33:31',
    date: 'Wed, Jun 11',
    fullDate: '2025-06-11 09:33:31'
  };

  const groupedNavigation = navigation.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, NavigationItem[]>);

  // Mobile Toggle Button
  const MobileToggle = () => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setIsMobileOpen(!isMobileOpen)}
      className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-sky-500/20 backdrop-blur-sm hover:bg-sky-500/30 border border-sky-300/20 sky-glow"
    >
      {isMobileOpen ? (
        <X className="h-6 w-6 text-white" />
      ) : (
        <Menu className="h-6 w-6 text-white" />
      )}
    </Button>
  );

  // Sidebar Content
  const SidebarContent = () => (
    <div className={cn(
      "h-full bg-gradient-to-b from-sky-500/20 via-sky-600/15 to-sky-700/20 backdrop-blur-xl border-r border-sky-300/20",
      "flex flex-col relative overflow-hidden"
    )}>
      {/* Sky pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.1),transparent_40%)] pointer-events-none" />
      
      <div className="relative z-10 h-full p-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {(!isCollapsed || isMobile) && (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-sky-400 to-sky-600 rounded-xl shadow-lg sky-glow">
                {weatherTheme === 'day' ? (
                  <Sun className="h-6 w-6 text-white" />
                ) : (
                  <Moon className="h-6 w-6 text-white" />
                )}
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">WeatherWebApp</h1>
                <p className="text-sky-100/80 text-xs">by Aashik Mahato</p>
              </div>
            </div>
          )}
          
          {/* Desktop Collapse Button */}
          {!isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-sky-400/20 text-white"
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>

        {/* Time Display */}
        {(!isCollapsed || isMobile) && (
          <div className="mb-6 p-3 bg-sky-500/10 rounded-xl border border-sky-300/20 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-sky-200/80" />
              <span className="text-sky-100/90 text-sm font-medium">Current Time (UTC)</span>
            </div>
            <div className="text-white text-lg font-bold font-mono">
              {isClient ? timeData.time : ''}
            </div>
            <div className="text-sky-100/70 text-xs">
              {isClient ? timeData.date : ''} • 2025
            </div>
            <div className="text-sky-200/50 text-xs mt-1 font-mono" title="Full UTC timestamp">
              {isClient ? timeData.fullDate : ''}
            </div>
          </div>
        )}

        {/* User Badge for Collapsed */}
        {isCollapsed && !isMobile && (
          <div className="mb-6 flex flex-col items-center space-y-4">
            <div className="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center border border-sky-300/20">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-sky-600/30 rounded-xl flex items-center justify-center border border-sky-300/30">
              <Grid3X3 className="h-6 w-6 text-white" />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {Object.entries(groupedNavigation).map(([category, items]) => (
            <div key={category}>
              {(!isCollapsed || isMobile) && (
                <h2 className="text-sky-200/50 text-xs font-semibold uppercase tracking-wider mb-3 px-1">
                  {category === 'main' ? 'Navigation' : 
                   category === 'features' ? 'Features' : 'Account'}
                </h2>
              )}
              
              <ul className="space-y-1">
                {items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          'group flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative',
                          'hover:bg-sky-400/20 hover:text-white hover:scale-[1.02] hover:shadow-lg',
                          isActive 
                            ? 'bg-sky-500/25 text-white border border-sky-300/30 shadow-lg sky-glow' 
                            : 'text-sky-100/80',
                          isCollapsed && !isMobile ? 'justify-center w-12 h-12 mx-auto' : ''
                        )}
                        title={isCollapsed && !isMobile ? `${item.name}${item.description ? ` - ${item.description}` : ''}` : undefined}
                      >
                        <div className={cn(
                          "flex items-center justify-center transition-colors flex-shrink-0",
                          isCollapsed && !isMobile ? 'w-6 h-6' : ''
                        )}>
                          <Icon className={cn(
                            'transition-colors flex-shrink-0',
                            isCollapsed && !isMobile ? 'h-6 w-6' : 'h-5 w-5',
                            isActive ? 'text-white' : 'text-sky-100/70 group-hover:text-white'
                          )} />
                        </div>
                        
                        {(!isCollapsed || isMobile) && (
                          <>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="truncate">{item.name}</span>
                                {item.badge && (
                                  <span className={cn(
                                    'px-2 py-0.5 text-xs font-bold rounded-full flex-shrink-0 shadow-sm',
                                    item.badge === 'NEW' 
                                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' 
                                      : 'bg-gradient-to-r from-sky-500 to-sky-600 text-white'
                                  )}>
                                    {item.badge}
                                  </span>
                                )}
                                {item.isModal && (
                                  <span className="text-xs text-sky-200/60">↗</span>
                                )}
                              </div>
                              {item.description && (
                                <div className="text-xs text-sky-200/50 mt-0.5 truncate">
                                  {item.description}
                                </div>
                              )}
                            </div>
                          </>
                        )}

                        {isActive && (
                          <div className={cn(
                            "bg-white rounded-full shadow-lg",
                            isCollapsed && !isMobile ? 'w-1 h-1 absolute -right-1 top-1/2 transform -translate-y-1/2' : 'w-2 h-2'
                          )} />
                        )}

                        {isCollapsed && !isMobile && item.badge && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-xs text-white font-bold">!</span>
                          </div>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="mt-6 pt-4 border-t border-sky-300/20">
          {(!isCollapsed || isMobile) ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-sky-500/10 rounded-xl border border-sky-300/20">
                <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">
                    Aashik Mahato
                  </div>
                  <div className="text-sky-100/70 text-xs truncate">
                    Premium User • Online
                  </div>
                </div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-sky flex-shrink-0 shadow-sm" title="Online" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button variant="ghost" size="sm" className="p-2 hover:bg-sky-400/20 text-sky-100/80 hover:text-white" title="Notifications">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2 hover:bg-sky-400/20 text-sky-100/80 hover:text-white" title="Help">
                  <HelpCircle className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2 hover:bg-sky-400/20 text-sky-100/80 hover:text-white" title="Logout">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center">
              <Button variant="ghost" size="sm" className="p-3 hover:bg-sky-400/20 w-12 h-12 rounded-xl border border-sky-300/20" title="Profile: Aashik9567">
                <User className="h-5 w-5 text-sky-100/80" />
              </Button>
              <Button variant="ghost" size="sm" className="p-3 hover:bg-sky-400/20 w-12 h-12 rounded-xl border border-sky-300/20" title="Notifications">
                <Target className="h-5 w-5 text-sky-100/80" />
              </Button>
              <Button variant="ghost" size="sm" className="p-3 hover:bg-sky-400/20 w-12 h-12 rounded-xl border border-sky-300/20" title="Settings">
                <Camera className="h-5 w-5 text-sky-100/80" />
              </Button>
              <Button variant="ghost" size="sm" className="p-3 hover:bg-sky-400/20 w-12 h-12 rounded-xl border border-sky-300/20 mt-4" title="Logout">
                <LogOut className="h-5 w-5 text-sky-100/80" />
              </Button>
            </div>
          )}
        </div>

      </div>
    </div>
  );

  return (
    <>
      <MobileToggle />

      <div className={cn(
        'hidden lg:flex h-full flex-col transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-20' : 'w-64',
        className
      )}>
        <SidebarContent />
      </div>

      {isMobile && (
        <>
          {isMobileOpen && (
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
          )}
          
          <div 
            className={cn(
              'fixed top-0 left-0 h-full w-80 max-w-[85vw] z-50 transform transition-transform duration-300 ease-in-out lg:hidden',
              isMobileOpen ? 'translate-x-0' : '-translate-x-full'
            )}
          >
            <SidebarContent />
          </div>
        </>
      )}
    </>
  );
}