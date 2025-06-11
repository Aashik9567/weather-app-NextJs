'use client';

import { cn } from '@/lib/utils/cn';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'glass' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'glass', 
    size = 'md', 
    loading = false,
    leftIcon,
    rightIcon,
    disabled,
    children, 
    ...props 
  }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
          'disabled:pointer-events-none disabled:opacity-50',
          
          // Variant styles
          {
            // Default button with blue gradient
            'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/25': 
              variant === 'default',
            
            // Glass morphism button (matches your design)
            'bg-white/10 text-white border border-white/20 backdrop-blur-lg hover:bg-white/20 hover:border-white/30 hover:shadow-lg': 
              variant === 'glass',
            
            // Outline button
            'border border-white/30 text-white hover:bg-white/10 hover:border-white/50': 
              variant === 'outline',
            
            // Ghost button
            'text-white hover:bg-white/10 hover:shadow-md': 
              variant === 'ghost',
          },
          
          // Size styles
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-sm': size === 'md',
            'h-12 px-6 text-base': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {/* Loading spinner */}
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        
        {/* Left icon */}
        {leftIcon && !loading && (
          <span className="mr-2 flex items-center">{leftIcon}</span>
        )}
        
        {/* Button content */}
        {children}
        
        {/* Right icon */}
        {rightIcon && !loading && (
          <span className="ml-2 flex items-center">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };