'use client';

import { useEffect } from 'react';
import { useNotifications } from '@/components/notifications/NotificationContext';

export function useForecastNotifications() {
  const { add } = useNotifications();

  useEffect(() => {
    // Welcome notification
    add({
      type: 'info',
      title: 'Forecast Updated',
      message: '10-day weather forecast refreshed for Aashik9567',
      autoClose: true,
      duration: 5000
    });

    // Example: Weather alert
    const checkWeatherAlerts = () => {
      // Simulate checking for severe weather
      if (Math.random() < 0.3) {
        add({
          type: 'warning',
          title: 'Weather Advisory',
          message: 'Light rain expected tomorrow afternoon. Plan accordingly!',
          actionLabel: 'View Details',
          onAction: () => console.log('Navigate to detailed forecast'),
          autoClose: false
        });
      }
    };

    // Check for alerts periodically
    const alertTimer = setInterval(checkWeatherAlerts, 30000);
    
    return () => clearInterval(alertTimer);
  }, [add]);
}