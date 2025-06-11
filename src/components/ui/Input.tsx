'use client';

import { cn } from '@/lib/utils/cn';
import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { X } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    leftIcon,
    rightIcon,
    clearable = false,
    onClear,
    value,
    onChange,
    type = 'text',
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = useState(value || '');
    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (value === undefined) {
        setInternalValue('');
      }
      onClear?.();
    };

    return (
      <div className="relative">
        {/* Left icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        {/* Input field with glass effect */}
        <input
          type={type}
          className={cn(
            // Base styles with glass morphism
            'flex h-10 w-full rounded-xl px-3 py-2 text-sm transition-all duration-200',
            'bg-white/5 backdrop-blur-md border border-white/20',
            'placeholder:text-white/50 text-white',
            'focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 focus:bg-white/10',
            'disabled:cursor-not-allowed disabled:opacity-50',
            
            // Padding adjustments for icons
            leftIcon && 'pl-10',
            (rightIcon || (clearable && currentValue)) && 'pr-10',
            
            className
          )}
          ref={ref}
          value={currentValue}
          onChange={handleChange}
          {...props}
        />
        
        {/* Right icon or clear button */}
        {(rightIcon || (clearable && currentValue)) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {clearable && currentValue ? (
              <button
                type="button"
                onClick={handleClear}
                className="text-white/60 hover:text-white transition-colors p-0.5 hover:bg-white/10 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            ) : rightIcon ? (
              <div className="text-white/60 pointer-events-none">
                {rightIcon}
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };