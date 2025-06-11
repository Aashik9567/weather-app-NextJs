'use client';

import { cn } from '@/lib/utils/cn';
import { HTMLAttributes, forwardRef } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'subtle' | 'strong';
  hover?: boolean;
  children: React.ReactNode;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ 
    className, 
    variant = 'default', 
    hover = true,
    children, 
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base glass morphism styles using your CSS class
          'glass-card transition-all duration-300 ease-out',
          
          // Variant modifications
          {
            // Default uses your existing .glass-card class
            '': variant === 'default',
            // Subtle - more transparent
            'bg-white/5 border-white/10': variant === 'subtle',
            // Strong - more opaque
            'bg-white/20 border-white/30': variant === 'strong',
          },
          
          // Hover effects
          hover && [
            'hover:bg-white/15',
            'hover:border-white/30',
            'hover:shadow-xl',
            'hover:shadow-black/20',
            'hover:-translate-y-1',
            'cursor-pointer'
          ],
          
          className
        )}
        {...props}
      >
        {/* Glass shimmer effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none opacity-50" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export { GlassCard };