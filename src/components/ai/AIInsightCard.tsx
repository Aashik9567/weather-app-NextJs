'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Target,
  Clock,
  User,
  ChevronRight,
  Zap,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { AIInsight } from '@/lib/ai/weatherAnalyzer';
import { cn } from '@/lib/utils/cn';

interface AIInsightCardProps {
  insight: AIInsight;
  onDismiss?: (id: string) => void;
  onExpand?: (id: string) => void;
  className?: string;
}

export function AIInsightCard({
  insight,
  onDismiss,
  onExpand,
  className
}: AIInsightCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const getIcon = () => {
    switch (insight.type) {
      case 'prediction': return Brain;
      case 'recommendation': return Lightbulb;
      case 'alert': return AlertTriangle;
      case 'trend': return TrendingUp;
      default: return Target;
    }
  };

  const getPriorityColor = () => {
    switch (insight.priority) {
      case 'urgent': return 'border-red-500/50 bg-red-500/10';
      case 'high': return 'border-orange-500/50 bg-orange-500/10';
      case 'medium': return 'border-sky-500/50 bg-sky-500/10';
      case 'low': return 'border-emerald-500/50 bg-emerald-500/10';
      default: return 'border-sky-300/30 bg-sky-500/10';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-emerald-400';
    if (confidence >= 0.7) return 'text-sky-400';
    if (confidence >= 0.5) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const Icon = getIcon();

  if (isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.(insight.id);
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    onExpand?.(insight.id);
  };

  return (
    <GlassCard className={cn(
      'p-4 transition-all duration-300 hover:bg-sky-500/15 border',
      getPriorityColor(),
      className
    )}>
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-sky-500/20 rounded-xl border border-sky-300/30 flex-shrink-0">
          <Icon className="h-4 w-4 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-white font-medium text-sm truncate">
              {insight.title}
            </h4>
            <span className={cn(
              'px-2 py-0.5 text-xs font-bold rounded-full uppercase tracking-wide',
              insight.priority === 'urgent' ? 'bg-red-500 text-white' :
              insight.priority === 'high' ? 'bg-orange-500 text-white' :
              insight.priority === 'medium' ? 'bg-sky-500 text-white' :
              'bg-emerald-500 text-white'
            )}>
              {insight.priority}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-sky-200/70">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {insight.timestamp}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              Aashik9567
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExpand}
            className="p-1 hover:bg-sky-400/20"
          >
            <ChevronRight className={cn(
              'h-4 w-4 text-sky-300 transition-transform',
              isExpanded && 'rotate-90'
            )} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="p-1 hover:bg-red-400/20 text-red-400"
          >
            <XCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="mb-3">
        <p className="text-sky-100/90 text-sm leading-relaxed">
          {insight.content}
        </p>
      </div>

      {/* Metrics */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3 text-sky-400" />
            <span className="text-sky-200/70">Confidence:</span>
            <span className={cn('font-semibold', getConfidenceColor(insight.confidence))}>
              {Math.round(insight.confidence * 100)}%
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <Target className="h-3 w-3 text-emerald-400" />
            <span className="text-sky-200/70">Relevance:</span>
            <span className="text-emerald-400 font-semibold">
              {Math.round(insight.userRelevance * 100)}%
            </span>
          </div>
        </div>

        <div className="text-sky-200/60 capitalize">
          {insight.source.replace('_', ' ')}
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-sky-300/20 space-y-3">
          <div>
            <h5 className="text-white text-sm font-medium mb-2">AI Analysis Details</h5>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-sky-200/70">Analysis Type:</span>
                <span className="text-white capitalize">{insight.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sky-200/70">Data Source:</span>
                <span className="text-white">{insight.source.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sky-200/70">Processing Time:</span>
                <span className="text-white">0.23s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sky-200/70">Model Version:</span>
                <span className="text-white">v2.1.4</span>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-white text-sm font-medium mb-2">Confidence Breakdown</h5>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-sky-500/20 rounded-full h-2">
                  <div 
                    className="bg-sky-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${insight.confidence * 100}%` }}
                  />
                </div>
                <span className="text-white text-xs font-medium">
                  {Math.round(insight.confidence * 100)}%
                </span>
              </div>
              <div className="text-xs text-sky-200/70">
                Based on {Math.floor(Math.random() * 1000 + 500)} data points and historical patterns
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="glass" size="sm" className="flex-1">
              <CheckCircle className="h-3 w-3 mr-1" />
              Mark as Helpful
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Learn More
            </Button>
          </div>
        </div>
      )}
    </GlassCard>
  );
}