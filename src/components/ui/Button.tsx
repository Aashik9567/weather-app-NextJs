'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'glass' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  loadingText?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md', 
    loading = false,
    loadingText,
    disabled,
    children, 
    ...props 
  }, ref) => {
    // Convert boolean disabled to proper boolean (fix hydration)
    const isDisabled = Boolean(disabled) || Boolean(loading);

    const baseStyles = cn(
      'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:ring-offset-2 focus:ring-offset-transparent',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      // Size variants
      size === 'sm' && 'px-3 py-2 text-sm',
      size === 'md' && 'px-4 py-2.5 text-sm',
      size === 'lg' && 'px-6 py-3 text-base',
      // Variant styles
      variant === 'default' && [
        'bg-sky-500 text-white shadow-lg shadow-sky-500/25',
        'hover:bg-sky-600 hover:shadow-xl hover:shadow-sky-500/30 hover:scale-[1.02]',
        'active:bg-sky-700 active:scale-[0.98]',
        'disabled:hover:bg-sky-500 disabled:hover:shadow-lg disabled:hover:scale-100'
      ],
      variant === 'glass' && [
        'bg-sky-500/20 text-white border border-sky-300/30 backdrop-blur-sm',
        'hover:bg-sky-500/30 hover:border-sky-300/50 hover:shadow-lg hover:scale-[1.02]',
        'active:bg-sky-500/40 active:scale-[0.98]',
        'disabled:hover:bg-sky-500/20 disabled:hover:border-sky-300/30 disabled:hover:scale-100'
      ],
      variant === 'outline' && [
        'border border-sky-300/50 text-sky-100 bg-transparent',
        'hover:bg-sky-500/10 hover:border-sky-300/70 hover:text-white hover:scale-[1.02]',
        'active:bg-sky-500/20 active:scale-[0.98]',
        'disabled:hover:bg-transparent disabled:hover:border-sky-300/50 disabled:hover:scale-100'
      ],
      variant === 'ghost' && [
        'text-sky-100 bg-transparent',
        'hover:bg-sky-500/20 hover:text-white',
        'active:bg-sky-500/30',
        'disabled:hover:bg-transparent'
      ],
      className
    );

    return (
      <button
        className={baseStyles}
        disabled={isDisabled}
        ref={ref}
        {...props}
      >
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {loading && loadingText ? loadingText : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };