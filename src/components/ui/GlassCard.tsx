import { cn } from '@/lib/utils/cn';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'subtle';
}

export function GlassCard({ 
  children, 
  className,
  variant = 'default' 
}: GlassCardProps) {
  const variants = {
    default: 'bg-sky-500/10 backdrop-blur-xl border border-sky-300/20',
    strong: 'bg-sky-500/15 backdrop-blur-2xl border border-sky-300/30 shadow-xl',
    subtle: 'bg-sky-500/5 backdrop-blur-lg border border-sky-300/10'
  };

  return (
    <div 
      className={cn(
        'rounded-xl transition-all duration-300 hover:bg-sky-500/15 hover:border-sky-300/30',
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}