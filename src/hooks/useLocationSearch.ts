'use client';

import { useState, useEffect, useCallback } from 'react';
import { LocationSearchResult } from '@/lib/types/weather';

interface UseLocationSearchOptions {
  debounceMs?: number;
  minQueryLength?: number;
}

interface LocationSearchState {
  suggestions: LocationSearchResult[];
  loading: boolean;
  error: string | null;
}

export function useLocationSearch(options: UseLocationSearchOptions = {}) {
  const { debounceMs = 300, minQueryLength = 2 } = options;
  
  const [state, setState] = useState<LocationSearchState>({
    suggestions: [],
    loading: false,
    error: null,
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Debounced search function
  const searchLocations = useCallback(async (query: string) => {
    if (!query || query.length < minQueryLength) {
      setState({
        suggestions: [],
        loading: false,
        error: null,
      });
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(`/api/locations/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Failed to search locations');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error?.message || 'Search failed');
      }

      setState({
        suggestions: data.data || [],
        loading: false,
        error: null,
      });

    } catch (error: any) {
      console.error('Location search error:', error);
      setState({
        suggestions: [],
        loading: false,
        error: error.message || 'Failed to search locations',
      });
    }
  }, [minQueryLength]);

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchLocations(searchQuery);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchLocations, debounceMs]);

  const search = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setState({
      suggestions: [],
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    search,
    clearSearch,
    query: searchQuery,
  };
}