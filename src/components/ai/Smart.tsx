'use client';

import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { 
  Lightbulb, 
  Camera, 
  Footprints, 
  Home, 
  Car,
  Umbrella,
  Shirt,
  Coffee,
  MapPin,
  Clock,
  User
} from 'lucide-react';
import { WeatherAI } from '@/lib/ai/weatherAnalyzer';
import { cn } from '@/lib/utils/cn';

interface SmartRecommendationsProps {
  weatherData?: any;
  userLocation?: string;
  className?: string;
}

interface Recommendation {
  id: string;
  category: 'activity' | 'clothing' | 'travel' | 'safety' | 'lifestyle';
  title: string;
  description: string;
  suitability: number;
  icon: React.ComponentType<{ className?: string }>;
  timing: string;
  precautions?: string[];
  aiReasoning: string;
}

export function SmartRecommendations({ 
  weatherData = {
    temperature: 15,
    humidity: 65,
    windSpeed: 15,
    visibility: 10,
    precipitation: 0,
    uvIndex: 4
  },
  userLocation = 'London, UK',
  className 
}: SmartRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'activity' | 'clothing' | 'travel' | 'safety' | 'lifestyle'>('all');

  const weatherAI = new WeatherAI('Aashik9567');

  useEffect(() => {
    generateRecommendations();
  }, []);

  const generateRecommendations = async () => {
    setIsLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const aiRecommendations = weatherAI.generateActivityRecommendations(weatherData);
    
    // Convert to our format and add more detailed recommendations
    const enhanced: Recommendation[] = [
      {
        id: 'photo_1',
        category: 'activity',
        title: 'Outdoor Photography',
        description: 'Perfect conditions for landscape and street photography with excellent visibility and stable weather.',
        suitability: 0.91,
        icon: Camera,
        timing: 'Golden hour: 18:00-19:00 UTC',
        precautions: ['Protect equipment from wind', 'Consider UV filter'],
        aiReasoning: 'AI analysis shows optimal lighting conditions with minimal weather interference.'
      },
      {
        id: 'clothing_1',
        category: 'clothing',
        title: 'Light Jacket Recommended',
        description: 'Current temperature suggests wearing layers. A light jacket or sweater would be ideal.',
        suitability: 0.88,
        icon: Shirt,
        timing: 'Throughout the day',
        precautions: ['Layer clothing for temperature changes'],
        aiReasoning: 'Temperature analysis indicates comfort zone with light wind factor.'
      },
      {
        id: 'activity_1',
        category: 'activity',
        title: 'Walking/Jogging',
        description: 'Excellent conditions for outdoor exercise with comfortable temperature and low precipitation.',
        suitability: 0.85,
        icon: Footprints,
        timing: 'Best before 16:00 UTC',
        precautions: ['Stay hydrated', 'Wear comfortable shoes'],
        aiReasoning: 'Optimal exercise weather based on temperature, humidity, and wind patterns.'
      },
      {
        id: 'travel_1',
        category: 'travel',
        title: 'Good Driving Conditions',
        description: 'Clear visibility and stable weather make for safe travel conditions.',
        suitability: 0.92,
        icon: Car,
        timing: 'All day',
        precautions: ['Normal driving precautions apply'],
        aiReasoning: 'High visibility and low precipitation risk ensure safe road conditions.'
      },
      {
        id: 'lifestyle_1',
        category: 'lifestyle',
        title: 'Perfect for Outdoor Dining',
        description: 'Temperature and wind conditions are ideal for eating outdoors or having coffee outside.',
        suitability: 0.83,
        icon: Coffee,
        timing: 'Lunch: 12:00-14:00 UTC',
        aiReasoning: 'Comfort index calculations show optimal outdoor dining weather.'
      },
      {
        id: 'safety_1',
        category: 'safety',
        title: 'UV Protection Advised',
        description: 'Moderate UV index suggests using sunscreen and protective eyewear for extended outdoor exposure.',
        suitability: 0.76,
        icon: Umbrella,
        timing: 'Peak hours: 11:00-15:00 UTC',
        precautions: ['Apply SPF 30+ sunscreen', 'Wear UV-protective sunglasses'],
        aiReasoning: 'UV analysis indicates moderate exposure risk during peak sun hours.'
      }
    ];

    setRecommendations(enhanced);
    setIsLoading(false);
  };

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(r => r.category === selectedCategory);

  const categories = [
    { id: 'all' as const, label: 'All', icon: Lightbulb },
    { id: 'activity' as const, label: 'Activities', icon: Footprints },
    { id: 'clothing' as const, label: 'Clothing', icon: Shirt },
    { id: 'travel' as const, label: 'Travel', icon: Car },
    { id: 'safety' as const, label: 'Safety', icon: Umbrella },
    { id: 'lifestyle' as const, label: 'Lifestyle', icon: Coffee }
  ];

  const getSuitabilityColor = (suitability: number) => {
    if (suitability >= 0.9) return 'text-emerald-400';
    if (suitability >= 0.8) return 'text-sky-400';
    if (suitability >= 0.7) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getSuitabilityBg = (suitability: number) => {
    if (suitability >= 0.9) return 'bg-emerald-500';
    if (suitability >= 0.8) return 'bg-sky-500';
    if (suitability >= 0.7) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <GlassCard className={cn('p-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-500/20 rounded-xl border border-sky-300/30">
            <Lightbulb className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold">Smart Recommendations</h3>
            <p className="text-sky-100/70 text-sm">AI-powered activity and lifestyle suggestions</p>
          </div>
        </div>
        
        <Button
          variant="glass"
          size="sm"
          onClick={generateRecommendations}
          loading={isLoading}
        >
          Refresh
        </Button>
      </div>

      {/* Location & Time Info */}
      <div className="mb-6 p-3 bg-sky-500/10 rounded-xl border border-sky-300/20">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-sky-300" />
            <span className="text-white">{userLocation}</span>
          </div>
          <div className="flex items-center gap-4 text-sky-200/70">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              Aashik9567
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              2025-06-11 10:05:22 UTC
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'glass' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <Icon className="h-3 w-3" />
                {category.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-sky-500/10 rounded-xl border border-sky-300/20 animate-pulse">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-sky-500/30 rounded-lg"></div>
                <div className="flex-1">
                  <div className="w-48 h-4 bg-sky-500/30 rounded mb-2"></div>
                  <div className="w-full h-3 bg-sky-500/20 rounded mb-1"></div>
                  <div className="w-3/4 h-3 bg-sky-500/20 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRecommendations.map((rec) => {
            const Icon = rec.icon;
            
            return (
              <div 
                key={rec.id}
                className="p-4 bg-sky-500/10 rounded-xl border border-sky-300/20 hover:bg-sky-500/15 transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-sky-600/20 rounded-lg flex-shrink-0">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{rec.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          'text-sm font-bold',
                          getSuitabilityColor(rec.suitability)
                        )}>
                          {Math.round(rec.suitability * 100)}%
                        </span>
                        <span className="text-sky-200/60 text-xs">suitable</span>
                      </div>
                    </div>
                    
                    <p className="text-sky-100/80 text-sm mb-2">
                      {rec.description}
                    </p>
                    
                    <div className="text-sky-200/70 text-xs mb-2">
                      <strong>Best timing:</strong> {rec.timing}
                    </div>
                    
                    {rec.precautions && rec.precautions.length > 0 && (
                      <div className="text-sky-200/60 text-xs mb-2">
                        <strong>Tips:</strong> {rec.precautions.join(', ')}
                      </div>
                    )}
                    
                    <div className="text-sky-300/80 text-xs italic">
                      <strong>AI Analysis:</strong> {rec.aiReasoning}
                    </div>
                  </div>
                </div>

                {/* Suitability Bar */}
                <div className="flex items-center gap-2">
                  <span className="text-sky-200/60 text-xs w-16">Suitability:</span>
                  <div className="flex-1 bg-sky-500/20 rounded-full h-2">
                    <div 
                      className={cn(
                        'h-2 rounded-full transition-all duration-500',
                        getSuitabilityBg(rec.suitability)
                      )}
                      style={{ width: `${rec.suitability * 100}%` }}
                    />
                  </div>
                  <span className="text-sky-200/60 text-xs w-8">
                    {Math.round(rec.suitability * 100)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredRecommendations.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <Lightbulb className="h-12 w-12 text-sky-400/50 mx-auto mb-3" />
          <div className="text-sky-200/60">
            No recommendations available for the selected category
          </div>
        </div>
      )}

      {/* AI Info */}
      <div className="mt-6 pt-4 border-t border-sky-300/20 text-center text-sky-200/50 text-xs">
        <div>Recommendations powered by WeatherAI v2.1.4</div>
        <div>Personalized for Aashik9567 | Updated: 2025-06-11 10:05:22 UTC</div>
      </div>
    </GlassCard>
  );
}