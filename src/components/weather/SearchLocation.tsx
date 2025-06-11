'use client';

import { useState, useRef, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Search, MapPin, Clock, History, X } from 'lucide-react';

interface LocationSuggestion {
  id: string;
  name: string;
  country: string;
  region: string;
  latitude: number;
  longitude: number;
}

interface SearchLocationProps {
  onLocationSelect?: (location: LocationSuggestion) => void;
  onSearch?: (query: string) => void;
  currentLocation?: string;
}

function SearchLocation({
  onLocationSelect,
  onSearch,
  currentLocation = "London, United Kingdom"
}: SearchLocationProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock suggestions (replace with real API)
  const mockSuggestions: LocationSuggestion[] = [
    { id: '1', name: 'London', country: 'United Kingdom', region: 'England', latitude: 51.5074, longitude: -0.1278 },
    { id: '2', name: 'New York', country: 'United States', region: 'New York', latitude: 40.7128, longitude: -74.0060 },
    { id: '3', name: 'Tokyo', country: 'Japan', region: 'Tokyo', latitude: 35.6762, longitude: 139.6503 },
    { id: '4', name: 'Paris', country: 'France', region: 'Île-de-France', latitude: 48.8566, longitude: 2.3522 },
    { id: '5', name: 'Sydney', country: 'Australia', region: 'New South Wales', latitude: -33.8688, longitude: 151.2093 },
    { id: '6', name: 'Mumbai', country: 'India', region: 'Maharashtra', latitude: 19.0760, longitude: 72.8777 },
    { id: '7', name: 'Berlin', country: 'Germany', region: 'Berlin', latitude: 52.5200, longitude: 13.4050 },
    { id: '8', name: 'Toronto', country: 'Canada', region: 'Ontario', latitude: 43.6532, longitude: -79.3832 },
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('weather-recent-searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse recent searches:', e);
      }
    }
  }, []);

  // Handle search input
  const handleSearch = (value: string) => {
    setQuery(value);
    
    if (value.length > 0) {
      setIsLoading(true);
      // Filter mock suggestions (replace with real API call)
      setTimeout(() => {
        const filtered = mockSuggestions.filter(location =>
          location.name.toLowerCase().includes(value.toLowerCase()) ||
          location.country.toLowerCase().includes(value.toLowerCase()) ||
          location.region.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered);
        setIsLoading(false);
        setIsOpen(true);
      }, 300);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }

    onSearch?.(value);
  };

  // Handle location selection
  const handleLocationSelect = (location: LocationSuggestion) => {
    setQuery('');
    setIsOpen(false);
    
    // Add to recent searches
    const newRecent = [location, ...recentSearches.filter(item => item.id !== location.id)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('weather-recent-searches', JSON.stringify(newRecent));
    
    onLocationSelect?.(location);
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('weather-recent-searches');
  };

  // Handle input focus
  const handleInputFocus = () => {
    if (query.length === 0) {
      setIsOpen(true);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={inputRef}>
      <GlassCard className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/10 rounded-xl">
            <Search className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold">Search Location</h3>
            <p className="text-white/60 text-sm">Find weather for any city</p>
          </div>
        </div>

        {/* Current Location Display */}
        <div className="mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <MapPin className="h-4 w-4 text-green-400" />
            <span>Current: </span>
            <span className="font-medium">{currentLocation}</span>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Input
            placeholder="Search for a city or location..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={handleInputFocus}
            leftIcon={<Search className="h-4 w-4" />}
            clearable
            onClear={() => {
              setQuery('');
              setSuggestions([]);
              setIsOpen(false);
            }}
            className="w-full"
          />

          {/* Search Button */}
          <Button
            variant="glass"
            size="sm"
            className="absolute right-2 top-1 h-8"
            loading={isLoading}
            onClick={() => handleSearch(query)}
          >
            Search
          </Button>
        </div>
      </GlassCard>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <GlassCard className="p-4 max-h-80 overflow-y-auto">
            
            {/* Recent Searches */}
            {query.length === 0 && recentSearches.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <History className="h-4 w-4 text-white/60" />
                    <span className="text-white/80 text-sm font-medium">Recent Searches</span>
                  </div>
                  <button
                    onClick={clearRecentSearches}
                    className="text-white/60 hover:text-white text-xs flex items-center gap-1"
                  >
                    <X className="h-3 w-3" />
                    Clear
                  </button>
                </div>
                
                <div className="space-y-2">
                  {recentSearches.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => handleLocationSelect(location)}
                      className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200 text-left group"
                    >
                      <Clock className="h-4 w-4 text-white/60 group-hover:text-white/80" />
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">
                          {location.name}
                        </div>
                        <div className="text-white/60 text-xs">
                          {location.region}, {location.country}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {suggestions.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Search className="h-4 w-4 text-white/60" />
                  <span className="text-white/80 text-sm font-medium">Search Results</span>
                </div>
                
                <div className="space-y-2">
                  {suggestions.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => handleLocationSelect(location)}
                      className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200 text-left group"
                    >
                      <MapPin className="h-4 w-4 text-blue-400 group-hover:text-blue-300" />
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">
                          {location.name}
                        </div>
                        <div className="text-white/60 text-xs">
                          {location.region}, {location.country}
                        </div>
                      </div>
                      <div className="text-white/40 text-xs">
                        {location.latitude.toFixed(2)}, {location.longitude.toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {query.length > 0 && suggestions.length === 0 && !isLoading && (
              <div className="text-center py-6">
                <Search className="h-8 w-8 text-white/40 mx-auto mb-2" />
                <div className="text-white/60 text-sm">
                  No locations found for &quot;{query}&quot;
                </div>
                <div className="text-white/40 text-xs mt-1">
                  Try searching for a different city or location
                </div>
              </div>
            )}

            {/* Loading */}
            {isLoading && (
              <div className="text-center py-6">
                <div className="animate-spin h-6 w-6 border-2 border-white/20 border-t-white/60 rounded-full mx-auto mb-2"></div>
                <div className="text-white/60 text-sm">Searching...</div>
              </div>
            )}
          </GlassCard>
        </div>
      )}
    </div>
  );
}

export { SearchLocation };