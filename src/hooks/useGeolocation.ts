'use client';

import { useState, useCallback } from 'react';

interface GeolocationPosition {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface UseGeolocationState {
  position: GeolocationPosition | null;
  loading: boolean;
  error: string | null;
  supported: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<UseGeolocationState>({
    position: null,
    loading: false,
    error: null,
    supported: typeof navigator !== 'undefined' && 'geolocation' in navigator,
  });

  const getCurrentPosition = useCallback(async (): Promise<GeolocationPosition> => {
    if (!state.supported) {
      throw new Error('Geolocation is not supported by this browser');
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          };

          setState({
            position: coords,
            loading: false,
            error: null,
            supported: true,
          });

          resolve(coords);
        },
        (error) => {
          let errorMessage = 'Failed to get location';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied by user';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
          }

          setState(prev => ({
            ...prev,
            loading: false,
            error: errorMessage,
          }));

          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  }, [state.supported]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    getCurrentPosition,
    clearError,
  };
}