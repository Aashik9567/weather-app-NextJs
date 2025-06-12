'use client';

import { useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, RefreshCw, Home, Bug, Clock, User } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const currentTime = '2025-06-12 07:49:08';
  const currentUser = 'Aashik9567';

  useEffect(() => {
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen sky-gradient-bg flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gradient-to-br from-sky-400/10 via-sky-500/10 to-sky-600/10" />
      
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <GlassCard className="p-8" variant="strong">
          {/* Error Icon */}
          <div className="mb-6">
            <div className="relative">
              <AlertTriangle className="h-16 w-16 text-red-400 mx-auto animate-pulse" />
              <Bug className="h-6 w-6 text-orange-400 absolute -top-1 -right-1 animate-bounce" />
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-white mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-sky-100/80 mb-6">
            Don't worry, {currentUser}! Our weather systems are still running. 
            This appears to be a temporary glitch.
          </p>

          {/* Error Details */}
          <div className="mb-6 p-4 bg-red-500/10 rounded-xl border border-red-500/20">
            <div className="text-red-300 text-sm font-mono">
              {error.message || 'An unexpected error occurred'}
            </div>
            {error.digest && (
              <div className="text-red-400/70 text-xs mt-2">
                Error ID: {error.digest}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button variant="glass" onClick={reset} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/'} className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </div>

          {/* Footer */}
          <div className="text-sky-200/60 text-sm flex items-center justify-center gap-4">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {currentUser}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {currentTime} UTC
            </span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}