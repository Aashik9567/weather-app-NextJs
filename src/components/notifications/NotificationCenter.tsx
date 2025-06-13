'use client';

import { useEffect } from 'react';
import { useNotifications } from './NotificationContext';
import { X, Info, CheckCircle, AlertTriangle, AlertCircle, Brain, Bell } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export function NotificationCenter() {
  const { notifications, remove } = useNotifications();

  useEffect(() => {
    // Auto-close notifications (if enabled)
    notifications.forEach((n) => {
      if (n.autoClose) {
        const timer = setTimeout(() => remove(n.id), n.duration ?? 7000);
        return () => clearTimeout(timer);
      }
    });
  }, [notifications, remove]);

  if (!notifications.length) return null;

  return (
    <div className="fixed top-4 right-4 z-[1050] flex flex-col gap-3 items-end max-w-[96vw]">
      {notifications.map((notif) => {
        let icon, border, bg, text;
        switch (notif.type) {
          case 'success':
            icon = <CheckCircle className="h-5 w-5 text-emerald-400" />;
            border = 'border-emerald-400/30';
            bg = 'bg-emerald-400/10';
            text = 'text-emerald-200';
            break;
          case 'warning':
            icon = <AlertTriangle className="h-5 w-5 text-yellow-400" />;
            border = 'border-yellow-400/30';
            bg = 'bg-yellow-400/10';
            text = 'text-yellow-200';
            break;
          case 'error':
            icon = <AlertCircle className="h-5 w-5 text-red-400" />;
            border = 'border-red-400/30';
            bg = 'bg-red-400/10';
            text = 'text-red-200';
            break;
          case 'ai':
            icon = <Brain className="h-5 w-5 text-sky-400" />;
            border = 'border-sky-400/50';
            bg = 'bg-sky-400/10';
            text = 'text-sky-100';
            break;
          default:
            icon = <Info className="h-5 w-5 text-sky-400" />;
            border = 'border-sky-400/30';
            bg = 'bg-sky-400/10';
            text = 'text-sky-100';
        }

        return (
          <div
            key={notif.id}
            className={cn(
              "shadow-xl rounded-xl px-4 py-3 min-w-[260px] max-w-xs border-l-8 flex items-start gap-3 animate-slide-in",
              bg, border
            )}
            role="alert"
            style={{ animation: 'slideIn 0.35s' }}
          >
            <span className="mt-1">{icon}</span>
            <div className="flex-1 min-w-0">
              <div className={cn("font-semibold text-sm truncate", text)}>{notif.title}</div>
              <div className="text-xs text-white/90 truncate">{notif.message}</div>
              <div className="text-sky-200/60 text-xs mt-1 font-mono">{notif.timestamp}</div>
              {notif.actionLabel && notif.onAction && (
                <button
                  className="mt-2 px-2 py-1 rounded bg-sky-600/20 text-white text-xs hover:bg-sky-600/40"
                  onClick={notif.onAction}
                >
                  {notif.actionLabel}
                </button>
              )}
            </div>
            <button
              onClick={() => remove(notif.id)}
              className="p-1 ml-2 text-sky-300 hover:text-white"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}