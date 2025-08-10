import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const SearchBar = ({ 
  placeholder = "Search knowledge base...", 
  className = "",
  showSuggestions = true,
  autoFocus = false,
  size = "default" // "default" | "large"
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  const mockSuggestions = [
    'Knowledge management best practices',
    'Content organization strategies',
    'Search optimization techniques',
    'User collaboration workflows',
    'Document version control',
    'Information architecture',
    'Content lifecycle management',
    'Search analytics and insights',
  ];

  useEffect(() => {
    // Initialize query from URL params if on search results page
    const urlParams = new URLSearchParams(location.search);
    const urlQuery = urlParams?.get('q');
    if (urlQuery) {
      setQuery(urlQuery);
    }
  }, [location?.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setIsFocused(false);
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setQuery(value);

    if (showSuggestions && value?.length > 2) {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        const filtered = mockSuggestions?.filter(suggestion =>
          suggestion?.toLowerCase()?.includes(value?.toLowerCase())
        );
        setSuggestions(filtered?.slice(0, 6));
        setIsLoading(false);
      }, 150);
    } else {
      setSuggestions([]);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (query?.trim()) {
      performSearch(query?.trim());
    }
  };

  const performSearch = (searchQuery) => {
    navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
    setIsFocused(false);
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    performSearch(suggestion);
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Escape') {
      setIsFocused(false);
      setSuggestions([]);
      searchRef?.current?.blur();
    }
  };

  const sizeClasses = {
    default: "h-10 text-sm",
    large: "h-12 text-base"
  };

  const iconSize = size === "large" ? 18 : 16;
  const paddingClass = size === "large" ? "pl-12 pr-4" : "pl-10 pr-4";

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Icon
            name="Search"
            size={iconSize}
            className={`absolute ${size === "large" ? "left-4" : "left-3"} top-1/2 transform -translate-y-1/2 text-muted-foreground`}
          />
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            autoFocus={autoFocus}
            className={`w-full ${paddingClass} ${sizeClasses?.[size]} bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth`}
          />
          
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                searchRef?.current?.querySelector('input')?.focus();
              }}
              className={`absolute ${size === "large" ? "right-4" : "right-3"} top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth`}
            >
              <Icon name="X" size={iconSize} />
            </button>
          )}
        </div>
      </form>
      {/* Search Suggestions */}
      {showSuggestions && isFocused && (suggestions?.length > 0 || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-floating z-1100 max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
            </div>
          ) : (
            <div className="py-1">
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted transition-smooth first:rounded-t-lg last:rounded-b-lg"
                >
                  <Icon name="Search" size={14} className="text-muted-foreground flex-shrink-0" />
                  <span className="text-sm truncate">{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;