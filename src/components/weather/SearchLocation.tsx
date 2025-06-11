'use client';

import { useState, useRef, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { 
  Search, 
  MapPin, 
  Clock, 
  History, 
  X, 
  Navigation,
  Star,
  Globe,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useLocationSearch } from '@/hooks/useLocationSearch';
import { useGeolocation } from '@/hooks/useGeolocation';
import { LocationSearchResult } from '@/lib/types/weather';

interface SearchLocationProps {
  onLocationSelect?: (location: LocationSearchResult) => void;
  onLocationByCoords?: (lat: number, lon: number) => void;
  onSearch?: (query: string) => void;
  currentLocation?: string;
}

export function SearchLocation({
  onLocationSelect,
  onLocationByCoords,
  onSearch,
  currentLocation = "London, United Kingdom"
}: SearchLocationProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<LocationSearchResult[]>([]);
  const [favoriteLocations, setFavoriteLocations] = useState<LocationSearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Custom hooks
  const { 
    suggestions, 
    loading: searchLoading, 
    error: searchError,
    search,
    clearSearch
  } = useLocationSearch({ debounceMs: 300, minQueryLength: 2 });

  const {
    position,
    loading: geoLoading,
    error: geoError,
    supported: geoSupported,
    getCurrentPosition,
    clearError: clearGeoError
  } = useGeolocation();

  // Load saved data from localStorage
  useEffect(() => {
    try {
      const savedRecent = localStorage.getItem('weather-recent-searches');
      const savedFavorites = localStorage.getItem('weather-favorite-locations');
      
      if (savedRecent) {
        setRecentSearches(JSON.parse(savedRecent));
      }
      
      if (savedFavorites) {
        setFavoriteLocations(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Failed to load saved location data:', error);
    }
  }, []);

  // Handle search input
  const handleSearch = (value: string) => {
    setQuery(value);
    search(value);
    
    if (value.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }

    onSearch?.(value);
  };

  // Handle location selection
  const handleLocationSelect = (location: LocationSearchResult) => {
    setQuery('');
    setIsOpen(false);
    clearSearch();
    
    // Add to recent searches
    const newRecent = [
      location, 
      ...recentSearches.filter(item => item.id !== location.id)
    ].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('weather-recent-searches', JSON.stringify(newRecent));
    
    onLocationSelect?.(location);
  };

  // Handle geolocation
  const handleGeolocation = async () => {
    try {
      clearGeoError();
      const coords = await getCurrentPosition();
      console.log('📍 Got coordinates:', coords);
      
      onLocationByCoords?.(coords.latitude, coords.longitude);
      setIsOpen(false);
    } catch (error) {
      console.error('Geolocation error:', error);
    }
  };

  // Toggle favorite location
  const toggleFavorite = (location: LocationSearchResult) => {
    const isFavorite = favoriteLocations.some(fav => fav.id === location.id);
    
    let newFavorites;
    if (isFavorite) {
      newFavorites = favoriteLocations.filter(fav => fav.id !== location.id);
    } else {
      newFavorites = [location, ...favoriteLocations].slice(0, 10); // Max 10 favorites
    }
    
    setFavoriteLocations(newFavorites);
    localStorage.setItem('weather-favorite-locations', JSON.stringify(newFavorites));
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('weather-recent-searches');
  };

  // Clear favorites
  const clearFavorites = () => {
    setFavoriteLocations([]);
    localStorage.removeItem('weather-favorite-locations');
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

  const isFavorite = (location: LocationSearchResult) => 
    favoriteLocations.some(fav => fav.id === location.id);

  return (
    <div className="relative" ref={inputRef}>
      <GlassCard className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/10 rounded-xl">
            <Search className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white text-lg font-semibold">Search Location</h3>
            <p className="text-white/60 text-sm">Find weather for any city worldwide</p>
          </div>
        </div>

        {/* Current Location Display */}
        <div className="mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <MapPin className="h-4 w-4 text-green-400" />
              <span>Current: </span>
              <span className="font-medium">{currentLocation}</span>
            </div>
            <div className="text-white/40 text-xs">
              {new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
              })}
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <Input
            placeholder="Search cities, countries, or places..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={handleInputFocus}
            leftIcon={searchLoading ? 
              <Loader2 className="h-4 w-4 animate-spin" /> : 
              <Search className="h-4 w-4" />
            }
            clearable
            onClear={() => {
              setQuery('');
              clearSearch();
              setIsOpen(false);
            }}
            className="w-full"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button
            variant="glass"
            size="sm"
            onClick={handleGeolocation}
            loading={geoLoading}
            disabled={!geoSupported}
            className="flex-1"
          >
            <Navigation className="h-4 w-4" />
            {geoSupported ? 'Use My Location' : 'Location Not Supported'}
          </Button>
          
          <Button
            variant="glass"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="px-3"
          >
            <Globe className="h-4 w-4" />
          </Button>
        </div>

        {/* Geolocation Error */}
        {geoError && (
          <div className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center gap-2 text-red-400 text-xs">
              <AlertCircle className="h-3 w-3" />
              <span>{geoError}</span>
              <button onClick={clearGeoError} className="ml-auto">
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}

        {/* Search Error */}
        {searchError && (
          <div className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center gap-2 text-red-400 text-xs">
              <AlertCircle className="h-3 w-3" />
              <span>{searchError}</span>
            </div>
          </div>
        )}
      </GlassCard>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <GlassCard className="p-4 max-h-96 overflow-y-auto">
            
            {/* Favorite Locations */}
            {query.length === 0 && favoriteLocations.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-white/80 text-sm font-medium">Favorites</span>
                  </div>
                  <button
                    onClick={clearFavorites}
                    className="text-white/60 hover:text-white text-xs flex items-center gap-1"
                  >
                    <X className="h-3 w-3" />
                    Clear
                  </button>
                </div>
                
                <div className="space-y-2">
                  {favoriteLocations.map((location) => (
                    <div
                      key={`fav-${location.id}`}
                      className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                    >
                      <button
                        onClick={() => handleLocationSelect(location)}
                        className="flex-1 flex items-center gap-3 text-left"
                      >
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium">
                            {location.name}
                          </div>
                          <div className="text-white/60 text-xs">
                            {location.region && `${location.region}, `}{location.country}
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => toggleFavorite(location)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3 text-white/60 hover:text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                    <div
                      key={`recent-${location.id}`}
                      className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                    >
                      <button
                        onClick={() => handleLocationSelect(location)}
                        className="flex-1 flex items-center gap-3 text-left"
                      >
                        <Clock className="h-4 w-4 text-white/60 group-hover:text-white/80" />
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium">
                            {location.name}
                          </div>
                          <div className="text-white/60 text-xs">
                            {location.region && `${location.region}, `}{location.country}
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => toggleFavorite(location)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Star className={`h-3 w-3 ${isFavorite(location) ? 'text-yellow-400 fill-current' : 'text-white/60 hover:text-yellow-400'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {suggestions.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Search className="h-4 w-4 text-white/60" />
                  <span className="text-white/80 text-sm font-medium">
                    Search Results ({suggestions.length})
                  </span>
                </div>
                
                <div className="space-y-2">
                  {suggestions.map((location) => (
                    <div
                      key={`search-${location.id}`}
                      className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                    >
                      <button
                        onClick={() => handleLocationSelect(location)}
                        className="flex-1 flex items-center gap-3 text-left"
                      >
                        <MapPin className="h-4 w-4 text-blue-400 group-hover:text-blue-300" />
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium">
                            {location.name}
                          </div>
                          <div className="text-white/60 text-xs">
                            {location.region && `${location.region}, `}{location.country}
                          </div>
                        </div>
                        <div className="text-white/40 text-xs">
                          {location.lat.toFixed(2)}, {location.lon.toFixed(2)}
                        </div>
                      </button>
                      <button
                        onClick={() => toggleFavorite(location)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Star className={`h-3 w-3 ${isFavorite(location) ? 'text-yellow-400 fill-current' : 'text-white/60 hover:text-yellow-400'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {query.length > 0 && suggestions.length === 0 && !searchLoading && !searchError && (
              <div className="text-center py-6">
                <Search className="h-8 w-8 text-white/40 mx-auto mb-2" />
                <div className="text-white/60 text-sm">
                  No locations found for &quot;{query}&quot;
                </div>
                <div className="text-white/40 text-xs mt-1">
                  Try searching for a city name or country
                </div>
              </div>
            )}

            {/* Loading */}
            {searchLoading && (
              <div className="text-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-white/60 mx-auto mb-2" />
                <div className="text-white/60 text-sm">Searching locations...</div>
              </div>
            )}

            {/* Empty State */}
            {query.length === 0 && recentSearches.length === 0 && favoriteLocations.length === 0 && (
              <div className="text-center py-6">
                <Globe className="h-8 w-8 text-white/40 mx-auto mb-2" />
                <div className="text-white/60 text-sm">
                  Start typing to search for locations
                </div>
                <div className="text-white/40 text-xs mt-1">
                  Or use your current location with GPS
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      )}
    </div>
  );
}