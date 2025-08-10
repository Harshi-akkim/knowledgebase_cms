import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

import Button from './Button';

const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Search', path: '/search-results', icon: 'Search' },
    { label: 'Content', path: '/content-management', icon: 'FileText' },
    { label: 'Explore', path: '/3d-knowledge-map', icon: 'Globe' },
  ];

  const userMenuItems = [
    { label: 'Profile', icon: 'User', action: () => console.log('Profile') },
    { label: 'Settings', icon: 'Settings', action: () => console.log('Settings') },
    { label: 'Help', icon: 'HelpCircle', action: () => console.log('Help') },
    { label: 'Logout', icon: 'LogOut', action: () => navigate('/login') },
  ];

  const mockSuggestions = [
    'Knowledge management best practices',
    'Content organization strategies',
    'Search optimization techniques',
    'User collaboration workflows',
    'Document version control',
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target)) {
        setIsUserMenuOpen(false);
      }
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setIsSearchFocused(false);
        setSearchSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    
    if (value?.length > 2) {
      const filtered = mockSuggestions?.filter(suggestion =>
        suggestion?.toLowerCase()?.includes(value?.toLowerCase())
      );
      setSearchSuggestions(filtered?.slice(0, 5));
    } else {
      setSearchSuggestions([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery?.trim())}`);
      setIsSearchFocused(false);
      setSearchSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    navigate(`/search-results?q=${encodeURIComponent(suggestion)}`);
    setIsSearchFocused(false);
    setSearchSuggestions([]);
  };

  const isActiveRoute = (path) => {
    if (path === '/dashboard' && location?.pathname === '/') return true;
    return location?.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  if (location?.pathname === '/login') {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-1000">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-3 transition-smooth hover:opacity-80"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="BookOpen" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              KnowledgeBase CMS
            </span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                isActiveRoute(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </button>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <div className="relative">
              <Icon
                name="Search"
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search knowledge base..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
              />
            </div>
            
            {/* Search Suggestions */}
            {isSearchFocused && searchSuggestions?.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-floating z-1100">
                {searchSuggestions?.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-smooth first:rounded-t-lg last:rounded-b-lg"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>

        {/* User Menu & Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
          </button>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-smooth"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-floating z-1100">
                <div className="py-1">
                  {userMenuItems?.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        item?.action();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-left hover:bg-muted transition-smooth"
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border">
          <div className="px-6 py-4 space-y-2">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <div className="relative">
                <Icon
                  name="Search"
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Search knowledge base..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
            </form>

            {/* Mobile Navigation */}
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                  isActiveRoute(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;