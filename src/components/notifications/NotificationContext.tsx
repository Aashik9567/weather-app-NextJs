'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'ai';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  actionLabel?: string;
  onAction?: () => void;
  autoClose?: boolean;
  duration?: number; // ms
}

interface NotificationContextProps {
  notifications: Notification[];
  add: (notif: Omit<Notification, 'id' | 'timestamp'>) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const add = useCallback((notif: Omit<Notification, 'id' | 'timestamp'>) => {
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').slice(0, 19);
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setNotifications((prev) => [
      ...prev,
      { ...notif, id, timestamp, autoClose: notif.autoClose ?? true, duration: notif.duration ?? 7000 }
    ]);
  }, []);

  const remove = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clear = useCallback(() => setNotifications([]), []);

  return (
    <NotificationContext.Provider value={{ notifications, add, remove, clear }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
}